import * as jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";
import { User } from "../entity/User";

const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
 let token:any = req.headers["x-access-token"];
 if(!token){
    return res.status(403).send({
        message: "No token provided!"
    });
 }
 jwt.verify(token, 'shhhhh',(err: any,decoded:any)=>{
     if(err){
         return res.status(401).send({
             message:"Unauthorized!"
         });
     }
     req.userId = decoded.id;
     next();
 });
};

const isAdmin = (req:Request,res:Response,next:NextFunction) =>{    
    User.findById(req.userId).then((user) =>{
        if(user?.role === "admin"){
            next();
            return;
        }
    res.status(403).send({
        message:"Require Admin Role!"
    });
}).catch((err)=>{
    console.log(err);
});
};

const isUser = (req:Request,res:Response,next:NextFunction) =>{
    User.findById(req.userId).then((user) =>{
            if(user?.role === "user" || user?.role === "admin"){
                next();
                return;
            }
        res.status(403).send({
            message:"Require User Role!"
        });
    }).catch((err)=>{
        console.log(err);
    });
};

export const authJwt = {
    verifyToken,
    isAdmin,
    isUser,
};
