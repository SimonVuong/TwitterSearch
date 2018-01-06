import app from './app';
import { createServer } from 'http';
import io from 'socket.io';
import { enableTwitterStream } from './apis/twitter';

const port = process.env.PORT || '8080';
const httpServer = createServer(app);

enableTwitterStream(io(httpServer));

httpServer.listen(port, () => console.log('listening on ' + port));
httpServer.on('error', onError);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}