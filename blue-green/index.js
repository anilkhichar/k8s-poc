var path = require('path');

var express = require('express');
var multer = require('multer');
var request = require('request');

var app = express();
var port = process.env.port || 8080;

var storage = multer.memoryStorage();
var upload = multer({ storage : storage}).single('userPhoto');

// From http://expressjs.com/en/guide/error-handling.html
function errorHandler (err, req, res, next) {
  res.status(500).send(JSON.stringify({ error: err }));
  next();
}

function sendPhoto(req, res, next) {
  request.post({
    url: 'http://flip-microservice-svc',
    encoding: null,
    formData: {
      file: {
        value: req.file.buffer,
        options: {
          filename: req.file.originalname,
          contentType: 'image/jpg'
        }
      }
    }
  }, (err, httpResponse, body) => {
    if (err) return errorHandler(err, req, res, next);
    res.contentType('jpeg')
    res.send(body);
    next();
  });
}

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'), next);
});

app.post('/api/photo', (req, res, next) => {
  upload(req, res, function(err) {
    if (err || !req.file) return errorHandler(err, req, res, next);
    sendPhoto(req, res, next);
  });
});

app.listen(port, _ => {
  console.log(`Working on port ${port}`);
});