const mongoose = require('mongoose')
const express = require('express')
const logger = require('./services/logger')

const config = require('./config/dev')
const auth = require('./controllers/auth')

const server = express()
const PORT = config.server_port

server.use(express.json())
server.use('/api/auth/', auth)


const main = async () => {

    try {
        logger.info(config.mongo_url)
        await mongoose.connect(config.mongo_url)
        
        server.listen(PORT, ()=> logger.info(`work on: http://localhost:${PORT}/`))

    } catch (error) {
        logger.error(error);
    }

}

main()
