export type ListSymptomRecordOutput = {
    id: string;
    recordAt: Date;
    symptoms: {
        symptom: string;
        intensity: number;
        notes?: string;
    }[];
    notes: string;
};