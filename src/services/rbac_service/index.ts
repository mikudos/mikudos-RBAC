import { Application, Service } from 'mikudos-node-app';
import RbacService from './rbac_service.class';

export default function (app: Application) {
    app.register(RbacService);
}
