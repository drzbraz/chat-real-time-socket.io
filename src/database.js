const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = mongoose.connection;

var userdata = new Schema({
  type: String,
  content: String,
  id: String,
  from: String,
  to: String,
  metadata: [{ date_created: String }]
});

var userModel = mongoose.model("userModel", userdata, "costumer");

class MongoDB {
  static insertData(message) {
    db.once("open", function() {
      var data = [
        {
          type: message.type,
          content: message.content,
          id: message.id,
          from: message.from,
          to: message.to,
          metadata: message.metadata
        }
      ];
      userModel.collection.insert(data, function(err, docs) {
        if (err) {
          return console.log(err);
        }
      });
    });

    mongoose.connect("mongodb://localhost:27017/db_user", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  }
}

module.exports = MongoDB;
