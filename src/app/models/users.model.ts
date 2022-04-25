
import { getPool } from "../../config/db";
import Logger from "../../config/logger";
import { ResultSetHeader } from "mysql2";

// tslint:disable-next-line:no-var-requires
const bcrypt = require("bcrypt");
const hash = async (password: string): Promise<any> => {
  const saltRounds = 10;
  const resultHash = await bcrypt.hash(password, saltRounds);
  return resultHash;
};


const compare = async (password: string, theHash: string): Promise<any> => {
  const match = await bcrypt.compare(password, theHash);
  return match;
};


// tslint:disable-next-line:no-var-requires
const randToken = require("rand-token");
const generateToken = async () : Promise<any> => {
  const token = randToken.generate(32);
  return token;
};


const getAllEmails = async(): Promise<any> => {
  const conn = await getPool().getConnection();
  const query = "select email from user";
  const [result] = await conn.query(query);
  conn.release();
  return result;
};

const checkEmailUsed = async(email: string): Promise<any> => {
  const emailsList = await getAllEmails();
  for (const i in emailsList){
    if(emailsList[i].email === email){
      return true; // the email has been used
    }
  }
  return false; // the email didn't be used
};


const insert = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<any> => {
  Logger.info(`Adding user ${firstName} ${lastName} to the database`);
  const theHash = await hash(password);
  const conn = await getPool().getConnection();
  const query =
    "insert into user (first_name, last_name, email, password) values ( ?, ?, ?, ?)";
  const [result] = await conn.query(query, [firstName, lastName, email, theHash]);
  conn.release();
  return result;
};

const getPassword = async (id: number): Promise<any> => {
  const conn = await getPool().getConnection();
  const query = "select password from user where id = ?";
  const [result] = await conn.query(query, [id]);
  conn.release();
  return result;
};

const getLogin = async (email: string, password: string): Promise<any> => {
  const conn = await getPool().getConnection();
  const query = "select * from user where email = ?";
  const [[result]] = await conn.query(query, [email]);
  const match = await compare(password, result.password);
  if (match === true) {
    const token = await generateToken();
    const updateToken = "update user set auth_token = ? where email = ?";
    await conn.query(updateToken, [token, email]);
    conn.release();
    return [token, result.id];
  } else {
    conn.release();
    return 0;
  }
};


const getLogout = async (token: string): Promise<any> => {
  const conn = await getPool().getConnection();
  const deleteToken = "update user set auth_token = null where auth_token = ?";
  const [result] = await conn.query(deleteToken, [token]);
  conn.release();
  return result;
};


const getUserId = async (token: string): Promise<any> => {
  const conn = await getPool().getConnection();
  if (token === null) return null;
  const query = "select * from user where auth_token = ?";
  const [[result]] = await conn.query(query, [token]);
  conn.release();
  if (result) {
    return result.id;
  } else {
    return 0;
  }
};


const getOne = async (id: number) : Promise<User[]> => {
  Logger.info(`Getting user ${id} from the database`);
  const conn = await getPool().getConnection();
  const query = "select * from user where id = ?";
  const [rows] = await conn.query(query, [id]);
  conn.release();
  return rows;
};


const alter = async (id: number, bodyInfo: any): Promise<User[]> => {
  Logger.info(`Changing user ${id} 's information from the database`);
  const conn = await getPool().getConnection();
  if(bodyInfo.firstName){
    const queryFirstname = 'update user set first_name = ? where id = ?';
    const [ resultFirstname ] = await conn.query( queryFirstname, [ bodyInfo.firstName, id ] );
  }
  if(bodyInfo.lastName){
    const queryLastname = 'update user set last_name = ? where id = ?';
    const [ resultLastname ] = await conn.query( queryLastname, [ bodyInfo.lastName, id ] );
  }
  if(bodyInfo.email){
    const queryEmail = 'update user set email = ? where id = ?';
    const [ resultEmail ] = await conn.query( queryEmail, [ bodyInfo.email, id ] );
  }
  if(bodyInfo.password){
    const theHash = await hash(bodyInfo.password);
    const queryPassword = 'update user set password = ? where id = ?';
    const [ resultPassword ] = await conn.query( queryPassword, [ theHash, id ] );
  }
  conn.release();
  return
};

export { insert, getLogin, getLogout, getOne, alter, getUserId, getPassword, compare, checkEmailUsed };
