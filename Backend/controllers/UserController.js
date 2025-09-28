import User from '../models/UserModel.js';
import AuthHelper from '../utils/AuthHelper.js';
import ExpressError from '../utils/ExpressError.js';

const test = (req, res) => {
  res.status(200).json({ message: 'Welcome to api' });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new ExpressError(409,'Email is already used, try different email');
  }
  const hashedPassword = await AuthHelper.hashPassword(password);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  const token = AuthHelper.genToken(savedUser._id );
  res.status(201).json({
    success: true,
    token,
    userId: savedUser._id,
    message: 'User created successfully',
  });
};

export default { test, signup };
