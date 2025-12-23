var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:username", (req, res) => {
  let username = req.params.username;
  username = username.toLowerCase();
  username = username.split("");
  username[0] = username[0].toUpperCase();
  username = username.join("");
  res.render("cool", { title: "Welcome " + username, name: username });
});

module.exports = router;
