// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routing files
var index = require('./server/routes/app');
var documentRoutes = require('./server/routes/documents');
var messageRoutes = require('./server/routes/messages');
var contactRoutes = require('./server/routes/contacts');

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Map routes
app.use('/', index);
app.use('/documents', documentRoutes);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);

// Handle all other routes to serve the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});

// Define the port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create and start server
const server = http.createServer(app);
server.listen(port, function() {
  console.log('API running on http://localhost:' + port);
});
