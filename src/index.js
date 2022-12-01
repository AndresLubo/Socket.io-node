import express from "express";
import { Server as WebSocketsServer } from "socket.io";
import http from "http";
import { v4 as uuid } from "uuid";

let notes = [];

const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketsServer(httpServer);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  // console.log('Nueva conexión', socket.id);

  socket.emit('server:loadnotes', notes)


  socket.on("client:newnote", (newNote) => {
    const note = {...newNote, id: uuid() }
    notes.push(note);
    io.emit('server:newnote', note)
  });


  socket.on('client:deletenote', id => {
    notes = notes.filter(note => note.id !== id)
    io.emit('server:loadnotes', notes)
  })


  socket.on('client:getnote', id => {
    const note = notes.find(note => note.id === id)
    socket.emit('server:selectednote', note)
  })

  socket.on('client:updatenote', updateNote => {
    notes.map(note => {
      if(note.id === updateNote.id){
        note.title = updateNote.title
        note.description = updateNote.description
      }
      return note
    })

    io.emit('server:loadnotes', notes)
  })

});


httpServer.listen(3000, () => console.log("app running"));
