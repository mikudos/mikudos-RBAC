import grpc_caller from 'grpc-caller';
import path from 'path';
import { Application } from 'mikudos-node-app';

interface UsersService {
    FindUsersList: Function;
    GetUsersById: Function;
    CreateUsers: Function;
    UpdateUsers: Function;
    UpdateUsersById: Function;
    DeleteUsers: Function;
    DeleteUsersById: Function;
    FindUserChatGroupsList: Function;
    GetUserChatGroupsById: Function;
    CreateUserChatGroups: Function;
    UpdateUserChatGroups: Function;
    UpdateUserChatGroupsById: Function;
    DeleteUserChatGroups: Function;
    DeleteUserChatGroupsById: Function;
    FindUserDevicesList: Function;
    GetUserDevicesById: Function;
    CreateUserDevices: Function;
    UpdateUserDevices: Function;
    UpdateUserDevicesById: Function;
    DeleteUserDevices: Function;
    DeleteUserDevicesById: Function;
    FindUserFriendsList: Function;
    GetUserFriendsById: Function;
    CreateUserFriends: Function;
    UpdateUserFriends: Function;
    UpdateUserFriendsById: Function;
    DeleteUserFriends: Function;
    DeleteUserFriendsById: Function;
}

export class Client {
    UsersService: UsersService;
    constructor(file: string, load: object, serviceClients: any) {
        this.UsersService = grpc_caller(
            `${serviceClients.name}:${serviceClients.port}`,
            { file, load },
            'UsersService'
        );
    }
}

export default function(app: Application): void {
    let serviceClients = app.get('interServiceClients').users;
    const file = path.resolve(__dirname, '../../proto/users/users.proto');
    const load = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    };
    app.context.grpcClients.usersClient = new Client(
        file,
        load,
        serviceClients
    );
}
