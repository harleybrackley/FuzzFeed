
require('dotenv').config()

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');

const methodOverride = require('method-override')
const requestLogger = require('./middlewares/request_logger')
const reqBodyMethodOverride = require('./middlewares/req_body_method_override');
const setCurrentUser = require('./middlewares/set_current_user');


const petsRouter = require('./routes/pets_routes.js');
const sessionsRouter = require('./routes/sessions_routes.js');
const pagesRouter = require('./routes/pages_routes.js');
const usersRoutes = require('./routes/user_routes');

const app = express();
const port = process.env.PORT || 9090;

app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))
app.use(reqBodyMethodOverride)
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat', 
  resave: false, 
  saveUninitialized: true }))
app.use(setCurrentUser)
app.use(requestLogger)
app.use(expressLayouts)


app.use(pagesRouter)
app.use(petsRouter)
app.use(sessionsRouter)
app.use(usersRoutes)


app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`)
})
