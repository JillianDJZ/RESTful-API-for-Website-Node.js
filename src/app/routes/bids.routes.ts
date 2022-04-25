import {Express} from "express";
import {rootUrl} from "./base.routes";

import * as auctions from '../controllers/bids.controller';
module.exports = ( app: Express ) => {
    app.route( rootUrl + '/auctions/:id/bids' )
        .get( auctions.viewBids )
        .post( auctions.placeBid );
};