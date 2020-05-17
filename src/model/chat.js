const DataService = require('../services/data-service')

const MongoDB = require('../databases/database')
const connection = MongoDB.getOrCreateConnection()

const {ChatSchema,ChatDefault} = require('../schema/chat-schema')
const Chat = connection.model('chat', ChatSchema, 'chatLogs')

class ChatModel{
    constructor(){}
    static async create(typeLog,contentLog,idLog,fromLog,toLog,date_created){
        let log = ChatDefault()
        log.type = typeLog,
        log.content = contentLog,
        log.id = idLog,
        log.cretedAt = DataService.now().toDate(), 
        log.updateAt = DataService.now().toDate()

        return log
    } 

    static async get (idMessage) {
        try {
            return await Lead.findOne({ 'id': idMessage }).lean()
        } catch (err) {
            console.log(err)
        }
    }
    
    static async insertData(message){
        Chat.collection.insert( await ChatModel.create(message.id,message.author,message.message,message.friend))

    }
}

module.exports = ChatModel