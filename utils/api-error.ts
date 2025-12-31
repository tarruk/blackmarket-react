export class ApiError extends Error {
  public statusCode: number;
  public statusText: string;
  public errors?: string[];

  constructor(
    message: string,
    statusCode: number = 500,
    statusText: string = "Internal Server Error",
    errors?: string[],
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.errors = errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  getUserMessage(): string {
    if (this.errors && this.errors.length > 0) {
      return this.errors[0];
    }
    return this.message;
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    let errorData: any = {};
    let errorMessage = response.statusText;

    try {
      errorData = await response.json();

      if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        errorMessage = errorData.errors[0];
      } else {
        errorMessage = response.statusText;
      }
    } catch {
      errorMessage = response.statusText;
    }

    return new ApiError(
      errorMessage,
      response.status,
      response.statusText,
      errorData.errors,
    );
  }
}
