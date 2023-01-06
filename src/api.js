const express = require('express')
const cors = require('cors')

const api = express.Router()

api.use(cors({
    origin: "http://localhost:3000"
}))

module.exports = api