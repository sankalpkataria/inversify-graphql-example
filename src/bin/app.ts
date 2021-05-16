import Express from 'express';
import { injectable } from 'inversify';

@injectable()
export class App {
  init(): Express.Express {
    const app = Express();
    // Returns middleware that only parses json 
    // and only looks at requests where the Content-Type header matches the type option.
    app.use(Express.json());
    app.get('/ping', function (_, res) {
      res.status(200).end();
    });
    return app;
  }
}

export interface IApp {
  init: () => Express.Express;
}
