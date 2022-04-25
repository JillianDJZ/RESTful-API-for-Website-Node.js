import * as auctions from "../models/auctions.model";
import Logger from "../../config/logger";
import { Request, Response } from "express";
import * as users from "../models/users.model";
import {getCategories} from "../models/auctions.model";



const viewAuctions = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`GET all of auctions information.`)
    try {
        let theStartIndex : number;
        if (!req.query.startIndex) {
            theStartIndex = 0;
        } else {
            theStartIndex = parseInt(req.query.startIndex.toString(), 10);
        }
        let count: number;
        if (!req.query.count) {
            count = 0;
        } else {
            count = parseInt(req.query.count.toString(), 10);
        }
        let categoryId : number;
        if (!req.query.categoryId) {
            categoryId = 0;
        } else {
            categoryId = parseInt(req.query.categoryIds.toString(), 10);
        }
        // tslint:disable-next-line:variable-name
        const order_text = ['ALPHABETICAL_ASC', 'ALPHABETICAL_DESC', 'BIDS_ASC', 'BIDS_DESC', 'CLOSING_SOON', 'CLOSING_LAST', 'RESERVE_ASC', 'RESERVE_DESC'];
        if (req.query.sortBy && order_text.indexOf(req.query.sortBy as string) < 0){
            res.status(400).send( 'order by is invalid.' );
            return;
        }
        const result = await auctions.getAuctions(theStartIndex, count, categoryId, req.query.q, req.query.sortBy, req.query.sellerId, req.query.bidderId);
        res.status(200).send( result );
        return;
    }catch (err) {
        res.status(500).send(`ERROR get all auctions: ${err}`);
    }
}


const addAuction = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`POST add a new auction.`);
    try {
        const token = req.get("X-Authorization");
        const usersId = await users.getUserId(token);
        if(usersId === 0) {
            res.status(401).send(`Unauthorized.`);
            return;
        }
        if (!req.body.title || !req.body.description ||!req.body.endDate ||!req.body.categoryId){
            res.status(400).send(`Please give all of title, description, endDate and categoryId.`);
            return;
        };
        const title = req.body.title;
        const description = req.body.description;
        const endDate = req.body.endDate;
        const categoryId = req.body.categoryId;
        let reserve = req.body.reserve;
        if (!reserve){ reserve = 1;};
        const category = await auctions.getCategory(parseInt(categoryId, 10));
        if (category.length < 1) {
            res.status(400).send(`categoryId is not exist.`);
            return;
        }
        const theEndDate = new Date(Date.parse(endDate.replace(/-/g, '/')));
        const now = new Date();
        if (theEndDate <= now){
            res.status(400).send(`the end date must be in the future.`);
            return;
        }
        // tslint:disable-next-line:variable-name
        let image_filename = req.body.imageFilename;
        if (!image_filename) {image_filename = null;};
        const result = await auctions.insert(parseInt(usersId, 10), title, description, endDate, parseInt(categoryId, 10), reserve, image_filename );
        res.status(201).send( result );
        return;
    }catch (err) {
        res.status(500).send(`ERROR add a new action: ${err}`);
    }
}



const retrieveAuction = async (req: Request, res: Response) : Promise<void> =>
{
    Logger.http(`GET single auction by id: ${req.params.id}`)
    const auctionId = req.params.id;
    // tslint:disable-next-line:no-console
    console.log(auctionId);
    try {
        const result = await auctions.getOne( parseInt(auctionId, 10) );
        if( result.length === 0 ){
            res.status( 404 ).send('auction not found');
        } else{
            res.status( 200 ).send( result );
            return
        }
    } catch( err ) {
        res.status( 500 ).send( `ERROR reading auction ${auctionId}: ${ err }`
        );
    }
};


const updateAuction = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`PATCH auction id: ${req.params.id} 's information.`)
    try {
        const token = req.get("X-Authorization");
        const usersId = await users.getUserId(token);
        if (usersId === 0) {
            res.status(401).send(`Unauthorized.`);
            return;
        }
        const auctionId = req.params.id;
        const auctionInfo = await auctions.getOne(parseInt(auctionId, 10));
        if (auctionInfo.length === 0) {
            res.status(404).send(`Not Found the auction.`);
            return;
        }
        if (auctionInfo[0].seller_id !== usersId) {
            res.status(403).send(`Forbidden.`);
            return;
        }
        const bids = await auctions.getBids(parseInt(auctionId, 10));
        if (bids.length > 0) {
            res.status(400).send(`No changes may be made after a bid has been placed on an auction.`);
            return;
        }
        const auctionNewInfo = req.body;
        if (auctionNewInfo.categoryId) {
            const category = await auctions.getCategory(parseInt(auctionNewInfo.categoryId, 10));
            if (category.length < 1) {
                res.status(400).send(`categoryId is not exist.`);
                return;
            }
        }
        const change = await auctions.alter(parseInt(req.params.id, 10), req.body);
        const result = await auctions.getOne(parseInt(req.params.id, 10));
        res.status( 200 ).send( result );
        return
    }catch( err ) {
        res.status( 500 ).send( `ERROR update auction ${req.params.id}: ${ err }`
        );
    };
};


const deleteAuction = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`DELETE auction id: ${req.params.id} 's information.`)
    try {
        const token = req.get("X-Authorization");
        const usersId = await users.getUserId(token);
        if (usersId === 0) {
            res.status(401).send(`Unauthorized.`);
            return;
        }
        const auctionId = req.params.id;
        const auctionInfo = await auctions.getOne(parseInt(auctionId, 10));
        if (auctionInfo.length === 0) {
            res.status(404).send(`Not Found the auction.`);
            return;
        }
        if (auctionInfo[0].seller_id !== usersId) {
            res.status(403).send(`Forbidden.`);
            return;
        }
        const bids = await auctions.getBids(parseInt(auctionId, 10));
        if (bids.length > 0) {
            res.status(403).send(`No changes may be made after a bid has been placed on an auction.`);
            return;
        }
        const result = await auctions.remove(parseInt(req.params.id, 10));
        res.status( 200 ).send( 'auction deleted' );
        return
    }catch( err ) {
        res.status( 500 ).send( `ERROR delete auction ${req.params.id}: ${ err }`
        );
    };
};


const viewCategories = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`Get all of categories with id and name`)
    try {
        const result = await auctions.getCategories();
        res.status( 200 ).send( result );
        return
    }catch( err ) {
        res.status( 500 ).send( `ERROR get all categories: ${ err }`
        );
    };
}

export { viewAuctions, addAuction, retrieveAuction, updateAuction, deleteAuction, viewCategories} ;
