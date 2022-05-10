import express from "express";
import cors from "cors";
import { getRouter } from "./routes";
import { dbConnect } from "./db";

function httpServer() {
  const app = express();

  app.use(
    cors({
      allowedHeaders: "*",
    })
  );
  
  app.use(express.json());

  getRouter(app);
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

dbConnect().then(httpServer).catch(err =>{
  console.log(err);
});