express = require 'express'
hbs = require 'hbs'
helmet = require 'helmet'
middleware = require './middleware'
routes = require './routes'
config = require '../config/config'

app = express()
# enable trust proxy for production so that client IP is correctly set for requests
app.set('trust proxy',config.isProduction())
# disable x-powered-by header
app.disable('x-powered-by')
# Use Handlebars view engine for static pages and disable view caching
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/templates/partials')
app.disable('view cache')

###
Wire up basic middleware (cors, bodyparser, etc)
Wire up / public routes
###
app.use(middleware.basic)
app.use(routes.public)

###
Error handling middleware, must be defined last to catch any errors
- catch all to deal with 404s
- console.log error
- render error page or send JSON with error
###
app.use(middleware.not_found)
app.use(middleware.errors.logError)

if config.isDevelopment()
  app.use(middleware.errors.development)
else
  app.use(middleware.errors.production)

module.exports = app
