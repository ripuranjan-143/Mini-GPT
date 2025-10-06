import User from '../models/UserModel.js';
import AuthHelper from '../utils/AuthHelper.js';
import ExpressError from '../utils/ExpressError.js';
import Thread from '../models/ThreadModel.js';

const test = (req, res) => {
  res.status(200).json({ message: 'Welcome to api' });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new ExpressError(409, 'Email is already used, try different email');
  }
  const hashedPassword = await AuthHelper.hashPassword(password);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  const token = AuthHelper.genToken(savedUser._id);
  res.status(201).json({
    token,
    userId: savedUser._id,
    message: 'User created successfully',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(404, 'User not registered');
  }
  const isMatched = await AuthHelper.comparePasswords(password, user.password);
  if (!isMatched) {
    throw new ExpressError(400, 'Invalid Password');
  }
  const token = AuthHelper.genToken(user._id);
  res.status(200).json({ token, userId: user._id, message: 'User logged in successful' });
};

const getUserById = async (req, res) => {
  if (req.user.id !== req.params.id) {
    throw new ExpressError(403, 'You are not authorized to access this user');
  }
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    throw new ExpressError(400, 'User not found');
  }
  res.json({ user });
};

const deleteUserById = async (req, res) => {
  if (req.user.id !== req.params.id) {
    throw new ExpressError(403, 'You are not authorized to access this user');
  }
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    throw new ExpressError(400, 'User not found');
  }
  await Thread.deleteMany({ userId: req.user.id });
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({ message: 'User and all related threads deleted successfully' });
};

export default { test, signup, login, getUserById, deleteUserById };