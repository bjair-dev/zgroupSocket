


const express = require("express")
const app = express()
const serverNode = require("http").createServer(app)
const UDP = require('dgram')
const server = UDP.createSocket('udp4')

const port = 2222

const mensajePaEnvio = null
const io = require("socket.io")(serverNode,{
    cors:{origin:"*"}
})




server.on('listening', () => {
  // Server address it’s using to listen

  const address = server.address()

  console.log('Listining to ', 'Address: ', address.address, 'Port: ', address.port)
})

server.on('message', (message, info) => {
  console.log('Message', message.toString())

  const response = Buffer.from('Message Received')

  //sending back response to client

  server.send(response, info.port, info.address, (err) => {
    if (err) {
      console.error('Failed to send response !!')
    } else {
      emitEvent("new_message", message.toString() );

      console.log('Response send Successfully')
    }
  })
})
server.bind(port)

    io.on("connection",(socket)=>{

           
        console.log("Conectado")
  
        socket.on("disconnect",(socket)=>{
            console.log("desconectado")
        })
    })
    
function emitEvent(eventName, data) {
    io.emit(eventName, data);
}

function emicionJson(eventName, data) {
  io.emit(eventName, data);
}
serverNode.listen(3000,()=>{
    console.log("Conectado al servidor")
}) 


app.post('/api/contenedores',  (req, res) => {
  console.log(req.body,"2")

  const body = req.body;
  const values = Object.values(body).join(',');
  res.json({ values });
  emicionJson("new_json",   values);
})