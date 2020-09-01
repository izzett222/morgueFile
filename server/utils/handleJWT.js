import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const createJWT = (email) => {
  const string = jwt.sign({ email }, process.env.JWT_SECRET);
  return string;
};
export default createJWT;
