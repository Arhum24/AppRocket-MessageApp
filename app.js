var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var user = require('./Server/routes/user');

var app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const {Chat} = require("./Server/models/chat");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', user);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

io.on("connection", socket => {
  socket.on("Type Message Here", msg => {
      try{
          let chat = new Chat({
            message: msg.chatMessage,
            sender: msg.userID,
            type: msg.type
          })

          chat.save((err, data) =>  {
            if(err) return res.json({
              success: false, err
            })
            Chat.find({"_id": data._id})
            .populate("sender")
            .exec((err, data) =>  {
                return io.emit("Output Chat Message", data);
            })
          })
      }
      catch(err){
          console.error(err);
      }
  })
})

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
