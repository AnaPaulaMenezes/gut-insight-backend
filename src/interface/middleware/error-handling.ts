import { NotFoundError } from "../../domain/errors/not-found-error";
import { ValidationError } from "../../domain/errors/validation-error";
import { NextFunction, Request, Response } from "express";

export const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal Server Error' });
}