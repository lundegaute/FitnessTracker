var express = require('express');
var router = express.Router();
var auth = require("../middleware/authenticate");

/* GET home page. */
router.get('/', auth.token, async function(req, res, next) {
  
    res.render("index", {user: req.user})
  
});

module.exports = router;
