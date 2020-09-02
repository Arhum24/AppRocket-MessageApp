var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema(
    {
        message:{
            type:String
        },
        sender:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
        type:{
            type:String
        }

    }
)

module.exports = mongoose.model('chat',ChatSchema);