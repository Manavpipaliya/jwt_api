var app = require('./app');
var port = process.env.PORT || 6996;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});