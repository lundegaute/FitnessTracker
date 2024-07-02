const jwt = require("jsonwebtoken");

const auth = {
    token: ( req, res, next ) => {
        let token;
        if ( req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if ( req.cookies.token) {
            token = req.cookies.token;
        } else {
            req.user = "";
            next();
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if ( err ) { // If token is invalid, we go to login page
                res.redirect("/users/login");
                //return res.jsend.fail({StatusCode: 500, Results: "Invalid token"}) // if working with postman
            }
            req.user = decodedToken;
            console.log(req.user);
            next();
        })

    },

    isAdmin: ( req, res, next ) => {
        if ( req.user.Role === "Admin") {
            next();
        } else {
            res.jsend.fail({StatusCode: 401, Results: "unauthorized access"})
        }
    },

    isUser: ( req, res, next ) => {
        if ( req.user.Role === "Admin" || req.user.Role === "User") {
            next();
        } else {
            res.jsend.fail({StatusCode: 401, Results: "unauthorized access"})

        }
    },

}

module.exports = auth;