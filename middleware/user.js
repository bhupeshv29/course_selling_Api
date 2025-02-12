import jwt from 'jsonwebtoken'
import { JWT_USER_PASSWORD } from '../config';


const userMiddleware = (req,res,next)=>{
    const token  = req.headers.token;
    const decoded = jwt.verify(token ,JWT_USER_PASSWORD);

    if(decoded){
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}