import { Request, Response } from "express";
import formidable from "formidable";
import parseCSV from "../../core/useCases/parseCSV";
import { appRepository } from "../server";
import fs from 'fs';

export default async function uploadCsvController(
  request: Request,
  response: Response
) {
  //handle file upload
  let form = new formidable.IncomingForm();
  form.parse(request, (err, fields, files) => {
    if (err) {
      console.log(fields);    //fields.provider
      response.status(400).json({error: err});
    } else {
      const filePath = (files.file as formidable.File).path;

      if(!filePath){
        response.status(400).json({error: "error processing the file"})
      } else {
        //call function parseCsv
        parseCSV(appRepository())(filePath)
          .then((value) => response.status(200).send(value))
          .catch((err) => response.status(400).json({error: err}))
          .finally(() => {
            //clean up - delete temp file
            fs.unlink(filePath, err => {
              console.log("clean up error:", err);  
            })
          })
      }

    }
  });
  

  response.status(200).json({ result: true });
}
