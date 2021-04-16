import { Request, Response } from "express";
import formidable from "formidable";
import parseCSV from "../../core/useCases/parseCSV";
import { appRepository } from "../server";
import fs from 'fs';
import { ColumnLayout } from "../../core/entities/ColumnLayout";

const ColumnLayout: ColumnLayout = {
  UUID: '',
  VIN: '',
  Make: '',
  Model: '',
  Mileage: '',
  Year: '',
  Price: '',
  ZipCode: '',
  CreateDate: '',
  UpdateDate: '',
}

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
      console.log(fields);    //fields.provider
      const filePath = (files.file as formidable.File).path;

      if(!filePath){
        response.status(400).json({error: "error processing the file"})
      } else {
        //call function parseCsv
        parseCSV(appRepository(), ColumnLayout)(filePath)
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

    }
  });
}
