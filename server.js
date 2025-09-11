const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/bouldering', (req, res) => {
    // I will pass the gym data here later
    res.render('bouldering');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});