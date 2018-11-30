var express = require('express');
var app = express();
var mongoose = require('mongoose');
var https = require('https');

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
    userTo: String,
    userFrom: String,
    content: String,
    id: Number
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

    // infoReq.execute((response) => {
    //     for (let i = 0; i < response.offcies.length; i++) {
    //         //get official indexes for certain office
    //         let candidateIndexArray = response.offices[i].officialIndices;

    //         //create office object
    //         let office = {
    //             name: response.offices[i].name,
    //             officials: []
    //         }

    //         for (let j = 0; j < candidateIndexArray.length; j++) {
    //             office.officials.push(response.officials[candidateIndexArray[j]])
    //         }
    //     }
    //     res.json(office);
    // })
});

app.listen(8080, 'localhost', function (err) {
    if (err) return console.error(err);
    console.log("listening on port 8080");
});