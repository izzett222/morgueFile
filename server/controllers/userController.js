import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/handleJWT';
import createEmail from '../utils/createEmailHtml';
import sendEmail from '../utils/sendEmail';
import db from '../database/models';

config();

export const signupController = async (req, res) => {
  const { User } = db;
  const {
    firstName, lastName, email, password,
  } = req.body;
  try {
    const data = {
      firstName, lastName, email, password: await bcrypt.hash(password, 10), isVerified: false,
    };
    const newUser = await User.create(data);
    const { password: userPassword, ...userData } = newUser.dataValues;
    const token = createToken(newUser.id);
    const emailBody = createEmail(userData.firstName, 'welcome to morguefile', 'please click on the button below to verify ur account', 'verify', 'www.google.com');
    await sendEmail(userData.email, 'verify account', emailBody);
    return res.status(201).json({ data: { message: 'signed up successfully', user: userData, token } });
  } catch (err) {
    if (err.errors[0].message === 'email must be unique') {
      return res.status(409).json({ data: { message: 'email already taken' } });
    }
    return res.status(500).json({ error: 'server error' });
  }
};

export const verifyAccountController = async (req, res) => {
  const { user } = req;
  const { User } = db;
  console.log(user);
  try {
    await User.update({ isVerified: true }, { where: { id: user.id } });
    return res.status(200).json({ message: 'Account verified successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'server error' });
  }
};
