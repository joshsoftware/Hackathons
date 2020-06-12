var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var routes = require('./routes/index');
var compression = require('compression');

var app = express();
app.use(compression()); //use compression 
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(favicon());
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
				if(err.status == 404){
					res.render('404', { title: 'Error' });
				}else{
          res.render('500', { title: 'Error' });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
		console.log(err.message);
		res.render('404', { title: 'Error' });
});

module.exports = app;
