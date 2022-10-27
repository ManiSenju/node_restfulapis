const express = require("express")
const mongoose = require("mongoose")
const routes = require("./src/routes/crmRoutes")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const app = express()

const PORT = process.env.PORT || 3000

//mongoose connection

const dbUrl = "mongodb+srv://<dbname>:<password>@cluster0.bb7lncc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUrl, {useNewUrlParser:true,useUnifiedTopology:true}, (err) => {
    if(err){
        console.log(err)
    }else {
        console.log("db is connected")
    }
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//jwt setup

app.use((req,res,next) => {
    if(req.headers && req.headers["authorization"] && req.headers["authorization"].split(" ")[0] === 'JWT'){
        jwt.verify(req.headers["authorization"].split(" ")[1], "RESTFULAPI", (err, decode) => {
            if(err) req.user = undefined
            req.user = decode
            next()
        })
    }else {
        req.user = undefined
        next()
    }
})

routes(app)

app.get("/", (req,res) => {
    res.send("hi there!")
})


app.listen(PORT,() => {
    console.log("Server is up and running on port:",PORT)
})
