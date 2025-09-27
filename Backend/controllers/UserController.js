import User from '../models/UserModel.js';
import AuthHelper from '../utils/AuthHelper.js';

const test = (req, res) => {
  res.status(200).json({ message: 'Welcome to api' });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: 'Email is already used, try different email' });
  }
  const hashedPassword = await AuthHelper.hashPassword(password);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  const token = AuthHelper.genToken(savedUser._id );
  res.status(200).json({
    token,
    userId: savedUser._id,
    message: 'User created successfully',
  });
};

export default { test, signup };
