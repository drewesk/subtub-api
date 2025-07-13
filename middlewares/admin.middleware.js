import { ADMIN_TOKEN } from '../config/env.js';

const adminAuth = (req, res, next) => {
  try {
    console.log('ADMIN_TOKEN:', ADMIN_TOKEN);
    const token = req.headers.authorization;

    if (!token || token !== `Bearer ${ADMIN_TOKEN}`) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();

  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      error: error.message
    });
  }
};

export default adminAuth;