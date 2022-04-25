import * as images from "../models/images.model";
import * as users from "../models/users.model";
import * as auctions from "../models/auctions.model";
import Logger from "../../config/logger";
import { Request, Response } from "express";


// tslint:disable-next-line:no-var-requires
const mime = require('mime');

// tslint:disable-next-line:no-var-requires
const fs = require('mz/fs');


const retrieveUserImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const getUser = await users.getOne(parseInt(req.params.id, 10));
        if (getUser.length < 1) {
            res.status(404).send('Can not found the user.');
            return;
        }
        if (!getUser[0].image_filename || getUser[0].image_filename.length < 1) {
            res.status(404).send('The user has no image.');
            return;
        } else {
            const imageFile = await fs.readFile('./storage/images/' + getUser[0].image_filename);
            const imageType = mime.getType('./storage/images/' + getUser[0].image_filename);
            res.writeHead(200, {'Content-Type':imageType});
            res.write(imageFile);
            res.end();
            return;
        }
    }catch( err ) {
        res.status(500).send(`ERROR retrieve a user's profile image.: ${err}`);
    }
}


const setUserImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const contentType = req.get("Content-Type");
        if (contentType !== 'image/png' && contentType !== 'image/jpeg' && contentType !== 'image/jpg' && contentType !== 'image/gif'){
            res.status(400).send("image type is wrong.");
            return;
        }
        const getUser = await users.getOne(parseInt(req.params.id, 10));
        if (getUser.length < 1) {
            res.status(404).send('Can not found the user.');
            return;
        }
        const token = req.get("X-Authorization")
        const currentUserId = await users.getUserId(token)
        if (currentUserId ===0){
            res.status(401).send("Unauthorized");
            return;
        }
        if (getUser[0].auth_token !== token){
            res.status(403).send("Forbidden");
            return;
        }
        const type = contentType.substr(6);
        if (type === 'jpg') {
            await fs.writeFile('./storage/images/user_' + req.params.id + '.jpeg', req.body);
            await images.setUserImage(parseInt(req.params.id, 10), 'user_' + req.params.id + '.jpeg');
        } else {
            await fs.writeFile('./storage/images/user_' + req.params.id + '.' + type, req.body);
            await images.setUserImage(parseInt(req.params.id, 10), 'user_' + req.params.id + '.' + type);
        }
        if (getUser[0].image_filename === null){
            res.status(201).send("Created image");
            return;
        } else {
            res.status(200).send("Set image");
            return;
        }
    }catch( err ) {
        res.status(500).send(`ERROR retrieve a user's profile image.: ${err}`);
    }
}


const deleteUserImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const getUser = await users.getOne(parseInt(req.params.id, 10));
        if (getUser.length < 1) {
            res.status(404).send('Can not found the user.');
            return;
        }
        const token = req.get("X-Authorization")
        const currentUserId = await users.getUserId(token)
        if (getUser[0].auth_token !== token) {
            res.status(401).send("Unauthorized");
            return;
        }
        if (currentUserId === 0) {
            res.status(403).send("Forbidden");
            return;
        } else {
            await images.deleteImage(parseInt(req.params.id, 10));
            res.status(200).send("deleted image");
            return;
        }
    } catch( err ) {
    res.status(500).send(`ERROR retrieve a user's profile image.: ${err}`);
}


}


const retrieveAuctionImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const getAuction = await auctions.getOne(parseInt(req.params.id, 10));
        if (getAuction.length < 1) {
            res.status(404).send('Can not found the auction.');
            return;
        }
        if (!getAuction[0].image_filename || getAuction[0].image_filename.length < 1) {
            res.status(404).send('The auction has no image.');
            return;
        } else {
            const imageFile = await fs.readFile('./storage/images/' + getAuction[0].image_filename);
            const imageType = mime.getType('./storage/images/' + getAuction[0].image_filename);
            res.writeHead(200, {'Content-Type':imageType});
            res.write(imageFile);
            res.end();
            return;
        }
    }catch( err ) {
        res.status(500).send(`ERROR retrieve a user's profile image.: ${err}`);
    }
}


const setAuctionImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const contentType = req.get("Content-Type");
        if (contentType !== 'image/png' && contentType !== 'image/jpeg' && contentType !== 'image/jpg' && contentType !== 'image/gif'){
            res.status(400).send("image type is wrong.");
            return;
        }
        const getAuction = await auctions.getOne(parseInt(req.params.id, 10));
        if (getAuction.length < 1) {
            res.status(404).send('Can not found the auction.');
            return;
        }
        const token = req.get("X-Authorization");
        const currentAuction = await auctions.getAuctionByToken(token);
        if (currentAuction === 0){
            res.status(401).send("Unauthorized");
            return;
        }
        if (currentAuction.length < 1) {
            res.status(404).send("can not found current auction by current token");
            return;
        }
        if(currentAuction[0].id !== req.params.id){
            res.status(403).send("Forbidden");
            return;
        }
        const type = contentType.substr(6);
        if (type === 'jpg') {
            await fs.writeFile('./storage/images/auction_' + req.params.id + '.jpeg', req.body);
            await images.setAuctionImage(parseInt(req.params.id, 10), 'auction_' + req.params.id + '.jpeg');
        } else {
            await fs.writeFile('./storage/images/auction_' + req.params.id + '.' + type, req.body);
            // tslint:disable-next-line:no-console
            console.log("writ file success 2")
            await images.setAuctionImage(parseInt(req.params.id, 10), 'auction_' + req.params.id + '.' + type);
            // tslint:disable-next-line:no-console
            console.log("set file success 2")
        }
        if (getAuction[0].image_filename.length === null){
            res.status(201).send("Created image");
            return;
        } else {
            res.status(200).send("Set image");
            return;
        }
    }catch( err ) {
        res.status(500).send(`ERROR retrieve a auction's profile image.: ${err}`);
    }
}

export { retrieveUserImage, setUserImage,  deleteUserImage,  retrieveAuctionImage, setAuctionImage} ;
