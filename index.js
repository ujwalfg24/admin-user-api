const express =require('express')
const app =express()
const mongoose =require('mongoose')
const path = require("path")
const cors =require('cors')

const userRouter = require("./routes/userRoute");
const bodyParser =require('body-parser')



app.use(cors())
app.use(bodyParser.json()); 

app.use(express.urlencoded({ extended: false }))
app.use('/user',userRouter)

PORT=process.env.PORT||5000;

mongoose.connect("mongodb://localhost:27017/Aduser",{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log(`connected to database`))





app.listen(PORT ,()=>console.log(`server started at ${PORT}`))