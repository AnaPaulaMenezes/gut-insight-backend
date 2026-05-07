import { ListSymptomRecordInputDTO } from "../../application/use-case/symptom-record/model/list-symptom-record-input.dto";
import { SymptomRecord } from "../entity/symptom-record";

export type SymptomRecordFilters = {
  userId?: string;
  fromDate?: Date;
  toDate?: Date;
  symptom?: string;
}
export interface SymptomRecordRepository {
  save(record: SymptomRecord): Promise<void>;
  findById(id: string): Promise<SymptomRecord | null>;
  findByFilter(filters: SymptomRecordFilters): Promise<SymptomRecord[]>;
  deleteById(id: string): Promise<void>;
}