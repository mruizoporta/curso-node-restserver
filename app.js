require('dotenv').config();
import Server from './models/Server';

const server = new Server();

server.listen();