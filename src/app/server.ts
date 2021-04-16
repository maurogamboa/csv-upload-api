import express from "express";
import config from "./config/config";
import { publicRoutes } from "./routes/public.routes";
  
export default function() {
  
  const app = express();
  const PORT = config.server.port;
  
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  
  //routes
  app.use(publicRoutes);

  //Start server
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at PORT: ${PORT}`);
  });

  return app;
 
}