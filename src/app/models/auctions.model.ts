import { getPool } from "../../config/db";
import Logger from "../../config/logger";
import {ResultSetHeader} from "mysql2";


const getAuctions = async (startIndex:any, count:any, categoryId: any, q:any, sortBy:any, sellerId:any, bidderId:any) : Promise<Auction[]> => {
    Logger.info(`Getting list of all auctions with a subset of auction information from the database`);
    const conn = await getPool().getConnection();
    let query = 'select auction.id as auctionId, auction.title as title, auction.seller_id as sellerId, auction.reserve as reserve, auction.end_date as endDate, ' +
        'user.first_name as sellerFirstName, user.last_name as sellerLastName, amount as highestBid, auction.category_id as categoryId  ' +
        'from ((auction join user on auction.seller_id = user.id) '+
        'join ( select max(amount) as amount, auction_id from auction_bid group by auction_id) as new_table on new_table.auction_id = auction.id) ' ;
    const queryInfo = [];
    if (q || categoryId !== 0 || sellerId || bidderId) {
        query += ' where ';
    }
    if(q) {
        query += ' (auction.title like ? or auction.description like ?) ';
        queryInfo.push(q);
        queryInfo.push(q);
    };
    if(categoryId !== 0){
        if (queryInfo.length > 0) {query += ' and ';}
        query += ' categoryId = ? ';
        queryInfo.push(categoryId);
    }
    if(sellerId){
        if (queryInfo.length > 0) {query += ' and ';}
        query += ' auction.seller_id = ? ';
        queryInfo.push(sellerId);
    }
    if(bidderId){
        query += '  ';
    }
    if(sortBy) {
        query += ' order by ';
        if (sortBy === 'ALPHABETICAL_ASC'){ query += ' auction.title ASC ';}
        else if (sortBy === 'ALPHABETICAL_DESC'){ query += ' auction.title DESC ' ;}
        else if (sortBy === 'CLOSING_SOON'){ query += ' auction.end_date DESC ';}
        else if (sortBy === 'CLOSING_LAST'){ query += ' auction.end_date ASC ';}
        else if (sortBy === 'BIDS_ASC'){ query += ' highestBid ASC ';}
        else if (sortBy === 'BIDS_DESC'){ query += ' highestBid DESC ';}
        else if (sortBy === 'RESERVE_ASC'){ query += ' auction.seller_id ASC ';}
        else if (sortBy === 'RESERVE_DESC'){ query += ' auction.seller_id DESC ';}
        else{query += ' auction.end_date DESC ';};
    };
    const [ rows ] = await conn.query( query, queryInfo );
    conn.release();
    if(count !== 0){
        return rows.splice(parseInt(startIndex, 10), parseInt(count, 10)+parseInt(startIndex, 10));
    } else {
        return rows.splice(parseInt(startIndex, 10));
    }
};

const getOne = async (id: number) : Promise<Auction[]> => {
    Logger.info(`Getting auction ${id} from the database`);
    const conn = await getPool().getConnection();
    const query = "select * from auction where id = ?";
    const [rows] = await conn.query(query, [id]);
    conn.release();
    return rows;
};

const getAuctionByToken = async (token: string): Promise<any> => {
    const conn = await getPool().getConnection();
    if (token === null) return null;
    const query = 'select auction.id as auctionId, auction.image_filename as imageFilename  ' +
        ' from auction join user on seller_id = user.id where user.auth_token = ?';
    const [[result]] = await conn.query(query, [token]);
    conn.release();
    if (result) {
        return result;
    } else {
        return 0;
    }
};

const getCategory = async (id:number) : Promise<Auction[]> => {
    Logger.info(`Getting category by category id`);
    const conn = await getPool().getConnection();
    const query = 'select * from category where id = ?';
    const [ result ] = await conn.query( query, [id]);
    conn.release();
    return result;
};
const insert = async (usersId: number, title:string, description:string, endDate:string, categoryId:number, reserve:number, imageFilename:string) : Promise<ResultSetHeader> => {
    Logger.info(`insert a new auction`);
    const conn = await getPool().getConnection();
    const query = 'insert into auction (`title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) ' +
        'VALUES ( ?,?,?,?,?,?,?)';
    const [ result ] = await conn.query( query, [ title, description, categoryId, endDate,imageFilename, reserve, usersId] );
    conn.release();
    return result.insertId;
};
const getBids =  async (id:number) : Promise<any> => {
    Logger.info(`check if a bid has been placed on an auction.`);
    const conn = await getPool().getConnection();
    const query = 'select * from auction_bid where id = ?';
    const [ result ] = await conn.query( query, [id]);
    conn.release();
    return result;
};

const alter = async (id: number, bodyInfo: any): Promise<any> => {
    Logger.info(`Changing auction ${id} 's information from the database`);
    const conn = await getPool().getConnection();
    if(bodyInfo.title){
        const queryTitle = 'update auction set title = ? where id = ?';
        const [ resultTitle ] = await conn.query( queryTitle, [ bodyInfo.title, id ] );
    }
    if(bodyInfo.description){
        const queryDescription = 'update auction set description = ? where id = ?';
        const [ resultDescription ] = await conn.query( queryDescription, [ bodyInfo.description, id ] );
    }
    if(bodyInfo.categoryId){
        const queryCategoryId = 'update auction set .category_id = ? where id = ?';
        const [ resultCategoryId ] = await conn.query( queryCategoryId, [ bodyInfo.categoryId, id ] );
    }
    if(bodyInfo.endDate){
        const queryEndDate = 'update auction set endDate = ? where id = ?';
        const [ resultEndDate ] = await conn.query( queryEndDate, [ bodyInfo.endDate, id ] );
    }
    if(bodyInfo.reserve){
        const queryReserve = 'update auction set reserve = ? where id = ?';
        const [ resultReserve ] = await conn.query( queryReserve, [ bodyInfo.reserve, id ] );
    }
    conn.release();
    return
};
const remove = async (id: number) : Promise<Auction[]> => {
    Logger.info(`deleting auction ${id} from the database`);
    const conn = await getPool().getConnection();
    const query = 'delete from auction where id = ?';
    const [ rows ] = await conn.query( query, [ id ] );
    conn.release();
    return null;
};
const getCategories = async () : Promise<any> => {
    Logger.info(`Getting all of categories with id and name`);
    const conn = await getPool().getConnection();
    const query = "select id as categoryId, name from category";
    const [rows] = await conn.query(query);
    conn.release();
    return rows;
};
export { getAuctions, getOne, getAuctionByToken, getCategory, insert, getBids, alter, remove, getCategories }