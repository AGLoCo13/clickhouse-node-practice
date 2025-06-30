const jwt = require('jsonwebtoken');
/* 
    Exports a middleware function that receives the usual Express args:
    req: request
    res: response
    next: function to call if validation passes
*/
module.exports = (req , res , next) => {
    //Reads the cookie named "token" from the user's browser.
    const token = req.cookies.token;
    //If no cookie is present → user is not logged in.
    if(!token) return res.status(401).json({message: 'Not authenticated'});

    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(err) {
        return res.status(403).json({message:'Invalid / expired token'});
    }
};
