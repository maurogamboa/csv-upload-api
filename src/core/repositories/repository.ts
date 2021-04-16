import { ColumnLayout } from "../entities/ColumnLayout";

export default interface Repository {
  insertData(data: ColumnLayout[]): Promise<void>;
}