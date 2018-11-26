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
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({
        username: username
    }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }

        //verify password
        if (password == user.password) {
            console.log("successful login");
            res.json({
                success: true,
                userLogged: username
            })
        }

    })
})

//create user
app.post('/signup', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let newUser = new User({
        username: username,
        password: password
    });

    newUser.save((err, newUser) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json({
            success: true,
            userAdded: username
        })
    })
})

//Candidate info

//get candidate info for certain region
app.post('/candidates', function (req, res) {

})