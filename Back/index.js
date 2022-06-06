const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Io = require('socket.io')
const socketIO = Io(server, {
  cors: {
    origin: "*",
  }
})

const cors = require('cors')

app.use(express.json())
app.use(cors());

let array = []

app.get('/', (req, res) => {
  socketIO.emit("number", array);
  console.log(array)
  res.status(200).json({message: "Efetuado com sucesso"})
})

app.post('/', (req, res) => {
  array.push(req.body)
  
  try {
    socketIO.emit("number", array);
    res.status(200).json({message: "Registrado com sucesso"})
  } catch (error) {
    
  }
})

socketIO.on("connection", (socket) => {
    console.log(socket.id);
    console.log('conectado')
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});