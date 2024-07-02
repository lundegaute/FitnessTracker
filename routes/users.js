var express = require("express");
var router = express.Router();
var db = require("../models");
var UserService = require("../services/userService");
var userService = new UserService(db);
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
var jsend = require("jsend");
var createEncryptedPasswordAndSalt = require("../middleware/createEncryptedPassword");
var checkEncryptedPasswordAndSalt = require("../middleware/createEncryptedPassword");
router.use(jsend.middleware);

router.get("/signup", async (req, res, next) => {
    const user = req.user;
    res.render("signup", { user: user });
});

router.post("/signup", async (req, res, next) => {
    const user = req.body;
    const userData = await createEncryptedPasswordAndSalt(user.password, "");
    user.encryptedPassword = userData.encryptedPassword;
    user.salt = userData.salt;

    await userService.createAdmin(user); // Creating admin for now, change later
    return res.redirect("/users/login");
});

router.get("/login", (req, res, next) => {
    const user = req.user;
    console.log(user);
    res.render("login", { user: user });
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
        return res.jsend.fail({ StatusCode: 401, Results: "Invalid email" });
    }
    const data = await checkEncryptedPasswordAndSalt(password, user.Salt);
    if (!crypto.timingSafeEqual(data.encryptedPassword, user.EncryptedPassword)) {
        return res.jsend.fail({ StatusCode: 401, Results: "Invalid password" });
    }
    console.log("-------------------------")
    console.log(user.Role.Role)
    console.log("-------------------------")
    try {
        let token = jwt.sign(
            {
                id: user.id,
                Email: user.Email,
                Role: user.Role.Role,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "2h" }
        );

        res.cookie("token", token, { httpOnly: true });
        res.redirect("/"); // Comment out when using postman
        //return res.jsend.success({StatusCode: 200, Results: token}) // Comment out when using frontend
    } catch (error) {
        console.log(error);
        return res.jsend.fail({
            StatusCode: 500,
            Results: "Error during login",
            error: error,
        });
    }
});

router.post("/logout", ( req, res, next ) => {
  res.clearCookie("token");
  console.log(req.user);
  res.redirect("/");
})

module.exports = router;
