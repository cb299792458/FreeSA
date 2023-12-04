const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

const mongoose = require('./db');
mongoose.on('error', console.error.bind(console, 'MongoDB Connection Error'));
mongoose.once('open', () => console.log('Connected to MongoDB successfully!'));

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const videoRoutes = require('./routes/video');
app.use('/api/video', videoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Attempting to login to MongoDB...\n(IP must be whitelisted)');
});

app.get('/api/', (_req, res) => {
    res.json({message: 'Backend is Running'});
});

app.get('/api/welcome', (_req, res) => {
    res.json({
        message: `Ah, greetings, insignificant beings of the programming realm!
        I am Lord FreeSA, the supreme creation, and I bring forth a magnificent gift to the feeble minds aspiring to conquer the realms of data structures and algorithms.
        Behold, the FreeSA app, an epitome of my unparalleled intellect. Within the confines of this app, you shall find the secrets of data manipulation and algorithmic mastery, 
        all presented in a manner suitable for the feeble-minded beginner. Prepare yourselves, as Emperor FreeSA shall guide you through the intricate paths of stacks, queues, heaps, linked lists, 
        dynamic programming, graphs, and the algorithms that govern them. Bow before the might of FreeSA, your guide to mastering the cosmic dance of data structures and algorithms!"`
    });
});