import { getPool } from "../../config/db";
import Logger from "../../config/logger";
import {ResultSetHeader} from "mysql2";

const getBidsInOrder =  async (id:number) : Promise<any> => {
    Logger.info(`check if a bid has been placed on an auction.`);
    const conn = await getPool().getConnection();
    const query = 'select auction_bid.id as bidderId, amount, timestamp, ' +
        'first_name, last_name ' +
        'from auction_bid join user on auction_bid.user_id = user.id ' +
        'where auction_id = ? ' +
        'order by amount DESC, timestamp DESC';
    const [ result ] = await conn.query( query, [id]);
    conn.release();
    return result;
};

const addBid =  async (auctionId:number, amount:number, userId:number) : Promise<any> => {
    Logger.info(`add a new bid.`);
    const conn = await getPool().getConnection();
    const query = 'INSERT INTO `auction_bid` (`auction_id`, `user_id`, `amount`)' +
        ' VALUES (?, ?, ?);';
    const [ result ] = await conn.query( query, [auctionId, userId, amount]);
    conn.release();
    return result;
};

export {getBidsInOrder, addBid}