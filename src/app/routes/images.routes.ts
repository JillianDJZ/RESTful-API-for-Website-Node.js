import {Express} from "express";
import {rootUrl} from "./base.routes";

import * as images from '../controllers/images.controller';
module.exports = ( app: Express ) => {
    app.route( rootUrl + '/users/:id/image' )
        .get( images.retrieveUserImage )
        .put( images.setUserImage )
        .delete( images.deleteUserImage );
    app.route( rootUrl + '/auctions/:id/image' )
        .get( images.retrieveAuctionImage )
        .put( images.setAuctionImage );
};