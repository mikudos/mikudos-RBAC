import highland from "highland";

export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    async ListRole(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{message: "Hello!"}]);
        ctx.res.end();

    }

    async GetOneRole(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

    async CreateRole(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

    async UpdateRoleById(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

    async DeleteRole(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

    async DeleteRoleById(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

    async GetRoleAccessesById(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

    async AddAccessToRoleByRid(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

    async DelAccessToRoleByRid(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };

    }

}
