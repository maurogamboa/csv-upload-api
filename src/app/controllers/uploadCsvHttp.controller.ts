import { Request, Response } from "express";
import formidable from "formidable";
import parseCSV from "../../core/useCases/parseCSV";
import { appRepository } from "../server";
import fs from 'fs';
import { appColumnLayout } from "../config/column-layout";

export default async function uploadCsvController(
  request: Request,
  response: Response
) {
  //handle file upload
  let form = new formidable.IncomingForm();
  form.parse(request, (err, fields, files) => {
    if (err) {
      response.status(400).json({error: err});
    } else {
      const provider = fields.provider as string; 
      
      if(!provider || typeof provider !== 'string') {
        response.status(400).json({error: "provider is a required string field"})  
      }

      const filePath = (files.file as formidable.File).path;

      if(!filePath){
        response.status(400).json({error: "error processing the file"})
      } 
        
      //call function parseCsv
      parseCSV(appRepository(), appColumnLayout)(filePath, provider)
        .then((value) => response.status(200).json({result: "ok"}))
        .catch((err) => response.status(400).json({error: err}))
        .finally(() => {
          //clean up - delete temp file
          fs.unlink(filePath, err => {
            if(err) {
              console.log("clean up error:", err); 
            }
          })
        })

    }
  });
}
