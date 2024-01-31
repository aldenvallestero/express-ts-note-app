import { randomUUID } from 'crypto'
import cache from '../configs/cache-config'
import { type TNotes } from '../commons/types-common'
import { type TNote, type IReturn } from '../commons/interfaces-common'
import { NotesError } from '../commons/errors-common'
import logger from '../utils/logger-util'

class NotesService {
  #getNoteIndexById (notes: TNote): number | undefined {
    logger.info(`NotesService.getAllNotes: ${JSON.stringify(notes)}`)
    const allNotes: TNotes = cache.get('notes')
    return allNotes?.findIndex(i => i.id === notes.id)
  }

  createNotes (notes: TNote): IReturn {
    try {
      logger.info(`NotesService.createNotes: ${JSON.stringify(notes)}`)
      const allNotes: TNotes = cache.get('notes')

      if (allNotes == null) {
        cache.set('notes', [{ id: randomUUID(), ...notes }])
      } else {
        allNotes?.push({ id: randomUUID(), ...{ ...notes } })
        cache.set('notes', allNotes)
      }

      return {
        status: 200,
        data: {
          message: 'Notes successfully recorded!'
        }
      }
    } catch (error) {
      logger.error(`NotesService.createNotes: ${JSON.stringify(error)}`)
      throw new NotesError('NotesService.createNotes', 500)
    }
  }

  getAllNotes (): IReturn {
    try {
      logger.info('NotesService.getAllNotes')
      const result: TNotes = cache.get('notes')
      return {
        status: 200,
        data: {
          message: 'All notes successfully retrieved!',
          notes: result
        }
      }
    } catch (error) {
      logger.error(`NotesService.getAllNotes: ${JSON.stringify(error)}`)
      throw new NotesError('NotesService.getAllNotes', 500)
    }
  }

  getNotesById (notesId: string): IReturn {
    try {
      logger.info(`NotesService.getNotesById: ${notesId}`)
      const allNotes: TNotes = cache.get('notes')
      const notesIndex: number | undefined = allNotes?.findIndex(i => i.id === notesId)

      if (notesIndex !== undefined && allNotes !== undefined) {
        const result = [allNotes[notesIndex]]
        return {
          status: 200,
          data: {
            message: 'Note has been successfully retrieved!',
            notes: result
          }
        }
      } else {
        return {
          status: 400,
          data: {
            message: 'Notes not found!',
            notes: []
          }
        }
      }
    } catch (error) {
      logger.error(`NotesService.createNotes: ${JSON.stringify(error)}`)
      throw new NotesError('NotesService.createNotes', 500)
    }
  }

  updateNotesById (notes: TNote): IReturn {
    try {
      logger.info(`NotesService.updateNotesById: ${JSON.stringify(notes)}`)
      const allNotes: TNotes = cache.get('notes')
      const noteIndex: number | undefined = this.#getNoteIndexById(notes)

      if ((noteIndex !== undefined) && (allNotes !== undefined) && (notes.id != null)) {
        allNotes[noteIndex] = { id: notes.id, ...{ ...notes } }
        cache.set('notes', allNotes)
        return {
          status: 200,
          data: {
            message: 'Note has been successfully updated!'
          }
        }
      } else {
        return {
          status: 400,
          data: {
            message: 'Notes not found!',
            notes: []
          }
        }
      }
    } catch (error) {
      logger.error(`NotesService.createNotes: ${JSON.stringify(error)}`)
      throw new NotesError('NotesService.createNotes', 500)
    }
  }

  deleteNotesById (notesId: string): IReturn {
    try {
      logger.info(`NotesService.deleteNotesById: ${notesId}`)
      let allNotes: TNotes = cache.get('notes')
      if (allNotes !== undefined) {
        allNotes = allNotes.filter(i => i.id !== notesId)
        cache.set('notes', allNotes)
        return {
          status: 200,
          data: {
            message: 'Note has been successfully removed!'
          }
        }
      } else {
        return {
          status: 400,
          data: {
            message: 'Notes not found!'
          }
        }
      }
    } catch (error) {
      logger.error(`NotesService.createNotes: ${JSON.stringify(error)}`)
      throw new NotesError('NotesService.createNotes', 500)
    }
  }
}

export default NotesService
