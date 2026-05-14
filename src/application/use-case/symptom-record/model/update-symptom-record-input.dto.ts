import type { SymptomObservationDTO } from "./symptom-record-input.dto";

export type UpdateSymptomRecordInputDTO = {
  id: string;
  userId: string;
  recordAt?: string;
  symptoms?: SymptomObservationDTO[];
  notes?: string;
};
