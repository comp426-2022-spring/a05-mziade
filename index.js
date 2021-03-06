// Place your server entry point code here
var express = require('express')
var app = express()
app.use(express.static('./public'));
const fs = require('fs')
const morgan = require('morgan');
const coinRoutes = require('./src/routes/coinRoutes.js');
const logRoutes = require('./src/routes/logRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const myFunc = require('./src/middleware/mymiddleware.js')
// Add cors dependency
const cors = require('cors')
// Set up cors middleware on all endpoints
app.use(cors())

// Make Express use its own built-in body parser to handle JSON
app.use(express.json());
const args = require('minimist')(process.argv.slice(2))
// --port	Set the port number for the server to listen on. Must be an integer between 1 and 65535.
args['port', 'debug', 'log', 'help']
const port = args.port || process.env.PORT || 5000
const debug = args.debug || process.env.debug || 'false'
const log = args.log || process.env.log || 'true'
const logdb = require('./src/services/logdatabase.js')

const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)
// If --help or -h, echo help text to STDOUT and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

if (log == 'false') {
    console.log("NOTICE: not creating file access.log")
} else {
// Use morgan for logging to files
    const logdir = './log/';

    if (!fs.existsSync(logdir)){
        fs.mkdirSync(logdir);
    }
// Create a write stream to append to an access.log file
    const accessLog = fs.createWriteStream( logdir+'access.log', { flags: 'a' })
// Set up the access logging middleware
    app.use(morgan('combined', { stream: accessLog }))
}

// Always log to database
app.use((req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referrer: req.headers['referer'],
        useragent: req.headers['user-agent']
    };
    const stmt = logdb.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referrer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referrer, logdata.useragent)
    //console.log(info)
    next();
})


// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Root Endpoint
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});


if(debug == true){
    app.get("/app/error", (req, res) => {
        throw new Error("Error test succesful.")
    })
    app.get("/app/log/access", myFunc, (req, res) => {	
            const stmt = db.prepare('SELECT * FROM accesslog').all()
            console.log(stmt)
            res.status(200).json(stmt)
    } )

}

// Connect to other Endpoints
app.use(coinRoutes);
app.use(logRoutes);
app.use(userRoutes);


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

