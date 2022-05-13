const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const ejs = require('ejs')
const { Console } = require('console')
const { title } = require('process')
const port = process.env.PORT || 4242

app.use(express.static(path.resolve('public')))

app.set('view engine', 'ejs')

app.set('views', './views/pages')

const artists = ['Willem Claesz. Heda', 'Joachim Bueckelaer', 'Paul Joseph Constantin Gabriël', 'Lucas van Leyden']

let currentArtist = null

const fetchPainting = async () => {
	return fetchJson('https://www.rijksmuseum.nl/api/nl/collection?key=S0VK6DCj').then((data) => {
            let artist = artists[Math.floor(Math.random() * artists.length)]
            currentArtist = artist
           let filteredData = data.filter(artObject => artObject.principalOrFirstMaker.includes(currentArtist))
		return filteredData;
	})
}

app.get('/', (req, res) => {
    fetchPainting().then((data) => {
        res.render('index', {
            data,
        })
    })
})

async function fetchJson(url) {
    return await fetch(url)
      .then((response) => response.json())
      .then((body) => body.artObjects) 
      .catch((error) => error)
}

let users = [];
let round = 0;

io.on('connection', (socket) => {
    io.emit('connected')

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)

        if (message == currentArtist) {
            console.log('Goed geraden');
            const correctMessage = `You guessed right! The answer was ${currentArtist}`
            io.emit('message', correctMessage)
            round = round + 1
            
            fetchPainting().then((data) => {
                socket.emit('new-painting', data);
            });
        } else {
            const wrongMessage = `You guessed wrong! Take another guess :)`
            io.emit('message', wrongMessage)
        }
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