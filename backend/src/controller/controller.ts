import {Request,Response} from 'express';
import { deleteUserById, getPackegesByUserId, getUserById, getUsers, newPackage, newUser, stornoParckageById, updateUserById, createLabel } from '../db';
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from '../entity/User';

export const signup = async (req:Request,res:Response)=>{
const user = req.body;
user.password = await bcrypt.hash(req.body.password,10);
await newUser(user);
res.send();
}

export const renderPackeges = async (req:Request,res:Response)=>{
 const result = await getPackegesByUserId(req.params.id);
 res.send(result);
}
export const renderUsers = async (req:Request,res:Response)=>{
  const result = await getUsers();
  res.send(result);
 }

export const selectUserById = async (req:Request,res:Response)=>{
 const result = await getUserById(req.params.id);
 res.send(result);
}

export const addPackage = async (req:Request,res:Response)=>{
  const parcel = req.body;
  await newPackage(parcel);
  res.send();
}

export const updateUser = async (req:Request,res:Response)=>{
 await updateUserById(req.body);
 res.send();
}

export const stornoParckage = async (req:Request,res:Response)=>{
  await stornoParckageById(req.params.id);
  res.send();
}

export const deleteUser = async (req:Request,res:Response)=>{    
  await deleteUserById(req.params.id);
  res.send();
}

export const generateLabel = async (req:Request,res:Response) => {
  const pdfBuffer = await createLabel(req.params.id);
  res.send(pdfBuffer);
}

export const signin = (req:Request,res:Response)=>{
  User.findOne({
    email: req.body.email
  }).then(async (user) =>{
    if(!user){
      return res.status(404).send({message:"User not found!"});
    }

    const passwordIsValid = await bcrypt.compare(req.body.password,user.password);
    
    if(!passwordIsValid){
      return res.status(401).send({
        accessToken:null,
        message: "Invalid Password"
      });
    }
    const token = jwt.sign({id:user.id},'shhhhh',{
      expiresIn:86400
    });

    res.status(200).send({
      id:user.id,
      name:user.name,
      postalCode:user.postalCode,
      city:user.city,
      address:user.address,
      telephone:user.telephone,
      email:user.email,
      role:user.role,
      accessToken:token
    });
  }).catch(err =>{
    res.status(500).send({message: err.message});
  })
}
