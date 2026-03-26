type ApiErrorDetails = {
  issue: string
  field: string
}

export interface ApiErrorResponse {
  error: {
    message: string
    code: string
    details?: ApiErrorDetails[]
  }
}

export class ApiError extends Error implements ApiErrorResponse {
  error: {
    message: string
    code: string
    details?: ApiErrorDetails[]
  }
  status: number

  constructor(
    message: string,
    code: string,
    status: number,
    details?: ApiErrorDetails[],
  ) {
    super(message)
    this.error = { message, code, details }
    this.status = status
  }
}
