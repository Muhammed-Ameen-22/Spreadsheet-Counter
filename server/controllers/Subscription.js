import Subscription from '../models/Subscription.js';
import {OAuth2Client} from 'google-auth-library'
import google from 'googleapis'


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
// const oAuth2Client = new google(client_id, client_secret, redirect_uris[0]);

export const subscribe=async(req,res)=>{
    console.log('req body',req.body)
    const  tokenId=req.body.tokenId;
 

    client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT_ID})
    .then(response=>{
        const {email_verified,name,email} = response.payload
        // console.log('payload',response.payload)

        if(email_verified)
        {
            Subscription.findOne({email}, function (data,err) {
                if (err) 
                {
                    
                    //user exists
                    const response = { "Status": "Failure", "Reason": "Google Account already subscribed" }
                    return res.status(400).send(response)
    
                }
                else{
                    
                const userId=req.user.userId;
                const subscription = new Subscription({userId:userId,email:email, tokenId:tokenId });
                subscription.save();
                return res.status(200).send('Successful')
                }
            }
                 )
        }
        
    })
    .catch(error=>{
        console.log('Error',err)
    })

}


export const fetchSignedInEmails =async(req,res)=>{

    console.log('reached fetchSignedInEmails')
    try {
        

        //check if user has entry in subscription table
        console.log('user id',req.user.userId)
        Subscription.find({ userId : req.user.userId }, function (err,data) {
            
            if (data) 
            {
                 //user exist
                console.log('res',data)
                return res.status(200).json(data);
               

            }

            else{
                const response = { "Status": "Failure", "Reason": "No Account found" }
                return res.status(400).send(response)

            }

        }
        ).select({"email":1,"_id":0})
        }catch (error) {
             
    }
}


// export const readDrive= async (req, res) => {
//     if (req.body.token == null) return res.status(400).send('Token not found');
//     OAuth2Client.credentials(req.body.token);
//     const drive = google.drive({ version: 'v3', auth: OAuth2Client });
//     drive.files.list({
//         pageSize: 10,
//     }, (err, response) => {
//         if (err) {
//             console.log('The API returned an error: ' + err);
//             return res.status(400).send(err);
//         }
//         const files = response.data.files;
//         if (files.length) {
//             console.log('Files:');
//             files.map((file) => {
//                 console.log(`${file.name} (${file.id})`);
//             });
//         } else {
//             console.log('No files found.');
//         }
//         res.send(files);
//     });
// };
