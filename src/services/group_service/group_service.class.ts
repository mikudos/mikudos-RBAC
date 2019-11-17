import highland from 'highland';

export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    async ListGroup(ctx: any) {
        const app = ctx.app;

        ctx.res = highland([{ message: 'Hello!' }]);
        ctx.res.end();
    }

    async GetOneGroup(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async CreateGroup(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async UpdateGroupById(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async DeleteGroup(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async DeleteGroupById(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async GetGroupAccessesById(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async AddRoleIdsToGroupByGid(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }

    async DelRoleIdsToGroupByGid(ctx: any) {
        const app = ctx.app;

        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }
}
