import bcrypt from 'bcryptjs';
import Config from './Config.js';
import jwt from 'jsonwebtoken';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const genToken = (id) => {
  return jwt.sign({ id }, Config.secretKey, { expiresIn: '1h' });
};

const comparePasswords = async (enteredPassword, storedPassword) => {
  return bcrypt.compare(enteredPassword, storedPassword)
}

export default { hashPassword, genToken, comparePasswords };
