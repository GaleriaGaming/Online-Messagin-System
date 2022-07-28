const express = require('express');

const config = require('./server/config');


// Initialiazations
require('./database');
const app = config(express());
require('./config/passport');

// Starting the server
app.listen(app.get('port'), () => {
   console.log('Server  on port', app.get('port'));
});