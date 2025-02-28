const socket = io()
const input = document.querySelector('input')
let painting = document.querySelector('img')
let messages = document.querySelector('section .answer')
let title = document.querySelector('li h1')
const username = prompt("Please enter a username: ", "")

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    if (username) {
        socket.emit('username', username)
        addUsername(username)
    }
})

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  if (input.value) {
    socket.emit('message', input.value)
    addMessage(input.value)
    input.value = ''
  }
})

input.addEventListener("keypress", () => {
  socket.emit("typing")
})

const addMessage = (message) => {
  let guess = document.createElement('li')
  guess.classList.add('guessing')
  messages.appendChild(Object.assign(guess, { textContent: message }))
  messages.scrollTop = messages.scrollHeight
  setTimeout(() => {
    guess.remove()
  }, 5000)
}

const addUsername = (username) => {
  let user = document.createElement('li')
  user.classList.add('username')
  messages.appendChild(Object.assign(user, { textContent: username }))
  messages.scrollTop = messages.scrollHeight
  setTimeout(() => {
    user.remove()
  }, 5000)
}

socket.on('message', message => {
    addMessage(message)
})

socket.on('username', username => {
    addUsername(username)
})

socket.on('disconnected', () => {
  const element = document.createElement('li')
  element.classList.add('disc')
  messages.appendChild(Object.assign(element, { textContent:  `Opponent is disconnected` }))
  messages.scrollTop = messages.scrollHeight
  setTimeout(() => {
    element.remove()
  }, 5000)
})

socket.on('connected', () => {
  const element = document.createElement('li')
  element.classList.add('conn')
  messages.appendChild(Object.assign(element, { textContent: `A new player is connected` }))
  messages.scrollTop = messages.scrollHeight
  setTimeout(() => {
    element.remove()
  }, 5000)
})

socket.on('new-painting', (data) => {
  painting.src = data[0].webImage.url
  title.innerHTML = data[0].title
  console.log(data[0].principalOrFirstMaker)
})

socket.on("typing", () => {
  if (document.querySelector('.typing_text') == null) {
    var element = document.createElement('li')
    element.classList.add('typing_text')
    messages.appendChild(Object.assign(element, { textContent: `Opponent is typing` }))
    messages.scrollTop = messages.scrollHeight
}
  setTimeout(() => {
    element.remove()
  }, 1000)
})
