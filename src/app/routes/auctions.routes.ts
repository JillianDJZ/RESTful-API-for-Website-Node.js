import {Express} from "express";
import {rootUrl} from "./base.routes";

import * as auctions from '../controllers/auctions.controller';
module.exports = ( app: Express ) => {
    app.route( rootUrl + '/auctions' )
        .get( auctions.viewAuctions )
        .post( auctions.addAuction );
    app.route( rootUrl + '/auctions/:id' )
        .get( auctions.retrieveAuction )
        .patch( auctions.updateAuction )
        .delete( auctions.deleteAuction );
    app.route( rootUrl + '/auctions/categories' )
        .get( auctions.viewCategories );
};