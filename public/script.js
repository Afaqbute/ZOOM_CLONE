const { text } = require("express");

const  Socket  = io('/')

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path :'/peerjs',
    post : '/',
    port : '3000'
}); 

let myVedioStream
navigator.mediaDevices.getUserMedia
({
    video:true,
    audio:false
}).then(stream =>{
    myVedioStream = stream ;
    addVedioStream(myVideo , stream);


    peer.on('call', call => 
    {
        getUserMedia({video: true, audio: true}, function(stream) 
        {
          call.answer(stream); // Answer the call with an A/V stream.
          const vedio = document.createElement('video')
          call.on('stream', userVideoStream =>
           {
             addVedioStream(vedio,userVideoStream)
                // Show stream in some video/canvas element.
            });
        });

    });
});

Socket.on('user-connected' , (userId) => {
    connecToNewUser(userId , stream);

})


peer.on('open' , id => {
    console.log(id);
    Socket.emit('join-room' , ROOM_ID ,id);

})

const connecToNewUser = (userId) => {
  //  console.log('new-user' , userId); 
  const call = myPeer.call(userId , stream);
  const vedio = document.createElement('video')
  call.on('stream',userVideoStream =>{
      addVedioStream(vedio , userVideoStream)
  })
}

const addVedioStream = (video , stream) =>{
    video.srObject = stream ;
    video.addEventListener('loadedmetadata' , ()=>{
        video.play();
    })

    vedioGrid.append(video)
}

let msg = $('input')
//console.log(msg)
$('html').keydown((e) => {
    if(e.which == 13 && text.val().length !== 0 ){
        //console.log(text.val()); 
        Socket.emit('message' ,text.val());
        text.val('')
    }
});

Socket.on(  'createMessage' , message =>{
// console.log('this is coming from server'.message);
$('ul').append(`<li class = "message"><b>user</b><br/>${message}</li>`);
scrollToBottom()
});


const scrollToBottom = () =>{
    let d = $('.main_chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

//Mute our  Vedio
const muteUnmute = () => {
    const enabled = myVedioStream.getAudioTrack()[0].enabled;
    if(enabled){
        const enabled = myVedioStream.getAudioTrack()[0].enabled = false;
        setUnmuteButton();
    }else{
        setUnmuteButton();
        myVedioStream.getAudioTrack()[0].enabled = true;
        }
}