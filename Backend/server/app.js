var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
var cors = require("cors");
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
const sharp = require('sharp');
const metadata = require('express-metadata');
const date = require('date-and-time');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require("./routes/login");
var signupRouter = require('./routes/signup');
var postRouter = require("./routes/createpost");
var msgpostRouter = require("./routes/createpostmsg");
var grouppostRouter = require('./routes/grouppost');
var msggrouppostRouter = require('./routes/grouppostmsg');

var organizationsget=require('./routes/getorganizations');
var uploadRouter = require('./routes/uploadpost');
var uploadgrouppostRouter = require('./routes/uploadgrouppost');
var selectusersRouter = require('./routes/selectusers');
var chatdataRouter = require('./routes/chatdata');
var chatdatamsgRouter = require('./routes/chatdatamsg');
var getchatdataRouter = require('./routes/getchatdata');
var commentdataRouter = require('./routes/commentdata');
var getcommentdataRouter = require('./routes/getcommentdata');
var groupusersRouter = require('./routes/groupusers');
var groupchatdataRouter = require('./routes/groupchatdata');
var getgroupchatdataRouter = require('./routes/getgroupchatdata');
var adminapproveRouter = require('./routes/adminapprove');
var admindeclineRouter = require('./routes/admindecline');
var getadminRouter = require('./routes/getadmin');
var likepostrouter= require('./routes/likepost');
var unlikepostrouter= require('./routes/unlikepost');
var eventsRouter = require("./routes/createevents");
var eventsmsgRouter = require("./routes/createeventsmsg");
var uploadeventsRouter = require('./routes/uploadevents');
var intrestedeventrouter= require('./routes/intrested');
var eventviewsrouter= require('./routes/geteventviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/getorg', organizationsget);
app.use('/createpost',postRouter);
app.use('/createpostmsg',msgpostRouter);
app.use('/grouppost',grouppostRouter);
app.use('/grouppostmsg',msggrouppostRouter);

app.use('/uploadpost',uploadRouter);
app.use('/uploadgrouppost',uploadgrouppostRouter);
app.use('/selectusers',selectusersRouter);
app.use('/chatdata',chatdataRouter);
app.use('/chatdatamsg',chatdatamsgRouter);
app.use('/getchatdata',getchatdataRouter);
app.use('/commentdata',commentdataRouter);
app.use('/getcommentdata',getcommentdataRouter);
app.use('/groupusers',groupusersRouter);
app.use('/groupchatdata',groupchatdataRouter);
app.use('/getgroupchatdata',getgroupchatdataRouter);
app.use('/adminapprove',adminapproveRouter);
app.use('/admindecline',admindeclineRouter);
app.use('/getadmin',getadminRouter);
app.use('/likepost',likepostrouter);
app.use('/unlikepost',unlikepostrouter);
app.use('/createevents',eventsRouter);
app.use('/createeventsmsg',eventsmsgRouter);
app.use('/uploadevents',uploadeventsRouter);
app.use('/intrested',intrestedeventrouter);
app.use('/geteventviews',eventviewsrouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
