const ChatRoute = require('./chat-route')

class ManagementRoute{
    static bootstrap(server,io){
        ChatRoute.handler(server,io)
    }
}

module.exports = ManagementRoute
