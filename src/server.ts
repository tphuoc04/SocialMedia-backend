import http from 'http';
import dotenv from 'dotenv';
import app from './app';
import { AddressInfo } from 'net';
import { Server } from 'socket.io'


dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server)
app.set("io", io)


server.listen(PORT);

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

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
});

server.on('listening', () => {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});


