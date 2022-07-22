import mongoose from "mongoose";
const Schema=mongoose.Schema;

const SubscriptionSchema= new Schema({

      userId : {
        type: String
      },

      email:{
        type: String,
        min: 6,
        max: 20,
    
      },
      tokenId:{
        type: Object
      }
     
});

export default mongoose.model('Subscription', SubscriptionSchema);