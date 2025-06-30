const dotenv = require('dotenv') ;
const app = require('./app');
dotenv.config()

// console.log('process.env',process.env)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));


