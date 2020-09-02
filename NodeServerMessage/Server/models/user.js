var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            min:5,
            max:120
        },
        password:{
            type:String,
            required:true,
            min:8,
            max:25
        }

    }
)

module.exports = mongoose.model('user',UserSchema);