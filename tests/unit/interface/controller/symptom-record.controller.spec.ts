import { Request, Response } from 'express';
import { SymptomRecordController } from '../../../../src/interface/controller/symptom-record.controller';
import {
  createListSymptomRecordUseCaseMock,
  createRegisterSymptomRecordUseCaseMock,
  createGetByIdSymptomRecordUseCaseMock,
  createUpdateSymptomRecordUseCaseMock,
  createDeleteSymptomRecordUseCaseMock,
} from '../../../mocks/use-cases/symptom-record-usecases.mock';

const createResponseMock = () => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  return { status, json };
};

describe('SymptomRecordController', () => {
  let registerUseCase: jest.Mocked<ReturnType<typeof createRegisterSymptomRecordUseCaseMock>>;
  let listUseCase: jest.Mocked<ReturnType<typeof createListSymptomRecordUseCaseMock>>;
  let getByIdUseCase: jest.Mocked<ReturnType<typeof createGetByIdSymptomRecordUseCaseMock>>;
  let updateUseCase: jest.Mocked<ReturnType<typeof createUpdateSymptomRecordUseCaseMock>>;
  let deleteUseCase: jest.Mocked<ReturnType<typeof createDeleteSymptomRecordUseCaseMock>>;
  let controller: SymptomRecordController;

  beforeEach(() => {
    registerUseCase = createRegisterSymptomRecordUseCaseMock();
    listUseCase = createListSymptomRecordUseCaseMock();
    getByIdUseCase = createGetByIdSymptomRecordUseCaseMock();
    updateUseCase = createUpdateSymptomRecordUseCaseMock();
    deleteUseCase = createDeleteSymptomRecordUseCaseMock();
    controller = new SymptomRecordController(
      registerUseCase,
      listUseCase,
      getByIdUseCase,
      updateUseCase,
      deleteUseCase,
    );
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

  it('should call UpdateSymptomRecordUseCase with id from params and body, and return a 200 response', async () => {
    const expectedOutput = { id: 'abc-123' };
    updateUseCase.execute.mockResolvedValue(expectedOutput);

    const req = {
      params: { id: 'abc-123' },
      body: {
        userId: 'user-1',
        recordAt: '2025-10-15T00:00:00Z',
        symptoms: [{ symptom: 'bloating', intensity: 5 }],
        notes: 'updated notes',
      },
    } as unknown as Request;

    const res = createResponseMock() as any;

    await controller.update(req, res);

    expect(updateUseCase.execute).toHaveBeenCalledWith({
      id: 'abc-123',
      userId: 'user-1',
      recordAt: '2025-10-15T00:00:00Z',
      symptoms: [{ symptom: 'bloating', intensity: 5 }],
      notes: 'updated notes',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(expectedOutput);
  });

  it('should call DeleteSymptomRecordUseCase with id from params and body, and return a 200 response', async () => {
    const expectedOutput = { id: 'abc-123' };
    deleteUseCase.execute.mockResolvedValue(expectedOutput);

    const req = {
      params: { id: 'abc-123' },
      query: {
        userId: 'user-1',
      },
    } as unknown as Request;

    const res = createResponseMock() as any;

    await controller.delete(req, res);

    expect(deleteUseCase.execute).toHaveBeenCalledWith({
      id: 'abc-123',
      userId: 'user-1',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(expectedOutput);
  });
});
