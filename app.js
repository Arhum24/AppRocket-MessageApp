var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var config = require('./Server/controllers/config');
var User = require('./Server/models/user');
var Chat = require('./Server/models/chat');
var Message = require('./Server/models/message');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var user = require('./Server/routes/user');
var message = require('./Server/routes/message');

var app = express();



// MongoDB Setup
var db = mongoose.connection;
var dburl = 'mongodb+srv://AppRocketDB:WrongPassword@cluster0.atxed.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority';
db.on('error', function () {
  console.log('There was an Error Communicating with Database');
});
mongoose.connect(dburl, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true },function (err) {
  if (err) {
      return console.log('There was error Connecting to Database URL');
  }

});


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
app.use('/api/message', message);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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

const server = app.listen(8000, () => {
  console.log("Server is Listening");
});

// Socket Setup
const io = require("socket.io")(server);

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, config.secret);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("Disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("JoinChat", async({ chatId }) => {
    socket.join(chatId);
    socket.chatId=chatId;

    console.log("A user joined chatroom: " + chatId);
    const user = await User.findOne({ _id: socket.userId });
    const chatroom_ = await Chat.findOne({_id:chatId})
    io.sockets.emit("broadcast",{message:user.name+" joined the "+chatroom_.name+" chatroom"});
  });

  socket.on("MessageinChat", async ({ chatId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chat: chatId,
        user: socket.userId,
        message,
      });
      io.to(chatId).emit("newMessage", {
        message,
        user: socket.userId,
      });
      await newMessage.save();
    }
  });
});
