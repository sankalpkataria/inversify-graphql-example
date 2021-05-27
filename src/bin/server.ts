import { createServer } from 'http';
import stoppable from 'stoppable';
import { inject, injectable } from 'inversify';
import { constants } from '@/config/constants';
import { BootStrapers } from '@/config/boot-strapers';
import { IApollo } from './apollo';
import { IApp } from './app';

const { PORT } = constants;

@injectable()
export class Server {
  private readonly expressApp;
  private readonly server;
  constructor(
    @inject(BootStrapers.Apollo) 
    private readonly apollo: IApollo,
    @inject(BootStrapers.App) 
    private readonly app: IApp
  ) {
    if (!PORT) {
      console.error('PORT not provided.');
      process.exit(1);
    }
    this.expressApp = this.app.init();
    this.server = stoppable(createServer(this.expressApp));
  }

  private shutdown(): void {
    // handle some special things here
    // Like closing the connections
    this.server.stop((err) => {
      if (err) {
        console.log(err, 'err');
        process.exit(1);
      }
      process.exit();
    });
  }

  private addProcessEvents(): void {
    process.on('uncaughtException', (error) => {
      console.log(error, 'error - uncaughtException');
      this.shutdown();
    });
  
    process.on('unhandledRejection', (error) => {
      console.log(error, 'error - unhandledRejection');
      this.shutdown();
    });
  
    process.on('SIGTERM', () => {
      console.log('SIGTERM');
      this.shutdown();
    });
  
    process.on('SIGINT', () => {
      console.log('SIGINT');
      this.shutdown();
    });
  
    process.on('exit', (code) => {
      console.log(`Exiting with code: ${code}`);
    });
  }

  init(): void {
    const apolloServer = this.apollo.init();
    apolloServer.applyMiddleware({ app: this.expressApp, path: '/graphql' });
    apolloServer.installSubscriptionHandlers(this.server);
    this.addProcessEvents();
    this.server.listen(PORT, async () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
}

export interface IServer {
  init(): void;
}

