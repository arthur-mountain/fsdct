import 'dotenv/config'
import express from 'express';
import cors from 'cors'
// import mysql from './model/mysql/index.js'

const app = express()
const port = process.env.BACKEND_PORT || 8000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: process.env.MYSQL_HOST || "Can' read docker env variable" })
})

app.listen(port, () => console.log(`🚀 ~ start listening to ${port}`))
