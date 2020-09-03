var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema(
    {
        receiver:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
        message:{
            type:String
        },
        sender:{
            type:Schema.Types.ObjectId,
            ref:'user'
        }

    }
)

module.exports = mongoose.model('chat',ChatSchema);