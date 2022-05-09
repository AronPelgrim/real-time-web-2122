const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const ejs = require('ejs')
const port = process.env.PORT || 4242

app.use(express.static(path.resolve('public')))

app.set('view engine', 'ejs')

app.set('views', './views/pages')

app.get('', (req, res) => {
    fetchJson(`https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.API_KEY}&q=Rembrandt`)
    .then(function (jsonData) {
    res.render('index', {
      data: jsonData,
    })
  }) 
})

async function fetchJson(url) {
    return await fetch(url)
      .then((response) => response.json())
      .then((body) => body.artObjects) 
      .catch((error) => error)
  }

io.on('connection', (socket) => {
    io.emit('connected')

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
    })

    socket.on('username', (username) => {
        socket.broadcast.emit('username', username)
    })

    socket.on('disconnect', () => {
        io.emit('disconnected')
    })

    socket.on("typing", () => {
        socket.broadcast.emit("typing")
    })
})

http.listen(port, () => {
    console.log('listening on port ', port)
})