const express = require('express');
const http = require('http');
const PORT = process.env.PORT || 5000
const router = require('./router');
const app = express();
const path = require('path')

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

io.on('connection', (socket) => {
  console.log('We have a new connection <3');
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error)
    socket.emit('message', { user: 'admin', text: `${user.name} has joined #${user.room}` });
    console.log(`${user.name} has joined #${user.room}`)
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined #${user.room}` })
    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    callback();
  });

  socket.on('videoUrl', (videoUrl, callback) => {
    const user = getUser(socket.id);
    console.log(videoUrl)
    io.to(user.room).emit('videoUrl', videoUrl)
    console.log("test")
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on('', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));