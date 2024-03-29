export class NotesError extends Error {
  statusCode: any
  constructor (message: string | undefined, statusCode: any) {
    super(message)
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}
