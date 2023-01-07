import { query } from '../../db/index';
import jwt from 'jsonwebtoken';
import config from './auth.config';

let checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await query("select * from users where username = $1 or email = $2", [req.body.username, req.body.email]);
        if (user.rowCount > 0) {
            return res.status(400).send({
                message: "Failed! Username or email is already in use!"
            });
        }
        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Username and email!"
        });      
    }
}

let verifyToken = (req, res, next) => {
    let token = req.session.token;
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    try{
      let payload = jwt.verify(token, config.secret);
      req.userId = payload.id;
      next();
    } catch (error) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
};


export { checkDuplicateUsernameOrEmail, verifyToken };