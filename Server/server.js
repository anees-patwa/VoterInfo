var express = require('express');
var app = express();
var mongoose = require('mongoose');
var https = require('https');
var http = require('http');
var socketio = require("socket.io");

var str = "";
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//connect to db
mongoose.connect('mongodb://127.0.0.1:27017/VoterInfo', {
    useNewUrlParser: true
});

//data models
var User = mongoose.model('User', {
    username: String,
    password: String,
});

var Message = mongoose.model('Message', {
    userFrom: String,
    userTo: String,
    content: String
});

var Post = mongoose.model('Post', {
    candidate: String,
    owner: String,
    title: String,
    description: String,
    inFavor: Boolean,
    likes: Number
});

var comment = mongoose.model('Comment', {
    owner: String,
    title: String,
    content: String,
    likes: Number,

});

app.post("/my-comments", function (req, res) {
    // console.log(owner);
    console.log(req.body);
    let user = req.body.username;

    Post.find({
        owner: user
    }, (err, post) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(post);
    });

});

app.post("/edit", function (req, res) {
    let des = req.body.description;
    let id = req.body.id;
    Post.findByIdAndUpdate({
        _id: id
    }, {
        $set: {
            description: des
        }
    }, {
        upsert: false
    }, (err, post) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(post);
        
    });


});

app.post("/delete", function (req, res) {

    let id = req.body.id;
    Post.findByIdAndDelete({
            _id: id
        },
        (err, post) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(post);
        });

});



//User authentication

//logging in
app.post('/login', function (req, res) {
    console.log("logging a user in");
    console.log(req.body);
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
});

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
});

//Candidate info

//get candidate info for certain region
app.post('/candidates', function (req, res) {


    let userAddress = req.body.address;
    //gapi.client.setApiKey("AIzaSyCcUIUY099F6431yK7c_fxP_Ztp-AlwEfM");
    /*let infoReq = gapi.client.request({
        'path': '/civicinfo/v2/representatives',
        'params': {
            'address': userAddress
        }
    })*/
    userAddress = encodeURIComponent(userAddress);

    const options = {
        hostname: 'www.googleapis.com',
        port: 443,
        path: '/civicinfo/v2/representatives?key=AIzaSyCcUIUY099F6431yK7c_fxP_Ztp-AlwEfM&address=' + userAddress
    };

    const gapiReq = https.get(options, (gapiResponse) => {
        console.log(options.path);
        console.log('statusCode:', gapiResponse.statusCode);
        console.log('headers:', gapiResponse.headers);
        //console.log(gapiResponse.offices);
        let body = [];

        gapiResponse.on('data', (d) => {
            body.push(d);

        }).on('end', () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            //console.log(body);
            let officesToSend = [];

            for (key in body.offices) {
                //get official indexes for certain office
                let candidateIndexArray = body.offices[key].officialIndices;

                //create office object
                let officials = [];

                for (let j = 0; j < candidateIndexArray.length; j++) {
                    officials.push(body.officials[candidateIndexArray[j]])
                }

                let oneOffice = {
                    name: body.offices[key].name,
                    officials: officials
                }

                officesToSend.push(oneOffice);

            }
            res.json(officesToSend);
        });
    });

    gapiReq.on('error', (e) => {
        console.error(e);
    });
    gapiReq.end();
});

app.post("/commentsCandidate", function (req, res) {
    let repName = req.body.repName;
    console.log(repName);

    Post.find({
        candidate: repName
    }, (err, post) => {
        if (err) {
            res.send(err);
            return;
        }

        res.json(post);
    });

})

app.post("/createComment", function (req, res) {
    let newPost = new Post({
        candidate: req.body.candidate,
        owner: req.body.owner,
        title: req.body.title,
        description: req.body.description,
        inFavor: req.body.inFavor,
        likes: 0
    })

    newPost.save((err, newPostRes) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json({
            success: true,
            postAdded: req.body.description,
            _id: newPostRes._id
        })

    })

})

app.post("/likeComment", function (req, res) {
    let id = req.body.id;
    console.log(id);

    Post.findById(id, (err, postByFind) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(postByFind);

        let like = postByFind.likes + 1;

        Post.findByIdAndUpdate(id, {
            likes: like
        }, (err, post) => {
            if (err) {
                console.log(error);
                return;
            }

            console.log(post);
        })




        //console.log(post);
        res.json(postByFind);
    });
});

app.post("/messageList", function (req, res) {
    let username = req.body.userFrom;

    console.log("this is the sender");
    console.log(username);

    Message.find({
        $or: [{
            userFrom: username,
        }, {
            userTo: username
        }]
    }, (err, arrayOfMessages) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("here's the array of found messages", arrayOfMessages);

        if (arrayOfMessages != null) {
            /*let recipientList = arrayOfMessages.map(function (val) {
                return val.userTo;
            });*/

            /*console.log("overview", recipientList);

            let recipientSet = new Set(recipientList);

            console.log("as a set", recipientSet);

            let overview = []

            for (recipient of recipientSet) {
                overview.push(recipient);
            }*/

            res.json(arrayOfMessages);
        }




    });
});

app.post("/sentMessage", function (req, res) {
    let newMessage = new Message({
        userFrom: req.body.userFrom,
        userTo: req.body.userTo,
        content: req.body.message
    });

    newMessage.save((err, response) => {
        if (err) {
            console.log("heres an error with saving the new message below");
            console.error(err);
        }

        res.json(response);
    });
});

app.post("/getMessages", function (req, res) {
    Message.find({
        $or: [{
            userFrom: req.body.userFrom,
            userTo: req.body.userTo
        }, {
            userFrom: req.body.userTo,
            userTo: req.body.userFrom
        }]
    }, (err, messagesArray) => {
        if (err) {
            res.send(err);
            return;
        }

        res.json(messagesArray);
    })
})

/*var server = http.createServer(app);
var io = socketio.listen(server);

io.on("connection", (socket) => {
    console.log("messaging started");

    socket.on("message from server", (req) => {
        console.log("something");
    })
})*/

app.listen(8080, 'localhost', function (err) {
    if (err) return console.error(err);
    console.log("listening on port 8080");
});