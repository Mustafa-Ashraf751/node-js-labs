import process from 'node:process';
import JWT from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({message: 'Access denied please try again!'});
  }

  const payload = JWT.verify(token, process.env.JWT_SECRET);

  req.user = payload;
  next();
};
