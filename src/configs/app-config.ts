import express, { type Express } from 'express'
import notesRouter from '../routes/notes-route'

const app: Express = express()

app.use(express.json())
app.use('/notes', notesRouter)

export default app
