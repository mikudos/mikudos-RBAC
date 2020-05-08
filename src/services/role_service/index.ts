import { Application, Service } from 'mikudos-node-app';
import RoleService from './role_service.class';

export default function (app: Application) {
    app.register(RoleService);
}
