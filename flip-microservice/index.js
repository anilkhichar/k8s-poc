var path = require('path');

var express = require('express');
var multer = require('multer');
// var sharp = require('sharp');

var app = express();
var port = process.env.port || 8080;

var storage = multer.memoryStorage();
var upload = multer({ storage : storage}).single('file');

// From http://expressjs.com/en/guide/error-handling.html
function errorHandler (err, req, res, next) {
  res.status(500).send(JSON.stringify({ error: err }));
  next();
}

function flipImage(req, res, next) {
  sharp(req.file.buffer)
  .rotate(180)
  .toBuffer()
  .then((data) => {
    res.send(data);
    next();
  }).catch((err) => {
    errorHandler(err, req, res, next);
  });
}

app.post('/', (req, res, next) => {
  upload(req, res, (err) => {
    if(err || !req.file) return errorHandler(err, req, res, next);
    flipImage(req, res, next);
  });
})

app.listen(port, _ => {
    console.log(`Working on port ${port}`)
});
