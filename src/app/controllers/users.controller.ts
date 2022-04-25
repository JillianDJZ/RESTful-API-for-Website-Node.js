import * as users from "../models/users.model";
import Logger from "../../config/logger";
import { Request, Response } from "express";


const register = async (req: Request, res: Response): Promise<void> => {
  Logger.http(
    `POST register a user with username, email and password: ${req.body.firstName} ${req.body.lastName} ${req.body.email} ${req.body.password}`
  );
  if ( !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      res.status(400).send(`Please provide all field.`);
      return
  }
  if ( req.body.password.length === 0 ||  req.body.lastName.length === 0 ||  req.body.email.length === 0 ||  req.body.firstName.length === 0) {
      res.status(400).send(`Field cannot be empty.`);
      return
  }
  if (!req.body.email.match("@")) {
    res.status(400).send("Please provide email field with @ in it");
    return;
  }
  const isEmailBeenUsed = await users.checkEmailUsed(req.body.email);
  if (isEmailBeenUsed) {
    res.status(400).send(`The email has been used.`);
    return
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await users.insert(firstName, lastName, email, password);
    res.status(201).send({ userId: result.insertId });
  } catch (err) {
    res
      .status(500)
      .send(`ERROR creating user ${firstName} ${lastName}: ${err}`);
  }
};


const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const isEmailBeenUsed = await users.checkEmailUsed(req.body.email);
    if (!isEmailBeenUsed) {
      res.status(400).send(`The email is wrong.`);
      return
    }
    const result = await users.getLogin(req.body.email, req.body.password);
    if (result === 0) {
      res.status(400).send(`Password is wrong.`);
      return
    } else {
      res.status(200).send({ userId: result[1], token: result[0] });
      return
    }
  } catch (err) {
    res.status(500).send(`ERROR login user ${req.body.email}: ${err}`);
  }
};


const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.get("X-Authorization");
    const usersId = await users.getUserId(token);
    await users.getLogout(token);
    if (usersId !== 0) {
      res.status(200).send(`Logout Successfully.`);
      return
    } else {
      res.status(401).send(`Unauthorized.`);
      return
    }
  } catch (err) {
    res.status(500).send(`ERROR logout user : ${err}`);
  }
};


const read = async (req: Request, res: Response) : Promise<void> =>
{
  Logger.http(`GET single user id: ${req.params.id}`)
  const id = req.params.id;
  try {
    const token = req.get('X-Authorization');
    const result = await users.getOne( parseInt(id, 10) );
    if( result.length === 0 ){
      res.status( 404 ).send('User not found');
      return;
    } if (result[0].auth_token === token){
      res.status( 200 ).send( {firstName: result[0].first_name, lastName: result[0].last_name, email: result[0].email} );
      return
    } else {
      res.status( 200 ).send( {firstName: result[0].first_name, lastName: result[0].last_name} );
      return
    }
  } catch( err ) {
    res.status( 500 ).send( `ERROR reading user ${id}: ${ err }`
    );
  }
};


const update = async (req: any, res: any): Promise<any> => {
  Logger.http(`PATCH user id: ${req.params.id} 's information.`)
  try {
    const token = req.get("X-Authorization");
    const usersId = await users.getUserId(token);
    if(usersId === 0) {
      res.status(401).send(`Unauthorized.`);
      return;
    } else if (usersId !== parseInt(req.params.id, 10)){
      res.status(403).send(`Forbidden.`);
      return;
    }
    if(req.body.email){
      const isEmailBeenUsed = await users.checkEmailUsed(req.body.email);
      if (isEmailBeenUsed) {
        res.status(400).send(`The email has been used.`);
        return;
      } else if (!req.body.email.match("@")) {
        res.status(400).send("Please provide email field with @ in it");
        return;
      }
    }
      // check the user exist
    const passwordFromDB = await users.getPassword(parseInt(req.params.id, 10));
    if (passwordFromDB.length < 1) {
      res.status(404).send(`Not Found the user.`);
      return
    }
    // check current password exist
    if ( !req.body.currentPassword || req.body.currentPassword.length < 1) {
      res.status(400).send(`Please give the current password.`);
      return
    }
    // check current password right
    const match = await users.compare(req.body.currentPassword, passwordFromDB[0].password);
    if (match === false) {
      res.status(403).send(`Password is wrong.`);
      return
    } else {
      const change = await users.alter(parseInt(req.params.id, 10), req.body);
      const result = await users.getOne(parseInt(req.params.id, 10));
      res.status( 200 ).send( result );
      return
    }
  } catch( err ) {
    res.status( 500 ).send( `ERROR update user ${req.params.id}: ${ err }`
    );
  }
};


export { register, login, logout, read, update };
