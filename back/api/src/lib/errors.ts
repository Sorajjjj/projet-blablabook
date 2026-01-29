// Create http error class extends Error interface
export class HttpError extends Error {
  statusCode: number;

  //   Constructor called when new http error created
  constructor(message: string, statusCode: number) {
    // Call parent error constructor and set error message
    super(message);
    // Store status code in error istance
    this.statusCode = statusCode;
  }
}

// Malformed, invalid, deptive request error handler
export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
// JWT error handler
// (missing or invalid)
export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

// (insufficient rights)
export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 403);
  }
}

// Broken or dead links error handler
export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}

// Conflic with current state error handler
export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}
