
var express = require('express');
var router = express.Router();
const fs = require("fs")


//visa logga in
router.get('/', function(req, res, next) {
  let loggin = `<form action="/" method="post">användarnamn: <input type="text" name="userName"/> Lösenord: <input type="text" name="passWord"/><button type="submit">Logga in</button></form><br/><br/>`
  let addUsers = `Lägg till ny <a href="/addUser">användare</a>`
res.send(loggin + addUsers)
});
//visa lägg till ny användare
router.get('/addUser', function(req, res, next) {
  let addUser = `<form action="/addUser" method="post">Användarnamn: <input type="text" name="userName"><br/> Lösenord: <input  type="text" name="passWord"> <br/> <button type="submit">Lägg till</button></form>`
    res.send(addUser)

});
//Kolla om det finns en användare med rätt användarnamn och lösenord
router.post("/", function(req, res){

  fs.readFile("users.json", (err, data) =>{
if(err){
  console.log("ohhNooo")
}
//hämta
let user = JSON.parse(data);
console.log(user.passWord)

if(user.userName == req.body.userName && user.passWord ===req.body.passWord){
  
  console.log("du är inloggad")
  // let loggedIn = `du är inloggad`
  // res.send(loggedIn)
}
 console.log("där blev de fel")

  })
  
})

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

fs.writeFile("users.json", JSON.stringify(user, null, 2), (err) => {
  if(err){
    console.log("hell no", err)
  }
})
res.redirect("/")
  })
  
})
module.exports = router;
