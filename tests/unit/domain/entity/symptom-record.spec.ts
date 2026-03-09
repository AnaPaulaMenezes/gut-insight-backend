import { SymptomRecord } from '../../../../src/domain/entity/symptom-record';

describe('SymptomRecord', () => {
  it('should create successfully with valid data and normalize symptoms', () => {
    const record = SymptomRecord.create(
      'user-1',
      new Date('2025-10-14T00:00:00Z'),
      [{ symptom: ' Bloating ', intensity: 3, notes: 'mild' }],
      'some notes',
    );

    expect(record.getId()).toEqual(expect.any(String));
    expect(record.getUserId()).toBe('user-1');
    expect(record.getRecordAt().toISOString()).toBe('2025-10-14T00:00:00.000Z');
    expect(record.getSymptoms()).toEqual([
      { symptom: 'bloating', intensity: 3, notes: 'mild' },
    ]);
    expect(record.getNotes()).toBe('some notes');
  });

  it('should throw if created without a userId', () => {
    expect(() =>
      SymptomRecord.create(
        '' as any,
        new Date('2025-10-14T00:00:00Z'),
        [{ symptom: 'bloating', intensity: 3 }],
      ),
    ).toThrow('User ID is required');
  });

  it('should throw if created without a record date', () => {
    expect(() =>
      SymptomRecord.create(
        'user-1',
        null as any,
        [{ symptom: 'bloating', intensity: 3 }],
      ),
    ).toThrow('Record date is required');
  });

  it('should throw if created without symptoms', () => {
    expect(() =>
      SymptomRecord.create('user-1', new Date(), []),
    ).toThrow('At least one symptom observation is required');
  });

  it('should throw when updating record date to null', () => {
    const record = SymptomRecord.create(
      'user-1',
      new Date('2025-10-14T00:00:00Z'),
      [{ symptom: 'bloating', intensity: 3 }],
    );

    expect(() => record.updateRecordAt(null as any)).toThrow(
      'Record date is required',
    );
  });

  it('should throw when updating symptoms with invalid intensity', () => {
    const record = SymptomRecord.create(
      'user-1',
      new Date('2025-10-14T00:00:00Z'),
      [{ symptom: 'bloating', intensity: 3 }],
    );

    expect(() =>
      record.updateSymptoms([{ symptom: 'bloating', intensity: -1 }]),
    ).toThrow('Intensity must be between 0 and 10');
  });
});
