import { ColumnLayout } from "../entities/ColumnLayout";

export default interface Repository {
  insertData(data: ColumnLayout[], provider: string): Promise<void>;
}