import 'reflect-metadata';
import { Container } from "inversify";
import { UserResolvers } from '../modules/user/user-resolver';
import { ILoggerService, LoggerService } from '../services/logger.service';
import { ErrorService, IErrorService } from '../services/error.service';
import { Services } from './services';
import { Bootstrapers } from './bootstrapers';
import { App, IApp } from '../bin/app';
import { Apollo, IApollo } from '../bin/apollo';
import { IServer, Server } from '../bin/server';


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
  c.bind<IApollo>(Bootstrapers.Apollo).to(Apollo).inSingletonScope();
  c.bind<IApp>(Bootstrapers.App).to(App).inSingletonScope();
  c.bind<IServer>(Bootstrapers.Server).to(Server).inSingletonScope();
}

const DIContainer = new Container();
bindResolvers(DIContainer);
bindServices(DIContainer);
bindBootstrapers(DIContainer);

export default DIContainer;