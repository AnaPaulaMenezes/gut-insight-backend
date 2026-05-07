import mongoose from 'mongoose';

const symptomObservationSchema = new mongoose.Schema({
  symptom: { type: String, required: true },
  intensity: { type: Number, required: true },
  notes: { type: String },
});


const symptomRecordSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  recordAt: { type: Date, required: true },
  symptoms: { type: [symptomObservationSchema], required: true },
  notes: { type: String },
});

export interface SymptomRecordDocument extends Document {
  _id: string;
  userId: string;
  recordAt: Date;
  symptoms: { symptom: string; intensity: number; notes?: string }[];
  notes?: string;
}

export const SymptomRecordModel = mongoose.model<SymptomRecordDocument>(
  'SymptomRecord',
  symptomRecordSchema
);