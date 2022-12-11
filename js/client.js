const socket = io('http://localhost:8000');

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageinp')
const messageContainer = document.querySelector(".container")

// let audio = new Audio('ting.mp3')

const append = (message, position)=>{
    const messageElement = document.createElement("div")
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // if (position == 'left'){
    //     audio.play();
    // }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const userName = prompt("Enter your name to join")
socket.emit('new-user-joined', userName)

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right' )
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message} `, 'left' )
})

socket.on('leave', dataleft =>{
    append(`${dataleft} left the chat`, 'left' )
})