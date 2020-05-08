import highland from 'highland';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { Application, Service, Method } from 'mikudos-node-app';
const { Op } = require('sequelize');

@Service({ name: 'GrpcService', serviceName: 'GrpcService' })
export default class {
    constructor(private options = {}, public app: Application) {
        this.options = options || {};
    }

    @Method('UpdateGrpcMethods')
    async UpdateGrpcMethods(ctx: any) {
        const app = ctx.app;
        const packages = yaml.safeLoad(
            fs.readFileSync(
                path.resolve(__dirname, '../../../proto/proto_info.yml'),
                'utf8'
            )
        );
        let methods: any[] = _.flatten(Object.values(packages));
        for await (const method of methods) {
            method.method = method.name;
            delete method.name;
            await ctx.models.methods.findOrCreate({
                where: { path: method.path },
                defaults: method,
            });
        }

        ctx.res = highland(methods);
        ctx.res.end();
    }

    @Method('ListGrpcServer')
    async ListGrpcServer(ctx: any) {
        let res = await ctx.models.methods.findAll({
            attributes: ['package'],
            group: 'package',
            raw: true,
        });

        ctx.res = highland(res);
        ctx.res.end();
    }

    @Method('ListServicesWithFullPath')
    async ListServicesWithFullPath(ctx: any) {
        const sequelizeClient = ctx.app.get('sequelizeClient');
        let res = await sequelizeClient.query(
            'SELECT CONCAT_WS(".", package, service) as servicePath FROM `methods` GROUP BY servicePath',
            {
                type: sequelizeClient.QueryTypes.SELECT,
            }
        );

        ctx.res = highland(res);
        ctx.res.end();
    }

    @Method('ListMethodsWithFullPath')
    async ListMethodsWithFullPath(ctx: any) {
        let page = { offset: ctx.req.offset, limit: ctx.req.limit };
        let res = await ctx.models.methods.findAll({
            attributes: ['package', 'service', 'method', 'type', 'path'],
            raw: true,
            ...page,
        });

        ctx.res = highland(res);
        ctx.res.end();
    }

    @Method('GetServiceListOnServer')
    async GetServiceListOnServer(ctx: any) {
        const sequelizeClient = ctx.app.get('sequelizeClient');
        let res = await sequelizeClient.query(
            `SELECT service FROM \`methods\` WHERE package="${ctx.req.package}" GROUP BY service`,
            {
                type: sequelizeClient.QueryTypes.SELECT,
            }
        );

        ctx.res = highland(res);
        ctx.res.end();
    }

    @Method('getMethodsListInService')
    async getMethodsListInService(ctx: any) {
        let page = { offset: ctx.req.offset, limit: ctx.req.limit };
        let res: any;
        if (ctx.req.path) {
            res = await ctx.models.methods.findAll({
                where: {
                    path: {
                        [Op.like]: ctx.req.path,
                    },
                },
                attributes: ['package', 'service', 'method', 'type', 'path'],
                raw: true,
                ...page,
            });
        } else {
            res = await ctx.models.methods.findAll({
                where: {
                    package: ctx.req.package,
                    service: ctx.req.service,
                },
                attributes: ['package', 'service', 'method', 'type', 'path'],
                raw: true,
                ...page,
            });
        }

        ctx.res = highland([{ message: 'Hello!' }]);
        ctx.res.end();
    }
}
