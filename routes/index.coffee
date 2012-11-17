
mongoose = require 'mongoose'
#
# * GET home page.
#
Schema = mongoose.Schema
ObjectId = Schema.ObjectID

Exercise = new Schema
  name: String
  combo: String
Exercise = mongoose.model 'Exercise', Exercise



exports.index = (req, res) ->
  res.render "index",
    title: "Express"

exports.getExercises = (req, res) ->
  Exercise.find {}, (error, data) ->
    res.json data



