path = require 'path'
express = require 'express'
Logger = require '../../app/common/logger.coffee'
config = require '../../config/config.js'
env = config.get('env')

router = express.Router()

serveIndex = (req, res) ->
  # set no cache header
  res.setHeader('Cache-Control', 'no-cache')
  # serve index.html file
  if config.isDevelopment()
    res.sendFile path.resolve(__dirname + "/../../dist/src/index.html")
  # Staging/Production mode uses index.html from S3
  else
    res.sendFile path.resolve(__dirname + "/../../public/" + env + "/index.html")

# Setup routes for production / development mode
# Development mode uses index.html from /dist folder
if config.isDevelopment()
  Logger.module("EXPRESS").log "Configuring for DEVELOPMENT environment #{env}".yellow

  # Serve enter /dist/src folder
  router.use express.static(__dirname + "/../../dist/src", {etag: false, lastModified: false, maxAge: 0})

  # Serve main index page /dist/src/index.html
  router.get "/", serveIndex
  router.post "/", serveIndex
else
  Logger.module("EXPRESS").log "Configuring for PRODUCTION environment #{env}".cyan

  router.get "/", serveIndex
  router.post "/", serveIndex

module.exports = router
