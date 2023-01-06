const apiServer = require('./api')
const httpServer = require('http').createServer(apiServer)
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

const PORT = 4000

httpServer.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}...`);
})

let playerReadyCount = 0
io.on("connection", (socket) => {
    console.log(`user connected, id: ${socket.id}. players:${playerReadyCount}`);

    socket.on('ready', () => {
        playerReadyCount++
        console.log('player ready', socket.id);

        if (playerReadyCount % 2 === 0) {
            io.emit("startGame", socket.id)
        }
    })

    socket.on('paddleMove',(paddledata)=>{
        socket.broadcast.emit('paddleMove',paddledata)
    })

    socket.on("ballMove",(ballData)=>{
        socket.broadcast.emit('ballMove',ballData)
    })

    socket.on('disconnect',(reason)=>{
        console.log(`Client ${socket.id} disconnected due to ${reason}`)
    })
})