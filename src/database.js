const mogoose = require('mongoose');

const { database } = require('./keys');

mogoose.connect(database.URI, {
    useNewUrlParser: true,
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));