import { Router } from 'express';
import jwt from 'jsonwebtoken';
let router = Router()

let users =[
    {"userName": "jk", "passsword": "sala" , 'token' : ''},
    {"userName": "pl", "passsword": "pass" , 'token' : ''},
]

export const getUsers = () =>{
    return users
}
router.post('/', (req, res) => {
    // console.log(req.body)
    const userName = req.body.userName
    const passsword = req.body.passsword
    let user;
    if (user = users.find(a => (a.userName === userName)&&(a.passsword === passsword)))
    {
        const token = jwt.sign({userName: userName}, 'my_secret_key',{
            expiresIn:'1h',

        })
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