import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import createTwitterApi from './apis/twitter';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

createTwitterApi(app);

const env = process.env.NODE_ENV || 'development';

if (env !== 'development') {
  app.use(favicon(path.join(__dirname, '..', 'client', 'build', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html')));
}

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error page
  res.status(err.status || 500);
  res.send(err.status + 'error');
});

export default app;