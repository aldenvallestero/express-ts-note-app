import app from './configs/app-config'
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Server started running on port', PORT))
