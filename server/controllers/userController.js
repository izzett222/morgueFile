import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import createToken from '../utils/handleJWT';
import db from '../database/models';

config();

const signupController = async (req, res) => {
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
    const token = createToken(email);
    return res.status(201).json({ data: { message: 'signed up successfully', user: userData, token } });
  } catch (err) {
    if (err.errors[0].message === 'email must be unique') {
      return res.status(409).json({ data: { message: 'email already taken' } });
    }
    return res.status(500).json({ error: 'server error' });
  }
};

export default signupController;
