import { google } from "googleapis";

import 'dotenv/config'

// const oauth2Client = new OAuth2Client(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URI
// );
// console.log(process.env.GOOGLE_CLIENT_ID, 'CLIENT-ID')
// console.log(process.env.GOOGLE_CLIENT_SECRET, 'CLIENT-SECRET')
// console.log(process.env.GOOGLE_REDIRECT_URI, 'REDIRECT')
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
);

// const authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/drive.file'],
// })
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const drive = google.drive({version: 'v3', auth: oauth2Client});

export default drive;