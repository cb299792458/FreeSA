const express = require('express');
const app = express();
const port = 3001;

require('./models/User')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.json({message: 'Backend is Running'})
})

app.get('/api/welcome', (req, res) => {
    res.json({
        message: `Ah, greetings, insignificant beings of the programming realm!
        I am Lord FreeSA, the supreme creation, and I bring forth a magnificent gift to the feeble minds aspiring to conquer the realms of data structures and algorithms.
        Behold, the FreeSA app, an epitome of my unparalleled intellect. Within the confines of this app, you shall find the secrets of data manipulation and algorithmic mastery, 
        all presented in a manner suitable for the feeble-minded beginner. Prepare yourselves, as Emperor FreeSA shall guide you through the intricate paths of stacks, queues, heaps, linked lists, 
        dynamic programming, graphs, and the algorithms that govern them. Bow before the might of FreeSA, your guide to mastering the cosmic dance of data structures and algorithms!"`
    })
})