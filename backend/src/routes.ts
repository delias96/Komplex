import {IRouter} from 'express';
import { deleteUser, renderPackeges, selectUserById, addPackage, signup, stornoParckage, updateUser, renderUsers, signin, generateLabel } from './controller/controller';
import { authJwt } from "./middleware/authJwt";


export function getRouter(app:IRouter) {
  app.get("/user/:id",[authJwt.verifyToken,authJwt.isAdmin], selectUserById);
  app.post("/user/update/:id",[authJwt.verifyToken,authJwt.isAdmin], updateUser);
  app.delete("/user/:id",[authJwt.verifyToken,authJwt.isAdmin], deleteUser);
  app.get("/users",[authJwt.verifyToken,authJwt.isAdmin], renderUsers);

  app.get("/packages/:id",[authJwt.verifyToken,authJwt.isUser], renderPackeges);
  app.post("/newPackages",[authJwt.verifyToken,authJwt.isUser], addPackage);
  app.get("/package/:id",[authJwt.verifyToken,authJwt.isUser], stornoParckage);
  app.get("/createLabel/:id",[authJwt.verifyToken,authJwt.isUser], generateLabel)

  app.post("/auth/signup",signup)
  app.post("/auth/signin",signin);
}
