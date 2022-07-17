import mongoose from "mongoose";
const Schema=mongoose.Schema;

const SubscriptionSchema= new Schema({

      userId:[
        {
        type: Schema.Types.ObjectId, 
        ref: 'User'
        }
      ],
      
      email:{
        type: String,
        min: 6,
        max: 20,
    
      },
      tokenId:{
        type: String,
        min: 6,
        max: 20,
    
      }
     
});

export default mongoose.model('Subscriptions', SubscriptionSchema);