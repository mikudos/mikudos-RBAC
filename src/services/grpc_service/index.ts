import { Application, Service } from 'mikudos-node-app';
import GrpcService from './grpc_service.class';

export default function (app: Application) {
    app.register(GrpcService);
}
