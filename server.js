const restify = require ('restify');
const ManageRoute = require('./src/routes/manage-routes')
require('dotenv').config({path: '.env'})
const server = require('http').restify.createServer(); 

server.use(restify.plugins.queryParser({mapParams: false}))
server.use(restify.plugins.jsonBodyParser({mapParams: true}))

const path = require('path');
const MongoDB = require('./src/database');


const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'../public')));
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'htlm');

app.use('/', (req,res)=>{
    res.render('index.html');   
});

let messages = [];

function findID(data, messages){

    for(var i=0, l = messages.length; i<l; i++){    

        if(data.friend == messages[i].author){        
            return messages[i].id;
        }           
        
    }
}

io.on('connection', onConnect);

function onConnect(socket){

    socket.emit('previousMessage', messages);

    socket.on('sendMessage', data => {
    messages.push(data);   
    MongoDB.insertData(data);

    producer.send({
        topic: 'test-topic',
        messages: [
            {value: data},
        ],
    })

    if(data.friend){   
        io.to(`${findID(data, messages)}`).emit('receivedMessage', data);  
    }else
    socket.broadcast.emit('receivedMessage', data);     
   
    });
};

return server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})