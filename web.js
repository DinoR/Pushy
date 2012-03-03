var express = require('express'), 
		routes = require('./routes'),
		socket = require('socket.io')
		app = express.createServer(express.logger())
		users = 0;
		
io = socket.listen(8080);
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/foo/:bar', routes.foo);


io.sockets.on('connection', function (socket) {
	
  socket.on('log', function (data) {
		io.sockets.emit('presence', { presence: ++users });
  });

  socket.on('disconnect', function () {
		io.sockets.emit('presence', { presence: --users });
  });

  
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});