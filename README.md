# Movie Info and Reviews Web App

This is a simple web application that allows users to search for movie information and reviews using The Movie Database (TMDB) and OMDB APIs. The application uses WebSockets to handle real-time communication between the client and server.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- Search for movies by name.
- Display movie details including title, release date, overview, and poster.
- Show ratings from IMDB and Rotten Tomatoes.
- Real-time data fetching using WebSockets.

## Technologies Used

- HTML, CSS, JavaScript for the front-end.
- Node.js with Express for the back-end.
- WebSocket for real-time communication.
- TMDB and OMDB APIs for movie data.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/movie-info-websocket.git
    cd movie-info-websocket
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:8080`.

3. Enter the name of a movie in the search box and click "Search" to view its details and reviews.

## Project Structure

- `index.html`: The main HTML file.
- `styles.css`: The CSS file for styling the web page.
- `script.js`: The JavaScript file for handling front-end logic.
- `server.js`: The Node.js server file.
- `package.json`: The file that manages the project dependencies.
