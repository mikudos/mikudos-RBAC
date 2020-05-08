import { concat, get } from 'lodash';
import { Application, Service } from 'mikudos-node-app';
import GroupService from './group_service.class';

export = function (app: Application) {
    app.register(GroupService);
};
