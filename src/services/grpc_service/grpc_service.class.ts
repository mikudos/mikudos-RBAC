import highland from "highland";

export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    async ListGrpcServer(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{message: "Hello!"}]);
        ctx.res.end();

    }

    async ListServicesWithFullPath(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{message: "Hello!"}]);
        ctx.res.end();

    }

    async ListMethodsWithFullPath(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{message: "Hello!"}]);
        ctx.res.end();

    }

    async GetServiceListOnServer(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{message: "Hello!"}]);
        ctx.res.end();

    }

    async getMethodsListInService(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{message: "Hello!"}]);
        ctx.res.end();

    }

}
