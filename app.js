var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var probabilidadeRouter = require('./routes/probabilidade');

var app = express();

// #region agent log
function debugLog(location, message, data, hypothesisId) {
  var payload = { sessionId: '64e654', location: location, message: message, data: data, hypothesisId: hypothesisId, timestamp: Date.now(), runId: 'pre-fix' };
  console.error('[DEBUG-64e654]', JSON.stringify(payload));
  fetch('http://127.0.0.1:7547/ingest/e57c4033-b143-45f8-8da6-1263b2ad858c', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '64e654' }, body: JSON.stringify(payload) }).catch(function () {});
}
var viewsDir = path.join(__dirname, 'views');
debugLog('app.js:startup', 'app init', {
  pugVersion: require('pug/package.json').version,
  viewsDir: viewsDir,
  viewsExists: fs.existsSync(viewsDir),
  probIndexExists: fs.existsSync(path.join(viewsDir, 'probabilidade', 'index.pug')),
  nodeEnv: process.env.NODE_ENV,
  vercel: process.env.VERCEL === '1'
}, 'B-D');
// #endregion

// view engine setup
app.set('views', viewsDir);
app.set('view engine', 'pug');

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// #region agent log
app.use(function (req, res, next) {
  debugLog('app.js:request', 'incoming request', { method: req.method, path: req.path, url: req.url, originalUrl: req.originalUrl }, 'C-E');
  next();
});
// #endregion

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
  debugLog('app.js:error', 'request failed', { message: err.message, code: err.code, status: err.status, path: req.path, url: req.url, views: app.get('views') }, 'B-D-E');
  // #endregion
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
