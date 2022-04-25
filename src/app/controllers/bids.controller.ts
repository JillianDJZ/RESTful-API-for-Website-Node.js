import * as bids from "../models/bids.model";
import * as auctions from "../models/auctions.model";
import Logger from "../../config/logger";
import { Request, Response } from "express";
import * as users from "../models/users.model";

const viewBids = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`GET all of auctions information.`)
    try {
        const auctionId = req.params.id;
        const auctionInfo = await auctions.getOne(parseInt(auctionId, 10));
        if (auctionInfo.length < 1) {
            res.status(404).send(`Not Found the auction.`);
            return;
        }
        const result = await bids.getBidsInOrder(parseInt(auctionId, 10));
        res.status(200).send( result );
        return;
    }catch (err) {
        res.status(500).send(`ERROR get all bids: ${err}`);
    }
}


const placeBid = async (req: Request, res: Response): Promise<void> => {
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
        if (auctionInfo.length < 1) {
            res.status(404).send(`Not Found the auction.`);
            return;
        }
        if(! req.body.amount){
            res.status(400).send(`Bad Request, please give the bid amount.`);
            return;
        }
        const bidsList = await bids.getBidsInOrder(parseInt(auctionId, 10));
        if (bidsList.length > 0 && bidsList[0].amount >= parseInt(req.body.amount, 10)){
            res.status(403).send(`Forbidden, his bid must be higher than the highest bid.`);
            return;
        }
        const result = await bids.addBid(parseInt(auctionId, 10), parseInt(req.body.amount, 10), usersId);
        res.status(201).send( result );
        return;
    }catch (err) {
        res.status(500).send(`ERROR place a new bid: ${err}`);
    }

}

export {viewBids, placeBid};