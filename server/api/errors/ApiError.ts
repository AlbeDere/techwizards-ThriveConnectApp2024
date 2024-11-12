export class ApiError extends Error {
  constructor(readonly status: number, readonly message: string) {
    super();
  }
}

export class BadRequestError extends ApiError {
  constructor(readonly message: string = "Bad request") {
    super(400, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(readonly message: string = "Not found") {
    super(404, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(readonly message: string = "Internal Server Error") {
    super(500, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(readonly message: string = "Unauthorized") {
    super(401, message);
  }
}
