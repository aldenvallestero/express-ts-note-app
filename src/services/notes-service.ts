import { randomUUID } from 'crypto'
import cache from '../configs/cache-config'
import { type TNotes } from '../commons/types-common'
import { type TNote, type IReturn } from '../commons/interfaces-common'

class NotesService {
  #getNoteIndexById (notes: TNote): number | undefined {
    const allNotes: TNotes = cache.get('notes')
    return allNotes?.findIndex(i => i.id === notes.id)
  }

  createNotes (notes: string): IReturn {
    console.log(`NotesService.createNotes: ${notes}`)
    const allNotes: TNotes = cache.get('notes')

    if (allNotes == null) {
      cache.set('notes', [{ id: randomUUID(), value: notes }])
    } else {
      allNotes?.push({ id: randomUUID(), value: notes })
      cache.set('notes', allNotes)
    }

    return {
      status: 200,
      data: {
        message: 'Notes successfully recorded!'
      }
    }
  }

  getAllNotes (): IReturn {
    console.log('NotesService.getAllNotes')
    const result: TNotes = cache.get('notes')
    return {
      status: 200,
      data: {
        message: 'All notes successfully retrieved!',
        notes: result
      }
    }
  }

  getNotesById (notesId: string): IReturn {
    console.log(`NotesService.getNotesById: ${notesId}`)
    const allNotes: TNotes = cache.get('notes')
    const notesIndex: number | undefined = allNotes?.findIndex(i => i.id === notesId)

    if (notesIndex !== undefined && allNotes !== undefined) {
      const result = [allNotes[notesIndex]]
      return {
        status: 200,
        data: {
          message: 'All notes successfully retrieved!',
          notes: result
        }
      }
    } else {
      return {
        status: 400,
        data: {
          message: 'All notes successfully retrieved!',
          notes: []
        }
      }
    }
  }

  updateNotesById (notes: TNote): IReturn {
    console.log(`NotesService.updateNotesById: ${JSON.stringify(notes)}`)
    const allNotes: TNotes = cache.get('notes')
    const noteIndex: number | undefined = this.#getNoteIndexById(notes)

    if ((noteIndex !== undefined) && (allNotes !== undefined) && (notes.id != null)) {
      allNotes[noteIndex] = { id: notes.id, value: notes.value }
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
          message: 'All notes successfully retrieved!',
          notes: []
        }
      }
    }
  }

  deleteNotesById (notesId: string): IReturn {
    console.log(`NotesService.deleteNotesById: ${notesId}`)
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
          message: 'Note does not exist!'
        }
      }
    }
  }
}

export default NotesService
