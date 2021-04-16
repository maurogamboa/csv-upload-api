import express from "express";
import Repository from "../core/repositories/repository";
import config from "./config/config";
import { ServicesInjection } from "./interfaces/ServiceInjection";
import { publicRoutes } from "./routes/public.routes";

let repository: Repository;

export function appRepository(): Repository {
  return repository
};
  
export default function(services: ServicesInjection) {
  
  const app = express();
  const PORT = config.server.port;
  
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  
  //routes
  app.use(publicRoutes);

    //Initializate services
    repository = new services.repository();

  //Start server
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at PORT: ${PORT}`);
  });

  return app;
 
}