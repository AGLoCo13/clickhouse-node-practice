const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
//HARD CODED Demo User
const DEMO_USER = { id: 1, email: 'admin@example.com', passwordHash: bcrypt.hashSync('password', 10) };
dotenv.config()

exports.login = async (req, res, next) => {
  try {
    console.log('process.env', process.env.JWT_SECRET);
    console.log('process.env', process.env.JWT_EXPIRES_IN);
    const signToken = (user) => {
      return jwt.sign({
        id: user.id,
        email: user.email
      }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
    }

    const { email, password } = req.body;

    // basic user lookup
    if (email !== DEMO_USER.email) return res.status(401).json({ message: 'Invalid credentials' });

    const pwMatch = await bcrypt.compare(password, DEMO_USER.passwordHash);
    if (!pwMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(DEMO_USER);
    console.log("Generated jwt:" ,token);

    // HttpOnly cookie
    //Builds a fresh JWT for the User.
    res.cookie('token', token, {
      httpOnly: true,  //JS cannot read , mitigates XSS 
      secure: process.env.NODE_ENV === 'production', // only HTTPS in production
      sameSite: 'Strict',                          //Mitigates CSRF
      maxAge: 24 * 60 * 60 * 1000  // 1 day
    });

    res.json({ message: 'Logged in' });
  } catch (err) { next(err); }
};
//Removes the cookie named token
{/* No server-side black-list – \
    once the cookie is gone the client is effectively logged out.
*/}
exports.logout = (_req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  res.json({ message: 'Logged out' });
};

exports.me = (req, res) => {
  // `verifyToken` attached user object to req
  res.json({ user: req.user });
};
