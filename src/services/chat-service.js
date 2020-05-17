const Chat = require('../model/chat')


class ChatService{
    static async create(typeLog,contentLog,idLog,fromLog,toLog,date_created){
        let newChat = await Chat.create(typeLog,contentLog,idLog,fromLog,toLog,date_created)
        return newChat
    }

    static async insertData(data){
       Chat.insertData(data)        
    }

    static findID(data, messages){
        
        for(var i=0, l = messages.length; i<l; i++){    
            
            if(data.friend == messages[i].author){        
                return messages[i].id;
            }           
            
        }
    }
}

module.exports = ChatService