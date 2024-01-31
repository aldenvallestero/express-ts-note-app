import { type Request, type Response } from 'express'
import NotesService from '../services/notes-service'
import { type TNote } from '../commons/interfaces-common'

export function createNotes (req: Request, res: Response): void {
  const notes: string = req.body.notes
  const notesService = new NotesService()
  const result = notesService.createNotes(notes)
  res.status(result.status)
  res.send(result.data)
}

export function getAllNotes (req: Request, res: Response): void {
  const notesService = new NotesService()
  const result = notesService.getAllNotes()
  res.status(result.status)
  res.send(result.data)
}

export function getNotesById (req: Request, res: Response): void {
  const notesId = req.params.id
  const notesService = new NotesService()
  const result = notesService.getNotesById(notesId)
  res.status(result.status)
  res.send(result.data)
}

export function updateNotesById (req: Request, res: Response): void {
  const notes: TNote = {
    id: req.params.id,
    value: req.body.notes
  }
  const notesService = new NotesService()
  const result = notesService.updateNotesById(notes)
  res.status(result.status)
  res.send(result.data)
}

export function deleteNotesById (req: Request, res: Response): void {
  const notesId: string = req.params.id
  const notesService = new NotesService()
  const result = notesService.deleteNotesById(notesId)
  res.status(result.status)
  res.send(result.data)
}
