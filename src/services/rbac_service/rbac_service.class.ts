export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    async VerifyAccessRightWithRids(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async VerifyAccessRightWithGids(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

}
