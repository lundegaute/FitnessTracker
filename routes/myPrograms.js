var express = require("express");
var router = express.Router();
var auth = require("../middleware/authenticate");


router.get("/", auth.token, auth.isAdmin, ( req, res, next ) => {
    res.render("myPrograms", { user: req.user})
})




module.exports = router;