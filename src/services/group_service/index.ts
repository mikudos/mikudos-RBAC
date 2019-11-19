import { Application } from 'mikudos-node-app';

import * as Funcs from './group_service.funcs';
import hooks from './group_service.hooks';

export default function(app: Application) {
        app.use(
            'GroupService',
            'ListGroup',
            ...hooks.before,
            Funcs['ListGroup'],
            ...hooks.after
        );
        app.use(
            'GroupService',
            'GetOneGroup',
            ...hooks.before,
            Funcs['GetOneGroup'],
            ...hooks.after
        );
        app.use(
            'GroupService',
            'CreateGroup',
            ...hooks.before,
            Funcs['CreateGroup'],
            ...hooks.after
        );
        app.use(
            'GroupService',
            'UpdateGroupById',
            ...hooks.before,
            Funcs['UpdateGroupById'],
            ...hooks.after
        );
        app.use(
            'GroupService',
            'DeleteGroup',
            ...hooks.before,
            Funcs['DeleteGroup'],
            ...hooks.after
        );
        app.use(
            'GroupService',
            'DeleteGroupById',
            ...hooks.before,
            Funcs['DeleteGroupById'],
            ...hooks.after
        );
        app.use(
            'GroupService',
            'GetGroupAccessesById',
            ...hooks.before,
            Funcs['GetGroupAccessesById'],
            ...hooks.after
        );
        app.use(
            'GroupService',
            'AddRoleIdsToGroupByGid',
            ...hooks.before,
            Funcs['AddRoleIdsToGroupByGid'],
            ...hooks.after
        );
        app.use(
            'GroupService',
            'DelRoleIdsToGroupByGid',
            ...hooks.before,
            Funcs['DelRoleIdsToGroupByGid'],
            ...hooks.after
        );
}