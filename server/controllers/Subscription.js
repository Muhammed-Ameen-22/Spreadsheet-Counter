import Subscription from '../models/Subscription.js';
import { OAuth2Client } from 'google-auth-library'

import { google } from 'googleapis';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const OAuth2Data = require('../credentials.json')
const CLIENT_ID = OAuth2Data.web.client_id
const CLIENT_SECRET = OAuth2Data.web.client_secret
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)



const fs = require('fs');
const readline = require('readline');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/userinfo.email'];


// Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Google Drive API.
//     authorize(JSON.parse(content), listFiles);
// });


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
export const getAccessToken = async (req,res)=>{
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url:', authUrl);

    return res.status(200).send(authUrl);

}



export const authenticateToken = async (req, res) => {

    console.log("req inside auth",req.query.code);
    
    if(req.query.code == null) return res.status(400).send("Invalid Request")
    oAuth2Client.getToken(req.query.code, (err, token) => {
        if (err) 
        return console.log('Error retrieving access token', err);
        console.log('token inside autheinticateToken',token)
        oAuth2Client.setCredentials(token);
        // res.send(token)

        
     

        //for getting the user mail id from the id_token.
        oAuth2Client.verifyIdToken({
            idToken: token.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
            
        }
        )
            .then((response) => {
                
                console.log('inside verify token')
                const subscription = new Subscription({ userId: req.user.userId, email: response.payload.email, 
                                     tokenId: token });

                subscription.save();
                console.log("Authenticated user : ",response.payload.email);
            
            })
            .catch((err)=>{console.log("Error verifying token",err)});

    });

    return res.redirect('http://localhost:3000/Subscriptions');

}











// export const subscribe = async (req, res) => {
//     console.log('req body', req.body)
//     const tokenId = req.body.tokenId;


//     client.verifyIdToken({
//         idToken: tokenId,
//         audience: process.env.GOOGLE_CLIENT_ID,
//     })
//         .then(response => {
//             const { email_verified, name, email } = response.payload
//             // console.log('payload',response.payload)

//             if (email_verified) {

//                 Subscription.findOne({ email }, function (data, err) {
//                     if (err) {

//                         //user exists
//                         const response = { "Status": "Failure", "Reason": "Google Account already subscribed" }
//                         return res.status(400).send(response)

//                     }
//                     else {
//                         // const authUrl = oAuth2Client.generateAuthUrl({
//                         //     access_type: 'offline',
//                         //     scope: scopes,
//                         // });
//                         // console.log('authurl',authUrl);

//                         const userId = req.user.userId;
//                         const subscription = new Subscription({ userId: userId, email: email, tokenId: tokenId });
//                         subscription.save();
//                         return res.status(200).send('Successful')
//                     }
//                 }
//                 )
//             }

//         })
//         .catch(error => {
//             console.log('Error', err)
//         })

// }


export const fetchSignedInEmails = async (req, res) => {

    console.log('reached fetchSignedInEmails')
    try {


        //check if user has entry in subscription table
        console.log('user id', req.user.userId)
        Subscription.find({ userId: req.user.userId }, function (err, data) {

            if (data) {
                //user has entry
                // console.log('res', data)
                return res.status(200).json(data);


            }

            else {
                const response = { "Status": "Failure", "Reason": "No Account found" }
                return res.status(400).send(response)

            }

        }
        ).select({ "email": 1, "_id": 0 })
    } catch (error) {

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
