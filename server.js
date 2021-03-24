const express = require ('express');
const ejs = require('ejs');
const app = express ;
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4 : uuidv4 } = require ('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer (server , {
    debug : true 
});

//console.log('hi');
app.set('view engine', './views'); // specify the views directory
app.set('view engine', 'ejs');     // register the template engine

//console.log('hello');

app.use(express.static('public'));

app.use('/peerjs' , peerServer);

app.get('/', (req, res) => {
    //res.status(200).send('Hello World');
    res.render('./views/room.ejs');
   res.redirect(`/${uuidv4()}`);
})

app.get('/:room' , (req ,res)=>{
    res.render('room', {roomId: req.params.room});
})

io.on('connection' , Socket =>{
    socket.on('join-room' , (roomId , userId) =>{
        socket.join(roomId);
        console.log('we have joined the room');
        socket.io(roomId).broadcast.emit('User-connected' , userId);  
        socket.on('message' , message =>{
        io.to(roomId).emit('createMessage' , message)

        }) 
    })
})



server.listen(3000);
