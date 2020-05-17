const mongoose = require('mongoose')
const dbName = 'chatLog'

var connection = null

process.on('exit', ()=>{
  mongoose.disconnect()
})

class MongoDB {
  static createConnection(dbName){
    const options = {
      'dbName': dbName,
      'useNewUrlParser': true,
      'useUnifiedTopology': true,
      'useCreateIndex': true
    }

    return mongoose.createConnection('mongodb://localhost:27017/', options)
  }

  static startEvents(connection, dbName) {
    connection.on('error', function (error) {
        Log.err('Error in MongoDb connection: ' + error)
        mongoose.disconnect()
    })

    connection.on('reconnected', function () {
        Log.debug(`MongoDB reconnected! Database: ${dbName}`)
    })

    connection.on('disconnected', function () {
        Log.debug(`MongoDB disconnected! Database: ${dbName}`)
        connection = MongoDB.createConnection(dbName)
    })
}

static getOrCreateConnection() {
    if (!connection) {
        connection = MongoDB.createConnection(dbName)
        MongoDB.startEvents(connection, dbName)
    }

    return connection
}

}

module.exports = MongoDB;
