import { Router } from 'express'
import { createNotes, deleteNotesById, getAllNotes, getNotesById, updateNotesById } from '../controllers/notes-controller'
import { createNotesValidation, deleteNotesByIdValidation, getNotesByIdValidation, updateNotesByIdValidation } from '../validations/notes-validation'

const notesRouter = Router()

notesRouter

  .post('/', createNotesValidation, createNotes)
  .get('/', getAllNotes)
  .get('/:id', getNotesByIdValidation, getNotesById)
  .put('/:id', updateNotesByIdValidation, updateNotesById)
  .delete('/:id', deleteNotesByIdValidation, deleteNotesById)

export default notesRouter
