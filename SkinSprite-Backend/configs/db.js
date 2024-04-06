const mongoose = require('mongoose');
const connectWithDb = () => { 
    mongoose
        .connect(process.env.db_url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('DB GOT CONNECTED');
        })
        .catch((error) => {
            console.log('DB ISSUES');
            console.error(error); 
            process.exit(1);
        });
};

module.exports = connectWithDb;
