// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from 'sequelize';
import { Application } from 'mikudos-node-app';

export default function(app: Application) {
    const sequelizeClient: Sequelize = app.get('sequelizeClient');
    const roles = sequelizeClient.define(
        'roles',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            hooks: {
                beforeCount(options: any) {
                    options.raw = true;
                }
            }
        }
    );

    // eslint-disable-next-line no-unused-vars
    (roles as any).associate = function(models: any) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };
    roles.sync();

    return roles;
}
