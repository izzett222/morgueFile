import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { google } from 'googleapis';

config();
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND,
);
oauth2Client.setCredentials({
  refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: SENDER_EMAIL_ADDRESS,
    clientId: MAILING_SERVICE_CLIENT_ID,
    clientSecret: MAILING_SERVICE_CLIENT_SECRET,
    refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
    accessToken,
  },
});
const sendEmail = async (email, subject, html) => {
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: email,
    subject,
    html,
  };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export default sendEmail;
