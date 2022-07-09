import 'dotenv/config'
import express from 'express';
import cors from 'cors'

const app = express()
const port = process.env.BACKEND_PORT || 8000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: process.env.MYSQL_HOST_IP || "Can' read docker env variable" })
})

app.listen(port, () => console.log(`🚀 ~ start listening to ${port}`))
