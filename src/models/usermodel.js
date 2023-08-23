const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   fname:{type:String,required:true},
   userName:{type:String,required:true},
   email:{type:String,required:true,tolowercase:true},
},
{
  timestamps : true
}
);

module.exports = mongoose.model("UserModel",userSchema);