import 'reflect-metadata';
import { Container } from 'inversify';
import { UserResolvers } from '@/modules/user/user-resolver';
import { ILoggerService, LoggerService } from '@/services/logger.service';
import { ErrorService, IErrorService } from '@/services/error.service';
import { Services } from './services';
import { BootStrapers } from './boot-strapers';
import { App, IApp } from '@/bin/app';
import { Apollo, IApollo } from '@/bin/apollo';
import { IServer, Server } from '@/bin/server';


const bindResolvers = (c: Container) => {
  c.bind<UserResolvers>(UserResolvers).toSelf().inSingletonScope();
}

// Binds service signatures to their implementations
const bindServices = (c: Container) => {
  c.bind<ILoggerService>(Services.LoggerService).to(LoggerService).inSingletonScope();
  c.bind<IErrorService>(Services.ErrorService).to(ErrorService).inSingletonScope();
}

// Binds service signatures to their implementations
const bindBootstrapers = (c: Container) => {
  c.bind<IApollo>(BootStrapers.Apollo).to(Apollo).inSingletonScope();
  c.bind<IApp>(BootStrapers.App).to(App).inSingletonScope();
  c.bind<IServer>(BootStrapers.Server).to(Server).inSingletonScope();
}

const DIContainer = new Container();
bindResolvers(DIContainer);
bindServices(DIContainer);
bindBootstrapers(DIContainer);

export default DIContainer;