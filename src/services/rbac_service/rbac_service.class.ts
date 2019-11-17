

export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    async VerifyAccessRightWithRids(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

    async VerifyAccessRightWithGids(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

}
