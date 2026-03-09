import { Request, Response } from 'express';
import { SymptomRecordController } from '../../../../src/interface/controller/symptom-record.controller';
import { ListSymptomRecordUseCase } from '../../../../src/application/use-case/symptom-record/list-symptom-record.usecase';
import { RegisterSymptomRecordUseCase } from '../../../../src/application/use-case/symptom-record/register-symptom-record.usecase';

describe('SymptomRecordController', () => {
  let mockRegisterUseCase: jest.Mocked<RegisterSymptomRecordUseCase>;
  let mockListUseCase: jest.Mocked<ListSymptomRecordUseCase>;
  let controller: SymptomRecordController;

  beforeEach(() => {
    mockRegisterUseCase = {
      execute: jest.fn()
    } as unknown as jest.Mocked<RegisterSymptomRecordUseCase>;

    mockListUseCase = {
      execute: jest.fn()
    } as unknown as jest.Mocked<ListSymptomRecordUseCase>;

    controller = new SymptomRecordController(mockRegisterUseCase, mockListUseCase);
  });

  it('should call RegisterSymptomRecordUseCase with the request body and return a 201 response', async () => {
    const expectedOutput = { id: 'abc-123' };
    mockRegisterUseCase.execute.mockResolvedValue(expectedOutput);

    const req = {
      body: {
        userId: 'user-1',
        recordAt: '2025-10-14T00:00:00Z',
        symptoms: [{ symptom: 'bloating', intensity: 3 }],
        notes: 'some notes'
      }
    } as unknown as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    await controller.register(req, res);

    expect(mockRegisterUseCase.execute).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(expectedOutput);
  });

  it('should call ListSymptomRecordUseCase with the query params and return a 200 response', async () => {
    const expectedOutput = [
      {
        id: 'abc-123',
        recordAt: new Date('2025-10-14T00:00:00Z'),
        symptoms: [{ symptom: 'bloating', intensity: 3 }],
        notes: 'some notes'
      }
    ];
    mockListUseCase.execute.mockResolvedValue(expectedOutput);

    const req = { query: { page: '1', limit: '20' } } as unknown as Request;
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    await controller.list(req, res);

    expect(mockListUseCase.execute).toHaveBeenCalledWith(req.query);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expectedOutput);
  });
});
