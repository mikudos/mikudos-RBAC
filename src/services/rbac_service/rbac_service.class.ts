export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    // TODO:
    async VerifyAccessRightWithRids(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    // TODO:
    async VerifyAccessRightWithGids(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }
}
