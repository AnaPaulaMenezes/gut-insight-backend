import Crypto from "crypto";
import { ValidationError } from "../errors/validation-error";
import { isDate } from "util/types";

export type SymptomObservation = {
  symptom: string;
  intensity: number;
  notes?: string;
};

export class SymptomRecord {

  private constructor(
    private readonly id: string,
    private readonly userId: string,
    private recordAt: Date,
    private symptoms: SymptomObservation[],
    private notes?: string,
  ) {
    this.symptoms = this.symptoms.map(s => this.validateAndSanitizeSymptom(s));
    this.validateRequiredFields();
    this.validateRecordAt();
  }

  public static create(userId: string, recordAt: Date, symptoms: SymptomObservation[], notes?: string): SymptomRecord {
    return new SymptomRecord(Crypto.randomUUID(), userId, recordAt, symptoms, notes);
  }
  public static rehydrate(id: string, userId: string, recordAt: Date, symptoms: SymptomObservation[], notes: string): SymptomRecord {
    return new SymptomRecord(id, userId, recordAt, symptoms, notes);
  }

  public updateRecordAt(date: Date): void {
    if (!date) {
      throw new ValidationError("Record date is required");
    }

    this.recordAt = date;
  }

  public updateNotes(notes: string): void {
    this.notes = notes;
  }

  public updateSymptoms(symptoms: SymptomObservation[]): void {
    if(!symptoms?.length) throw new ValidationError("Symptoms is required")
    this.symptoms = symptoms.map(s => this.validateAndSanitizeSymptom(s));
  }

  public getId(): string {
    return this.id;
  }

  public getSymptoms(): SymptomObservation[] {
    return [...this.symptoms];
  };

  public getRecordAt(): Date {
    return this.recordAt;
  }

  public getNotes(): string | undefined {
    return this.notes;
  }

  public getUserId(): string {
    return this.userId;
  }

  private validateRequiredFields(): void {
    if (!this.userId) {
      throw new ValidationError("User ID is required");
    }

    if (!this.recordAt) {
      throw new ValidationError("Record date is required");
    }

    if (!this.symptoms || this.symptoms.length === 0) {
      throw new ValidationError("At least one symptom observation is required");
    }
  }

  private validateAndSanitizeSymptom(symptoms: SymptomObservation): SymptomObservation {
    const sanitizedSymptom = this.sanitizeSymptom(symptoms.symptom);
    this.validateIntensity(symptoms.intensity);
    return { ...symptoms, symptom: sanitizedSymptom };
  }

  private sanitizeSymptom(symptom: string): string {
    return symptom.trim().toLowerCase();
  }

  private validateIntensity(intensity: number): void {
    if (isNaN(intensity) || intensity < 1 || intensity > 10) {
      throw new ValidationError("Intensity must be between 1 and 10");
    }
  }

  private validateRecordAt(): void{
    const now = new Date();

    if (this.recordAt > now) {
      throw new ValidationError("Record date cannot be in the future")
    }
  }
}
