// =====================================
// USER MODEL
// =====================================
var mongoose = require('mongoose');
var configDB = require('../.././config/database.js');
var userDB = mongoose.createConnection(configDB.url);
var crypto = require('crypto');

// Define the schema for user model
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String     
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
        
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// Generating a hash
userSchema.methods.generateHash = function (password) {    
    return crypto.createHash('sha256').update(password).digest('base64');    
};

// Checking if password is valid
userSchema.methods.validPassword = function (password) {
    var hash=crypto.createHash('sha256').update(password).digest('base64');
    return (this.local.password===hash);    
};

// Create the model for users and expose it to our app
module.exports = userDB.model('User', userSchema);