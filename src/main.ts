import server from "./app/server";
import { MockRepository } from "./data-source/mock.repository";

//setup app services with concrete implementacion
const appServices = {
  repository: MockRepository
}

//initializate server and inject services
server(appServices);