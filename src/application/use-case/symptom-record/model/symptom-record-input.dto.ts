export type SymptomRecordInputDTO = {
    userId: string;
    recordAt: string; // ISO date string
    symptoms: SymptomObservationDTO[];
    notes?: string;
}

export type SymptomObservationDTO = {
    symptom: string;
    intensity: number;
    notes?: string;
}