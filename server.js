require('dotenv').config({path: '.env'})
const path = require('path');

const express = require ('express');
const app = express()
const server = require('http').createServer(app); 
const io = require('socket.io')(server)



const ManagementRoute = require('./src/routes/management-route')

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'htlm');

ManagementRoute.bootstrap(app, io)

const port = process.PORT || 8000

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})