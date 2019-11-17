import { Application } from 'mikudos-node-app';

import usersClient, { Client as usersType } from './users.client';

export = function(app: Application): void {
    app.context.grpcClients = {};

    usersClient(app);
};
