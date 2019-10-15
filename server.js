const express = require('express')
const cors = require('cors')
const helmet = require('helmet')


const authRouter = require('./auth/authRouter')
const restricted = require('./auth/restrictedMiddleware')
const usersRouter = require('./users/usersRouter')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/auth', authRouter)
server.use('/users', restricted, usersRouter)

server.get('/', (req, res) => {
  res.json({ api: 'safe mothers' })
})

module.exports = server
