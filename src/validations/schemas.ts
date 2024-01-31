import Joi from 'joi'

export const createNotesSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required()
})

export const getNotesByIdSchema = Joi.object({
  id: Joi.string().min(6).required()
})

export const updateNotesByIdSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required()
})

export const deleteNotesByIdSchema = Joi.object({
  id: Joi.string().min(6).required()
})
