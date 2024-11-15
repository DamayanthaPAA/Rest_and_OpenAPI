import { Router } from 'express';
import jwt from 'jsonwebtoken';
// import { getUsers } from '../database.js';

let router = Router()
// let users = getUsers();

let users =[
    {"userName": "jk", "passsword": "sala" , 'token' : ''},
    {"userName": "pl", "passsword": "pass" , 'token' : ''},
]


router.post('/', (req, res) => {
    // console.log(req.body)
    const userName = req.body.userName
    const passsword = req.body.passsword
    let user;
    const secretKey = process.env.JWT_SECRET || 'default_secret_key';

    if (user = users.find(a => (a.userName === userName)&&(a.passsword === passsword)))
    {
        // const token = jwt.sign({userName: userName}, 'my_secret_key',{
        const token = jwt.sign({userName: userName}, secretKey,{
            expiresIn:'1h',

        

        })

        const refreshtoken = jwt.sign({userName: userName}, 'my_secret_key',{
            expiresIn:'1d',
        })
/*
        res.cookie('refreshtoken',refreshtoken,{ httpOnly: true , sameSite: 'strict'})
        .header('Authorization', 'Bearer ' +access_token)
        .json({
            "username": username,
            "expires_in": "1h"
        })
*/
        user.token = token;
        res.json( {
            'username' : userName ,
            'access_token': user.token , // token,
            'token_type' : 'Bearer',
            'expires_in': '1h'


        })
    }else
        res.status(401).json({"error": "login"});
    // {
    //     // req.status(401).json({'sername' : userName  });
    //     res.json( {
    //         'username' : userName ,
    //         'status': 'invalied'
    //     })
    // }
})
 

export default router;