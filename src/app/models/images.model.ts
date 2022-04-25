import { getPool } from "../../config/db";
import Logger from "../../config/logger";
import { ResultSetHeader } from "mysql2";

const setUserImage = async (id: number, fileName: string,): Promise<any> => {
    const conn = await getPool().getConnection();
    const query = "update user set image_filename = ? where id = ?";
    const [result] = await conn.query(query, [fileName, id]);
    conn.release();
    return result;
};


const deleteImage = async (id: number): Promise<any> => {
    const conn = await getPool().getConnection();
    const query = "update user set image_filename = null where id = ?";
    const [result] = await conn.query(query, [id]);
    conn.release();
    return result;
};

const setAuctionImage = async (id: number, fileName: string,): Promise<any> => {
    const conn = await getPool().getConnection();
    const query = "update auction set image_filename = ? where id = ?";
    const [result] = await conn.query(query, [fileName, id]);
    conn.release();
    return result;
};


export { setUserImage, deleteImage,setAuctionImage};