import jwt from 'jsonwebtoken';
import config from './Config.js';
import ExpressError from './ExpressError.js';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new ExpressError(401, 'No token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch {
    throw new ExpressError(401, 'Invalid or expired token');
  }
};

export default { verifyToken };
