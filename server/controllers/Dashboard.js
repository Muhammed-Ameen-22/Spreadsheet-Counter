import { google } from 'googleapis';

import { createRequire } from 'module';
import Subscription from '../models/Subscription.js';
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

export const populateDashboard = async (req, res) => {
  // check in the db for accesstoken
  console.log('email id',req.body)
  const userInstance = await Subscription.findOne({ email: req.body.email_id });
  if (userInstance != null) {

    // console.log('user instance',userInstance )
    const tokenId = userInstance.tokenId; 
    oAuth2Client.setCredentials(tokenId);

    
    // //setting a new jwt token for the access token

    // const auth_access_token = jwt.sign(
    //   {tokenId},
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: '25 days',
    //   }
    // );
  
    // res.cookie('auth_access_token', token, {
    //   httpOnly: true,
    //   maxAge: 2160000000,
    //   secure: process.env.ENV == 'production' ? true : false,
    // });



    
    const files = await getSheetsFromDrive(oAuth2Client)
    console.log('files user', files)
    return res.send(files);

  }
  else {
    const response = { "Status": "Failure", "Reason": "Please authenticate with Google OAuth first" }
    return res.status(400).send(response)
  }

}

// function getSheetsFromDrive(auth) {

// const getSheetsFromDrive = async (auth)=> {

//   console.log("Inside getsheets");
//   const drive =  google.drive({ version: 'v3', auth });
//     drive.files.list({
//     q: 'mimeType=\'application/vnd.google-apps.spreadsheet\'',
//     pageSize: 10,
//     fields: 'nextPageToken, files(id, name)',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const files = res.data.files;

//     console.log('res files',res.data.files)
//     if (files.length) {

//       console.log('Files:');

//       files.map((file) => {

//         console.log(`${file.name} (${file.id})`);
//       });
//       return res.data.files;
//       // return files;

//     } else {
//       console.log('No files found.');
//     }


//     //get the sheet date with the spreadsheet id

//     const sheets = google.sheets({ version: 'v4', auth });
//     sheets.spreadsheets.values.get({
//       spreadsheetId: files[0].id,
//       range: 'Sheet1!1:1',
//     }, (err, res) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       const rows = res.data.values;
//       if (rows.length) {
//         console.log('Name, Major:');
//         // Print columns A and E, which correspond to indices 0 and 4.
//         rows.map((row) => {
//           console.log(`${row}`);
//         });
//       } else {
//         console.log('No data found.');
//       }
//     });


//   });
// }


const getSheetsFromDrive = async (auth) => {

  const drive = google.drive({ version: 'v3', auth });
  const api = google.sheets({ version: 'v4', auth: auth });
  try {

    try{
    var res = await drive.files.list({
      q: 'mimeType=\'application/vnd.google-apps.spreadsheet\'',
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    })
  }
  catch(err){
    console.log("Error while listing files:" + err)
  }

    const files = res.data.files;

    if (files.length) {

      // console.log('Files:', typeof (files));

      await Promise.all(files.map(async (file) => {
        console.log(`${file.name} (${file.id})`);
        const sheet_data = await api.spreadsheets.get({ spreadsheetId: file.id });

        console.log("inside file map");
        let sheetNames = [];
        await Promise.all(sheet_data.data.sheets.map( (sheet) => {
          console.log("Inside sheet map");
          console.log("sheet name:", sheet.properties.title);
          sheetNames.push(sheet.properties.title);
        }));
        file.sheetNames = sheetNames;
        
      }));

      // console.log("before return", files);
      return files;

    } else {
      console.log('No files found.');
    }

  }  catch (err) {
    console.log('The API returned an error: ' + err);
  };
   
}

 export const getDataFromSpreadsheetById=async(req,res)=>{

    let size=0;
    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    
    console.log('req body',req.body)
    
  const userInstance = await Subscription.findOne({ email: req.body.email_id });
  if (userInstance != null) {

    // console.log('user instance',userInstance )
    const tokenId = userInstance.tokenId; 
    oAuth2Client.setCredentials(tokenId);
  }

    sheets.spreadsheets.values.get({
      spreadsheetId: req.body.sheet_id,
      range: req.body.selectedTab+'!1:1',
    }, (err, resp) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = resp.data.values;
      // console.log('rows',rows,rows[0].filter(Boolean).length)
      if (rows) {

         size = rows[0].filter(Boolean).length;
         return res.status(200).send(size.toString());
        
        
      }
      else{
        return res.status(200).send(size.toString());
      }
    }
    
    );

  }



