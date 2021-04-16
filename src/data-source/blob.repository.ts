import { ColumnLayout } from "../core/entities/ColumnLayout";
import Repository from "../core/repositories/repository";
import fs from 'fs';

export class BlobRepository implements Repository {

  /**
   * Write data into a file
   * @param data 
   * @param provider 
   * @returns 
   */
  insertData(data: ColumnLayout[], provider: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let json = JSON.stringify(data, null);
      const filename = `${(new Date).toISOString()}.json`;

      fs.writeFile(filename, json, (err) => {
        if (err) reject('An error ocurrs when written to file');;
        resolve();  
      });
    })
    
  }
  

}