
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

Video = new Schema
	author: User
	src: String
Video = mongoose.model 'Video', Video

Exercise = new Schema
  name: String
  category: [Category]
  modifications: [Mod]
  video: [Video]
Exercise = mongoose.model 'Exercise', Exercise

Category = new Schema
  name: String
Category = mongoose.model 'Category', Category
	
Mod = new Schema
	name: String
	type: String	#Beginner, MidLevel, Advanced
Mod = mongoose.model 'Mod', Mod

Step = new Schema
  orderPosition: String
  interval: String
  exercise: Exercise
  video: String
  restInterval: String
Step = mongoose.model "Step", Step

Routine = new Schema
  type: String
  steps: [Step]
Routine = mongoose.model "Routine", Routine

User = new Schema
  name: String
  email: String
  uid: String
  routines:[Routine]
User = mongoose.model 'User', User



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


app.getUser = (req,res) ->
  User.find {}, (error, data) ->
    res.json data

app.postUser = (req,res) ->
  userData =
    name:req.query.name
	email:req.query.email
    uid:req.query.uid
  user = new User(userData)
  user.save (error,data) ->
    if (error)
      res.json error
    else
      res.json data

app.postRoutineStep (req,res) ->
	stepName = req.query.stepName
	routineId = req.query.routineId
	routine = new Routine()
	Routine.findOne {_id:req.params.id}, (error, user) ->
		if (error)
			res.json error
		else if (routine == null) 
			res.json 'no such routine'
		else
			routine.steps.push({step:req.query.stepName})
			routines.save (error,data) ->
				if (error)
					res.json error
				else
					res.json data
	
	###
	userData = 
		name: req.query.name
		email: req.query.email
		uid: req.query.uid
		#routines: req.query.routines
		user = new User(userData)
	user.routines.push ({routine: req.query.routineId})
	user.routines
	###

app.postUserExercise = (req,res) ->
  exerciseName = req.query.exercise
  userId = req.query.id
  user = new User()
  User.findOne {_id:req.params.id}, (error, user) ->
    if (error)
      res.json error
    else if (client == null)
      res.json 'no such user'
    else
      user.exercise.push({exercise: req.query.name})
      user.save (error,data) ->
        if (error)
          res.json error
        else
          res.json data


app.get "/", routes.index

app.get '/user', app.getUser
app.get '/user/:id', app.userId
app.post '/user', app.postUser
app.put '/user', app.putUser

app.post '/user/:id/exercise/:name', app.postUserExercise


app.get '/exercises', app.getExercise
app.post '/exercises', app.postExercise




http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

