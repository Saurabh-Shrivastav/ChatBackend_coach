const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretKey";

app.get("/", (req, res) => {
  res.json({ message: "Api is working" });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "Saurabh",
    email: "saurabhshrivastav@test.com",
  };
  jwt.sign({ user }, secretKey, { expiresIn: "120s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile",verifytoken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>
    {
              if(err)
              {
                res.send({result:'invlaid token'})
              }
              else
              {
                res.json({
                  message:"profile accessed",
                  authData
                })
              }
    })

})

function verifytoken(req,res,next)
{
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined')
  {
     const bearer = bearerHeader.split(" ");
     const token =bearer[1];
     req.token = token
     next()
  }
  else
  {
    res.send({result:"Token is not valid"})
  }
}



app.listen(4000, () => console.log("sever is running 4000"));









//================================================================================================================================
// const express = require('express')
// const jwt = require('jsonwebtoken')
// const app = express()
// const secretKey = "secretKey";

// app.get('/', (req, res) => {
//     res.send('API is working')
// })


// //Token Generate
// app.post('/login', (req, res) => {
//     const user = {
//         id: 1,
//         username: "Saurabh",
//         email: "saurabhtest.com"
//     }
//     jwt.sign({ user }, secretKey, { expiresIn: '120s' }, (err, token) => {
//         res.json({
//             token,
//         })
//     })
// })

// //Verify Token
// app.post('/profile', verifytoken, (req, res) => {
//     jwt.verify(req.token, secretKey, (err, authData))
//     {
//         if (err) {
//             res.send({ result: 'invlaid token' })
//         }
//         else {
//             res.json({
//                 message: "profile accessed",
//                 authData
//             })
//         }
//     }
// })

// function verifytoken(req, res, next) {
//     const bearerHeader = req.headers['authorization']
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(" ");
//         const token = bearer[1];
//         req.token = token
//         next();
//     }
//     else {
//         res.send({ result: "Token is valid" })
//     }
// }



// app.listen(4000, () => console.log("server is running"))






