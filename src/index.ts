import DIContainer from './config/di-container';
import { IServer } from './bin/server';
import { BootStrapers } from './config/boot-strapers';

const server = DIContainer.get<IServer>(
  BootStrapers.Server
);

server.init();