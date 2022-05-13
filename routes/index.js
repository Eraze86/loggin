var express = require('express');
var router = express.Router();
const fs = require("fs")

/* GET home page. */
router.get('/', function(req, res, next) {
  let loggin = `användarnamn: <input type="text" /> Lösenord: <input type="text"/><button>Logga in</button><br/><br/>`
  let addUsers = `Lägg till ny <a href="/addUser">användare</a>`
res.send(loggin + addUsers)
});

router.get('/addUser', function(req, res, next) {
  let addUser = `<form action="addUser" method="post">Användarnman: <input name="userName"><br/> Lösenord: <input name="passWord"> <br/> <button type="submit">Lägg till</button></form>`
    res.send(addUser)

});
router.post("/addUser", function(req, res){

  fs.readFile("users.json", (err, data) =>{
if(err){
  console.log("ohhNooo")
}
//hämta
let user = JSON.parse(data);

//ändra

let newUser = {...req.body}
user.push(newUser)

//spara

fs.writeFile("users.json", JSON.stringify(newUser), (err) => {
  if(err){
    console.log("hell no", err)
  }
})
res.redirect("/")
  })
  
})


module.exports = router;
