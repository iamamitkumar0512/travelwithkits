var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let projectdata = {};

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
const cors = require('cors');
app.use(cors());


app.use(express.static('dist'));

//get route
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

// post route
app.post('/add', addInfo);

function addInfo(req, res) {
  projectdata['depCity'] = req.body.depCity;
  projectdata['arrCity'] = req.body.arrCity;
  projectdata['depDate'] = req.body.depDate;
  projectdata['weather'] = req.body.weather;
  projectdata['summary'] = req.body.summary;
  projectdata['daysLeft'] = req.body.daysLeft;
  res.send(projectdata);
}

// Setup Server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log("Welcome to KITS Travel Planner App")
  console.log(`App is running on localhost: ${port}`);
};
