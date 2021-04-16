import { ColumnLayout } from "../core/entities/ColumnLayout";
import Repository from "../core/repositories/repository";
import fs from 'fs';
import path from "path";
   
//Create blob storage folder
const blobStoragePath = path.join(__dirname, 'blobstorage');
fs.mkdir(blobStoragePath, { recursive: true }, (err) => {
  if (err) {
    throw new Error("can't create a blobstorage directory");
    ;
  }
});


export class BlobRepository implements Repository {

  /**
   * Write data into a file in JSON format
   * @param data 
   * @param provider 
   * @returns 
   */
  insertData(data: ColumnLayout[], provider: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let json = JSON.stringify(data, null);

      const filename = path.join(blobStoragePath, `${provider}.json`);

      fs.writeFile(filename, json, (err) => {
        if (err) reject('An error ocurrs when written to file');;
        resolve();  
      });
    })
    
  }
  

}