const { Socket } = require('socket.io');

//node server which handle socket connection
const io = require('socket.io')(8000)
const users = {};

io.on('connection', socket => {       // io on listen all he events whereas socket on listen specific events and perfomed action accordigly
    socket.on('new-user-joined', name => {
        // console.log('new-user-joined', name);
        users[socket.id] = name;    
        socket.broadcast.emit('user-joined', name);     
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })
    socket.on('disconnect', dataleft =>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })
});