import mongoose from "mongoose";
const Schema=mongoose.Schema;

const UserSchema= new Schema({

    userName:{
        type: String,
        min: 3,
        max: 20,
        unique:true
      },
      password:{
        type: String,
        min: 6,
        max: 20,
    
      }
});

export default mongoose.model('User', UserSchema);