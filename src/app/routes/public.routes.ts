import { Router } from "express";
import uploadCsvController from "../controllers/uploadCsvHttp.controller";

export const publicRoutes = Router();

publicRoutes.post("/uploadcsv", uploadCsvController);