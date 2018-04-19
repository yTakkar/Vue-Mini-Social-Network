require('dotenv').config()

// Require dependencies
const
  express = require('express'),
  hbs = require('express-handlebars'),
  { rainbow } = require('handy-log'),
  { env: { PORT, SESSION_SECRET_LETTER } } = process,
  favicon = require('serve-favicon'),
  path = require('path'),
  bodyParser = require('body-parser'),
  validator = require('express-validator'),
  session = require('client-sessions'),
  app = express()

// Require project files
const
  mw = require('./config/middlewares'),
  uRoutes = require('./routes/user-routes'),
  apiRoutes = require('./routes/api-routes'),
  followRoutes = require('./routes/follow-routes'),
  postRoutes = require('./routes/post-routes'),
  editProfileRoutes = require('./routes/edit-profile-routes'),
  postActionRoutes = require('./routes/post-action-routes'),
  mainR = require('./routes/main-routes')

// View engine
app.engine('hbs', hbs({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')

// Middlewares
app.use(favicon(
  path.join(__dirname, '/public/images/favicon/favicon.jpg')
))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(validator())
app.use(session({
  cookieName: 'session',
  secret: SESSION_SECRET_LETTER,
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}))
app.use(express.static(
  path.join(__dirname, '/public/')
))

// Middleware for some local variables to be used in the template
app.use(mw.variables)

// Routing (mainR route should be placed last)
app.use('/', uRoutes)
app.use('/api', apiRoutes)
app.use('/api', followRoutes)
app.use('/api', postRoutes)
app.use('/api', postActionRoutes)
app.use('/api', editProfileRoutes)
app.use('/', mainR)

app.listen(PORT, () =>
  rainbow('App running..')
)
