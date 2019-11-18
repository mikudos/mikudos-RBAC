// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from 'sequelize';
import { Application } from 'mikudos-node-app';

export default function(app: Application) {
    const sequelizeClient: Sequelize = app.get('sequelizeClient');
    const methods = sequelizeClient.define(
        'methods',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            package: {
                type: DataTypes.STRING,
                allowNull: false
            },
            serivce: {
                type: DataTypes.STRING,
                allowNull: false
            },
            method: {
                type: DataTypes.STRING,
                allowNull: false
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
    (methods as any).associate = function(models: any) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return methods;
}
