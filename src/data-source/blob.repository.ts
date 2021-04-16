import { ColumnLayout } from "../core/entities/ColumnLayout";
import Repository from "../core/repositories/repository";

export class MockRepository implements Repository {
  private records: ColumnLayout[] = [];
  insertData(data: ColumnLayout[], provider: string): Promise<void> {

    
  }
  

}