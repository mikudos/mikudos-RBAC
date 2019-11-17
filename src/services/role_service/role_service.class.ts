export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    async ListRole(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async GetOneRole(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async CreateRole(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async UpdateRoleById(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async DeleteRole(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async DeleteRoleById(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async GetRoleAccessesById(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async AddAccessToRoleByRid(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async DelAccessToRoleByRid(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }

}
