const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');  //CSRF middleware
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const verifyToken = require('./middleware/verifyToken');
// const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

dotenv.config();

/* Basic Security Middlewares */
app.use(helmet());

app.use(
    cors({
        origin:'http://localhost:3001',  //React dev-server origin
        credentials:true                //allow cookie-header
    })
);

/* Body / Cookie Parsers */
app.use(express.json());  //Built in JSON parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/*CSRF Protection*/

// const csrfProtection = csrf({
//     cookie: {
//         httpOnly:false,     //front-end must be able to read token
//         sameSite : 'Strict',
//         secure : process.env.NODE_ENV === 'production',
//         key: process.env.CSRF_COOKIE_NAME || 'csrfToken'
//     }
// });


// Endpoint for React to grab a CSRF token once and store in axios headers
// app.get('/api/csrf-token', csrfProtection , (req,res) => {
//     res.json({csrfToken: req.csrfToken});
// });

//Health check 
app.get('/health' , (_,res) => res.json({status : 'ok'}));


//Routes
app.use('/auth' , authRoutes);   // login / logout
app.use('/users', userRoutes);                        // if needed, protect with verifyToken in each route
app.use('/analytics', verifyToken , analyticsRoutes);                // verifyToken applied inside analyticsRoutes

/* Global error handler */
app.use((err, _req , res , _next) => {
    console.error(err);
    res
        .status(err.status || 500)
        .json({message: err.message || 'Server error'
        }) 
});

module.exports = app;
