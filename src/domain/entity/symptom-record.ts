import Crypto from "crypto";

declare type SymptomObservation = {
  symptom: string;
  intensity: number;
  notes?: string;
};

export class SymptomRecord {
  private readonly id: string;

  constructor(
    private readonly userId: string,
    private recordAt: Date,
    private symptoms: SymptomObservation[],
    private notes?: string,
  ) {
    this.id = Crypto.randomUUID();
    this.validate();
    this.symptoms = this.symptoms.map(s => this.validateAndSanitizeSymptom(s));
  }

  public updateRecordAt(date: Date): void {
    if (!date) {
      throw new Error("Record date is required");
    }

    this.recordAt = date;
  }

  public updateNotes(notes: string): void {
    this.notes = notes;
  }

  public updateSymptoms(symptoms: SymptomObservation[]): void {
    this.symptoms = symptoms.map(s => this.validateAndSanitizeSymptom(s));
  }

  public getId(): string {
    return this.id;
  }

  public getSymptoms(): SymptomObservation[] {
    return this.symptoms;
  };

  public getRecordAt(): Date {
    return this.recordAt;
  }

  public getNotes(): string | undefined {
    return this.notes;
  }

  private validate(): void {
    if (!this.userId) {
      throw new Error("User ID is required");
    }

    if (!this.recordAt) {
      throw new Error("Record date is required");
    }

    if (!this.symptoms || this.symptoms.length === 0) {
      throw new Error("At least one symptom observation is required");
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
    if (intensity < 0 || intensity > 10) {
      throw new Error("Intensity must be between 0 and 10");
    }
  }
}
