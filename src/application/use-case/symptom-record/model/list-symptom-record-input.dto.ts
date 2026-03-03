export type ListSymptomRecordInputDTO = {
    userId: string;
    fromDate?: string; // ISO date string
    toDate?: string;   // ISO date string
    symptom?: string;
}