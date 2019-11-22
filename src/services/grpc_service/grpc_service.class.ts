import highland from 'highland';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

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
                defaults: method
            });
        }

        ctx.res = highland(methods);
        ctx.res.end();
    }

    async ListGrpcServer(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{ message: 'Hello!' }]);
        ctx.res.end();
    }

    async ListServicesWithFullPath(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{ message: 'Hello!' }]);
        ctx.res.end();
    }

    async ListMethodsWithFullPath(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{ message: 'Hello!' }]);
        ctx.res.end();
    }

    async GetServiceListOnServer(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{ message: 'Hello!' }]);
        ctx.res.end();
    }

    async getMethodsListInService(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{ message: 'Hello!' }]);
        ctx.res.end();
    }
}
