const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 8001;

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);



mongoose.connect('mongodb://omnistack-week:week123@ds125385.mlab.com:25385/omnistack-week', {
    useNewUrlParser: true
});


app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(port, () => {
    console.log(`Server started on port => ${port}`)
});