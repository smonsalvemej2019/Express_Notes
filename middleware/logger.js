const moment = require('moment');//we use moment for date formatting
const logger = (req, res, next)=>{//lets define our middleware function
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;