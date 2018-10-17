require('dotenv').config()
const bodyParser = require('body-parser')
let express = require('express')
let app = express()
let sequelize = require('./db')
let user = require('./controllers/userController')
let tourneys = require('./controllers/tourneyController')
let register = require('./controllers/registerController')

sequelize.sync()
app.use(bodyParser.json())
app.use(require('./middleware/headers'))

app.use('/user', user)
app.use('/tournaments', tourneys)
app.use('/register', register)


app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`))