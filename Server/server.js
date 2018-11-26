var express = require('express');
var app = express();
var mongoose = require('mongoose');

//connect to db
mongoose.connect(' mongodb://127.0.0.1:27017/VoterInfo');

//data models
var User = mongoose.model('User', {
    username: String,
    password: String,
})

var Message = mongoose.model('Message', {
    userTo: String,
    userFrom: String,
    content: String,
    id: Number
})

var Post = mongoose.model('Post', {
    candidate: String,
    owner: String,
    title: String,
    description: String,
    inFavor: Boolean,
    likes: Number
})

//User authentication

//logging in
app.post('/login', function (req, res) {

})