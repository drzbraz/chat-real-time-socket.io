import express from 'express';
import path from 'path';
const app = express();


const server = require('http').createServer(app);
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

    if(data.friend){   
        io.to(`${findID(data, messages)}`).emit('receivedMessage', data);  
    }else
    socket.broadcast.emit('receivedMessage', data);     
   
    });
};

server.listen(3000);