const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mealsRoutes = require('./routes/meals')
const productsRoutes = require('./routes/products')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(cors())

app.use(bodyParser.json())

mongoose.connect(
  'mongodb+srv://' +
    process.env.MONGODB_USERNAME +
    ':' +
    process.env.MONGODB_PASSWORD +
    '@products-list.em6ngrd.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

app.use('/meals', mealsRoutes)
app.use('/products', productsRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
