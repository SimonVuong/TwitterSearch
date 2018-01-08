import app from './app';
import { createServer } from 'http';
import io from 'socket.io';
import { enableTwitterStream } from './apis/twitter';

const port = process.env.PORT || '8080';
const httpServer = createServer(app);

enableTwitterStream(io(httpServer));

httpServer.listen(port, () => console.log('listening on ' + port));