
###
Module dependencies.
###
express = require("express")
routes = require("./routes/index.coffee")
user = require("./routes/user")
http = require("http")
path = require("path")
mongoose = require 'mongoose'

mongoose.connect process.env.MONGOHQ_URL or 'mongodb://127.0.0.1/hiithack'

Schema = mongoose.Schema
ObjectId = Schema.ObjectID

Exercise = new Schema
  name: String
  #category: [Category]
  combo: String
Exercise = mongoose.model 'Exercise', Exercise

Category = new Schema
  name: String
Category = mongoose.model 'Category', Category



app = express()
app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(path.join(__dirname, "public"))

app.configure "development", ->
  app.use express.errorHandler()

app.getExercise = (req, res) ->
  Exercise.find {}, (error, data) ->
    res.json data

app.postExercise = (req, res) ->
  info =
    name: req.query.name
    combo: req.query.combo
  exercise = new Exercise(info)
  exercise.save (error, data) ->
    if (error)
      res.json error
    else
      res.json data

app.get "/", routes.index
app.get "/users", user.list

app.get '/exercises', app.getExercise
app.post '/exercises', app.postExercise




http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

