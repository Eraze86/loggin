var express = require('express');
var router = express.Router();
const fs = require("fs")

/* GET users listing. */
router.get('/', function(req, res, next) {
 fs.readFile("users.json", function(err, data){
if(err){
  console.log("ohh noo", err)
}
const users = JSON.parse(data)
res.send(users)

 })
});

module.exports = router;
