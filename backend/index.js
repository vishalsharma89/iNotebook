require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express')
const path = require('path');
var cors = require('cors') 

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

//Static Files
const static_path = path.join(__dirname, '/build')
app.use(express.static(static_path));

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})