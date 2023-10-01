const socket = io('http://localhost:8000');
const form = document.getElementById('sendcontainer');
const messageinput = document.getElementById('message');
const messagecontainer = document.querySelector('.container');
// In the JavaScript file
var audio = new Audio('C:/Users/ritesh chaurasia/Desktop/chat app/js/nodeserver/audio/Short Sms Nice One.mp3');

const append = (message, position, time) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `
        <span class="time">${time}</span>
        <span class="message-text">${message}</span>
    `;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.appendChild(messageElement);
    if (position === 'left') {
        audio.play();
    }
};
form.addEventListener('submit',(e)=>{
e.preventDefault();
const message=messageinput.value;
append(`you ${message}`, 'right',getCurrentTime()); // Fix the backticks here
socket.emit('send',message);
messageinput.value="";
});
let name = prompt("Enter your name");
while(name===""){
    name = prompt(" please Enter your name");

}
socket.emit('new user joined', name);


socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right',getCurrentTime());
});
socket.on('received',data=>{
    append(`${data.name}: ${data.message}`, 'left',getCurrentTime()); // Fix the backticks here
});

socket.on('left',name=>{
    append(`${name} left chat`, 'left',getCurrentTime()); // Fix the backticks here
});

function getCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return timeString;
};