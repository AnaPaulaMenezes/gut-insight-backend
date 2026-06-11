import { Request } from 'express';
import { errorHandlingMiddleware } from '../../../../src/interface/middleware/error-handling';
import { ValidationError } from '../../../../src/domain/errors/validation-error';
import { NotFoundError } from '../../../../src/domain/errors/not-found-error';


describe(errorHandlingMiddleware.name, () => {
  let req: Request;
  let res: any;
  let next: any;
  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  
  });

  it('Should return error 400 when it is a Validation Error', () => {
    const err = new ValidationError('Validation error');
    errorHandlingMiddleware(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Validation error' });
  });


  it('Should return error 500 when it is an unknown error', () => {
    const err = new Error('Unknown error');
    errorHandlingMiddleware(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

  it('Should return error 404 when it is a Not Found Error', () => {
    const err = new NotFoundError('Not found error');
    errorHandlingMiddleware(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not found error' });
  });
});
