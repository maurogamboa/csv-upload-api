import { ColumnLayout } from "../entities/ColumnLayout";
import Repository from "../repositories/repository";
import csvParser from "csv-parser";
import fs from 'fs';

const parseCSV = (repo: Repository, layout: ColumnLayout) => async (file: string, provider: string): Promise<void> => {

  return new Promise((resolve, reject) => {
    const results: ColumnLayout[] = [];
    
    //parse csv
    fs.createReadStream(file)
    .pipe(csvParser())
    .on('data', (data) => {
      //mapping to layout
      const newLayout = {...layout}
      for (let key in newLayout) {
        newLayout[key] = data[key] ?? '';
      }
      results.push(newLayout)
    })
    .on('end', async () => {
      try { //save into repository
        await repo.insertData(results, provider);  
        resolve();
      } catch (error) {
        reject(error)
      }
    });
  })
  
}

export default parseCSV;