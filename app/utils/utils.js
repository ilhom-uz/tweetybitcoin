//Get User Info from the request and pass it to Front
function getUserFromRequest(req) {
    if (req.isAuthenticated()) {
        this.email = req.user.local.email;        
        this.isLoggedIn = true;
        this.userName = req.user.local.email;
        this.id = req.user._id;
    } else {
        this.email = "Not Logged In";        
        this.isLoggedIn = false;
        this.userName = "Guest";
        this.id = 'id';
    }

    return this;
}

module.exports = {    
    getUserFromRequest: getUserFromRequest    
};