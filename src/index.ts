import DIContainer from './config/di-container';
import { IServer } from './bin/server';
import { Bootstrapers } from './config/bootstrapers';

const server = DIContainer.get<IServer>(
  Bootstrapers.Server
);

server.init();