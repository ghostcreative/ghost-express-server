const { get } = require('lodash');
const {
  AuthenticationError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalError,
  NotFoundError,
  RateLimitError
} = require('@foundry-ai/api-errors');

export function errorHandler(err, req, res, next) {
  const standardErrorResponse = (error) => res.status(error.status).json(toResJson(error, get(res, 'sentry')));

  if (err instanceof ValidationError) {
    const badRequestError = BadRequestError.createFromValidationError(err);
    return standardErrorResponse(badRequestError);
  }

  if (err instanceof InternalError) return standardErrorResponse(err);

  if (err instanceof AuthenticationError) return standardErrorResponse(err);

  if (err instanceof ForbiddenError) return standardErrorResponse(err);

  if (err instanceof NotFoundError) return standardErrorResponse(err);

  if (err instanceof BadRequestError) return standardErrorResponse(err);

  if (err instanceof ConflictError) return standardErrorResponse(err);

  if (err instanceof RateLimitError) return standardErrorResponse(err);

  if (err && err.type && err.status && err.message) {
    return standardErrorResponse(err);
  }

  console.log(err);
  const apiError = new InternalError();
  standardErrorResponse(apiError);
}

export function toResJson(err, errorId) {
  return {
    id: errorId,
    type: err.type,
    status: err.status,
    message: err.message
  };
}
