const ChatService = require('../services/chat-service')


class ChatController{
    constructor(){

    }
    static async findHtml(req,res){
        try{
            res.render('index.html')
            
        }catch(err){
            console.log(err)
        }
    }    
}

module.exports = ChatController