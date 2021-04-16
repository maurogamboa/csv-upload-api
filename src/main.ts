import server from "./app/server";
// import { MockRepository } from "./data-source/mock.repository";
import { BlobRepository } from "./data-source/blob.repository";

//setup app services with concrete implementacion
const appServices = {
  repository: BlobRepository
}

//initializate server and inject services
server(appServices);