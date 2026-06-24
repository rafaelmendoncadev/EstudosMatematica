var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var probabilidadeRouter = require('./routes/probabilidade');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/probabilidade', probabilidadeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // #region agent log
  const errData = {
    hypothesisId: 'A-D-E',
    message: err.message,
    code: err.code,
    path: req.path,
    url: req.url,
    views: app.get('views')
  };
  console.error('[DEBUG-64e654] error', JSON.stringify(errData));
  fetch('http://127.0.0.1:7547/ingest/e57c4033-b143-45f8-8da6-1263b2ad858c', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '64e654' },
    body: JSON.stringify({
      sessionId: '64e654',
      hypothesisId: 'A-D-E',
      location: 'app.js:errorHandler',
      message: 'Express error caught',
      data: errData,
      timestamp: Date.now(),
      runId: 'pre-fix'
    })
  }).catch(() => {});
  // #endregion

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  if (process.env.VERCEL === '1') {
    return res.json({
      debug: true,
      error: err.message,
      code: err.code,
      path: req.path
    });
  }
  res.render('error');
});

module.exports = app;
