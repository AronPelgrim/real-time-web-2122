let socket = io()
let input = document.querySelector('input')

const username = prompt("Please enter a username: ", "");
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    if (username) {
        socket.emit('username', username)
        addUsername(username)
    }
})

let messages = document.querySelector('section ul')

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  if (input.value) {
      console.log(input)
    socket.emit('message', input.value)
    addMessage(input.value)
    input.value = ''
  }
})

function addMessage(message) {
    messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
    messages.scrollTop = messages.scrollHeight
}

function addUsername(username) {
    var element = document.createElement('li');
    element.classList.add('username');
    messages.appendChild(Object.assign(element, { textContent: username }))
    messages.scrollTop = messages.scrollHeight
}

socket.on('message', message => {
    addMessage(message)
})

socket.on('username', username => {
    addUsername(username)
})

socket.on('disconnected', () => {
  var element = document.createElement('li');
  element.classList.add('disc');
  messages.appendChild(Object.assign(element, { textContent: "A user is disconnected" }))
  messages.scrollTop = messages.scrollHeight
})

socket.on('connected', () => {
  var element = document.createElement('li');
  element.classList.add('conn');
  messages.appendChild(Object.assign(element, { textContent: "A new user is connected" }))
  messages.scrollTop = messages.scrollHeight
})

input.addEventListener("keypress", () => {
  socket.emit("typing")
})

socket.on("typing", () => {
  if (document.querySelector('.typing_text') == null) {
    var element = document.createElement('li');
    element.classList.add('typing_text');
    messages.appendChild(Object.assign(element, { textContent: 'typing' }))
    messages.scrollTop = messages.scrollHeight;
}
  setTimeout(() => {
    element.remove()
  }, 1000)
})

