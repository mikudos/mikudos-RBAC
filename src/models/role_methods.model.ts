// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from 'sequelize';
import { Application } from 'mikudos-node-app';

export default function(app: Application) {
    const sequelizeClient: Sequelize = app.get('sequelizeClient');
    const role_methods = sequelizeClient.define(
        'role_methods',
        {
            rid: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            methodType: {
                type: DataTypes.INTEGER, // 1: method_id; 2: method_path(regex)
                allowNull: false
            },
            methodId: {
                type: DataTypes.INTEGER
            },
            value: {
                type: DataTypes.STRING
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
    (role_methods as any).associate = function(models: any) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return role_methods;
}
