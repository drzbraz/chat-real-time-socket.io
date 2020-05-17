const ChatController = require('../controllers/chat-ctrl')
const ChatService = require('../services/chat-service')

let messages = [];

class ChatRoute{
    static handler(server,io){
        let path = '/'
        server.use(`${path}`, ChatController.findHtml.bind(this))
        io.on('connection', onConnect)      

        function  onConnect(socket){

            socket.emit('previousMessage', messages);
        
            socket.on('sendMessage', data => {
            messages.push(data);   
            ChatService.insertData(data);   
            console.log(data)       
        
            if(data.friend){   
                io.to(`${ChatService.findID(data, messages)}`).emit('receivedMessage', data);  
            }else
            socket.broadcast.emit('receivedMessage', data);     
           
            })
        }

    }

    
}

module.exports = ChatRoute