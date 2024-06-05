const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const TMDB_API_KEY = 'af5d59325a310881a3af0db5878d94f3';
const OMDB_API_KEY = '23d3a334';

app.use(express.static(path.join(__dirname, 'public')));


wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        const query = message.toString();
        try {
            const fetch = await import('node-fetch').then(module => module.default);
            const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
            const tmdbData = await tmdbResponse.json();
            const movie = tmdbData.results[0];

            if (movie) {
                const omdbResponse = await fetch(`http://www.omdbapi.com/?t=${movie.title}&apikey=${OMDB_API_KEY}`);
                const omdbData = await omdbResponse.json();

                ws.send(JSON.stringify({ movie, ratings: omdbData }));
            } else {
                ws.send(JSON.stringify({ error: 'No movie found' }));
            }
        } catch (error) {
            ws.send(JSON.stringify({ error: 'Error fetching movie data' }));
        }
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
