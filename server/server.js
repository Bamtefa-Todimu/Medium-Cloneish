const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/post')
const users = require('./routes/users')
const postSchema = require('./models/post')

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/v1',routes)
app.use('/api/v1',users)

app.get('/',(req,res) => {
    res.send("server is live")
})




const port = 5000 || process.env.PORT
app.listen(5000, async () => {
    const dbConnection = await mongoose.connect('mongodb://localhost/BlogSite', () => {
        console.log("connected to database");
        console.log(`server is listening on port ${port}`)
    })
})