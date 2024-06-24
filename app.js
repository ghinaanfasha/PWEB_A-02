var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');
var userhomeRouter = require ('./routes/userhome')
var userprofilRouter = require('./routes/userprofil');
var ubahRouter = require('./routes/ubah');
var adminHomeRouter = require('./routes/adminHome');
var adminMagangRouter = require('./routes/adminMagang');
var adminMagangAssignmentsRouter = require('./routes/adminMagangAssignments')(upload);
var adminMagangAbsensiRouter = require('./routes/adminMagangAbsensi');
var adminPenilaianRouter = require('./routes/adminPenilaian');
var adminPenilaianPembobotanRouter = require('./routes/adminPenilaianPembobotan');
var adminPenilaianKalkulasiRouter = require('./routes/adminPenilaianKalkulasi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/userhome', userhomeRouter);
app.use('/userprofil', userprofilRouter);
app.use('/ubah', ubahRouter);
app.use('/adminHome', adminHomeRouter);
app.use('/adminMagang', adminMagangRouter);
app.use('/adminMagangAssignments', adminMagangAssignmentsRouter);
app.use('/adminMagangAbsensi', adminMagangAbsensiRouter);
app.use('/adminPenilaian', adminPenilaianRouter);
app.use('/adminPenilaianPembobotan', adminPenilaianPembobotanRouter);
app.use('/adminPenilaianKalkulasi', adminPenilaianKalkulasiRouter);


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
