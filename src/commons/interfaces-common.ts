import { type TNotes } from './types-common'

export interface IReturn {
  status: number
  data: {
    message: string
    notes?: TNotes | undefined
  }
}

export interface TNote {
  id?: string
  value: string
}
