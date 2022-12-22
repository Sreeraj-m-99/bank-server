// import dataservice file from service folder

const dataservice = require('./service/dataservice')

// import jsonwebtoken

const jwt = require("jsonwebtoken")
//  import express
const express = require('express')


//  create app

const app = express()
// to convert json data

app.use(express.json())

// middleware for verify token

const jwtmiddleware = (req, res, next) => {

    console.log("router specific middleware");
    try {
        const token = req.body.token

        const data = jwt.verify(token, "sceretkey123")

        console.log(data);

        next()

    }
    catch {
        res.status(422).json({
            statuscode: 422,
            status: false,
            message: "please login"
        })
    }



}



// register

app.post('/register', (req, res) => {

    const result = dataservice.register(req.body.acno, req.body.unname, req.body.psw)
    // if(result){
    //     res.send(' registration success')
    // }
    // else{
    //     res.send("user already exist")
    // }

    // res.send(result)

    // res.json(result)
    res.status(result.statuscode).json(result)


})

// requuest

// login
app.post('/login', (req, res) => {

    const result = dataservice.login(req.body.acno, req.body.psw)


    res.status(result.statuscode).json(result)


})
// register

// deposit
app.post('/deposit', jwtmiddleware, (req, res) => {

    const result = dataservice.deposit(req.body.acno, req.body.password, req.body.amount)


    res.status(result.statuscode).json(result)


})
// withdraw
app.post('/withdraw', jwtmiddleware, (req, res) => {

    const result = dataservice.withdraw(req.body.acno, req.body.password, req.body.amount)


    res.status(result.statuscode).json(result)


})
// transaction history
app.get('/gettransaction', jwtmiddleware, (req, res) => {

    const result = dataservice.gettransaction(req.body.acno)


    res.status(result.statuscode).json(result)


})
// delete


// // GET 

// app.get('/',(req,res)=>{
//     res.send('GET Method checking ,,,,,,,,,,')
// })


// // post

// app.post('/',(req,res)=>{
//     res.send('post Method checking ,,,,,,,,,,')
// })

// // put

// app.put('/',(req,res)=>{
//     res.send('put Method checking ,,,,,,,,,,')
// })

// // patch

// app.patch('/',(req,res)=>{
//     res.send('patch Method checking ,,,,,,,,,,')
// })

// // delete

// app.delete('/',(req,res)=>{
//     res.send('delete Method checking ,,,,,,,,,,')
// })







// set port  
app.listen(3000, () => {
    console.log('server started at prt number 3000');
})
