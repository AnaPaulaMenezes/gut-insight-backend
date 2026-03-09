import { Request, Response } from 'express';
import { SymptomRecordController } from '../../../../src/interface/controller/symptom-record.controller';
import {
  createListSymptomRecordUseCaseMock,
  createRegisterSymptomRecordUseCaseMock,
} from '../../../mocks/use-cases/symptom-record-usecases.mock';

const createResponseMock = () => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  return { status, json };
};

describe('SymptomRecordController', () => {
  let registerUseCase: jest.Mocked<ReturnType<typeof createRegisterSymptomRecordUseCaseMock>>;
  let listUseCase: jest.Mocked<ReturnType<typeof createListSymptomRecordUseCaseMock>>;
  let controller: SymptomRecordController;

  beforeEach(() => {
    registerUseCase = createRegisterSymptomRecordUseCaseMock();
    listUseCase = createListSymptomRecordUseCaseMock();
    controller = new SymptomRecordController(registerUseCase, listUseCase);
  });

  it('should call RegisterSymptomRecordUseCase with the request body and return a 201 response', async () => {
    const expectedOutput = { id: 'abc-123' };
    registerUseCase.execute.mockResolvedValue(expectedOutput);

    const req = {
      body: {
        userId: 'user-1',
        recordAt: '2025-10-14T00:00:00Z',
        symptoms: [{ symptom: 'bloating', intensity: 3 }],
        notes: 'some notes',
      },
    } as unknown as Request;

    const res = createResponseMock() as any;

    await controller.register(req, res);

    expect(registerUseCase.execute).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith(expectedOutput);
  });

  it('should call ListSymptomRecordUseCase with the query params and return a 200 response', async () => {
    const expectedOutput = [
      {
        id: 'abc-123',
        recordAt: new Date('2025-10-14T00:00:00Z'),
        symptoms: [{ symptom: 'bloating', intensity: 3 }],
        notes: 'some notes',
      },
    ];
    listUseCase.execute.mockResolvedValue(expectedOutput);

    const req = { query: { page: '1', limit: '20' } } as unknown as Request;
    const res = createResponseMock() as any;

    await controller.list(req, res);

    expect(listUseCase.execute).toHaveBeenCalledWith(req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(expectedOutput);
  });
});
