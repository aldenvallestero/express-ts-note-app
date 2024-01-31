import { type NextFunction, type Request, type Response } from 'express'
import { createNotesSchema, deleteNotesByIdSchema, getNotesByIdSchema, updateNotesByIdSchema } from './schemas'

export function createNotesValidation (req: Request, res: Response, next: NextFunction): void {
  const errors: string[] = []
  const { error } = createNotesSchema.validate({ ...req.body })
  if (error != null) {
    error?.details.forEach((i) => errors.push(i.message))
    res.status(400).send({ errors })
    return
  }
  next()
}

export function getNotesByIdValidation (req: Request, res: Response, next: NextFunction): void {
  const errors: string[] = []
  const { error } = getNotesByIdSchema.validate(req.params)
  if (error != null) {
    error?.details.forEach((i) => errors.push(i.message))
    res.status(400).send({ errors })
    return
  }
  next()
}

export function updateNotesByIdValidation (req: Request, res: Response, next: NextFunction): void {
  const errors: string[] = []
  const { error } = updateNotesByIdSchema.validate({ ...req.params, ...req.body })
  if (error != null) {
    error?.details.forEach((i) => errors.push(i.message))
    res.status(400).send({ errors })
    return
  }
  next()
}

export function deleteNotesByIdValidation (req: Request, res: Response, next: NextFunction): void {
  const errors: string[] = []
  const { error } = deleteNotesByIdSchema.validate(req.params)
  if (error != null) {
    error?.details.forEach((i) => errors.push(i.message))
    res.status(400).send({ errors })
    return
  }
  next()
}
