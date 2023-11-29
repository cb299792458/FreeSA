const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://freesa-admin:Xw8VPBTYJpWDnJZM@freesa.ydwtfsr.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const brian = new User({
    username: 'brian',
    password: 'password', // Make sure to hash passwords before storing
});
  
brian.save((err, user) => {
    if (err) return console.error(err);
    console.log('User saved:', user);
});

const clarence = new User({
    username: 'clarence',
    password: 'password', // Make sure to hash passwords before storing
});
  
clarence.save((err, user) => {
    if (err) return console.error(err);
    console.log('User saved:', user);
});
  