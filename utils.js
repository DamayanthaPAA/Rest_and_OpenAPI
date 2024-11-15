
import jwt from 'jsonwebtoken';
import { getUsers } from './database.js';


const verifyToken = (req,res,next) =>{
    const bearer_token = req.header('Authorization');
    console.log(bearer_token);
    if(bearer_token && bearer_token.toLowerCase().startsWith('bearer ')){
        const token = bearer_token.substring(7);
        try {
            const secretKey = process.env.JWT_SECRET || 'default_secret_key';
            const decoded_token = jwt.verify(token,secretKey);//best abe on env varibales

            // const decoded_token = jwt.verify(token,'my_secret_key');//best abe on env varibales
            const now = Date.now()/1000
            const isValid = (decoded_token.exp-now) >= 0 ? true : false ;
            if (isValid) {
                console.log(decoded_token);
            const users = getUsers();
            

            if (users.find(a => a.userName === decoded_token.userName && (a.token = token))){
                next();
            }else
                res.status(401).json({ "error": "unautorized"});
            }else
                res.status(401).json({ "error": "unautorized expied"});
            } catch (error) {
                console.log(error);
                res.status(401).json({ "error": "Invalid Token catch "});
            }  
    }else
        res.status(401).json({ "error": "Invalid Token"});
     
}

 

const sum = (a, b) => {
    return a + b;
}

export {
    sum,
    verifyToken
}