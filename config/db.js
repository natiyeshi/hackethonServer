const mongoose = require('mongoose')

module.exports = {
    connect_db : async ()=>{
        mongoose.connect(process.env.MONGO_REMOTE_URL).then(()=>{
            console.log(`MongoDB Connected`.cyan.underline.bold);
        }).catch(err=>{throw err})
    }
}