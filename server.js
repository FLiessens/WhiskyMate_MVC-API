let express    = require('express');        // call express
const cors = require('cors')

// Configure bodyparser to handle POST requests
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin:true}));
// Import routes
let router = require('./roads');
app.use('/', router);

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if(req.method== 'OPTIONS') {
        res.status(200).end();} 
    else{ next(); }});

// Launch app to listen to specified port
var port = 3000
app.listen(port, function () 
{ console.log('Running server on port ' + port); })


