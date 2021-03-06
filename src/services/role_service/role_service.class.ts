import highland from 'highland';
import { Application, Service, Method } from 'mikudos-node-app';
const { Op } = require('sequelize');

@Service({ name: 'RoleService', serviceName: 'RoleService' })
export default class {
    softDeleteQuery = {
        deletedAt: null,
    };
    constructor(private options = {}, public app: Application) {
        this.options = options || {};
    }

    @Method('FindRole')
    async FindRole(ctx: any) {
        let query = JSON.parse(ctx.req.query);
        let page = { offset: ctx.req.offset, limit: ctx.req.limit };
        let res = await ctx.models.roles.findAndCountAll({
            where: { ...query, ...this.softDeleteQuery },
            ...page,
        });

        ctx.res = res;
    }

    @Method('GetOneRole')
    async GetOneRole(ctx: any) {
        let res: any;
        if (ctx.req.id) {
            res = await ctx.models.roles.findByPk(ctx.req.id);
        } else {
            let query = {};
            try {
                query = JSON.parse(ctx.req.query);
            } catch (error) {}
            res = await ctx.models.roles.findOne({
                where: { ...query, ...this.softDeleteQuery },
            });
        }

        ctx.res = res;
    }

    @Method('CreateRole')
    async CreateRole(ctx: any) {
        let res = await ctx.models.roles.create(ctx.req);

        ctx.res = res;
    }

    @Method('UpdateRoleById')
    async UpdateRoleById(ctx: any) {
        let updateObj = ctx.req.obj;
        let query;
        if (ctx.req.id) {
            query = { id: ctx.req.id };
        } else {
            query = JSON.parse(ctx.req.query);
        }
        if (!query) throw new Error('Invalid Query params');
        let res = await ctx.models.roles.update(updateObj, {
            where: { ...query, ...this.softDeleteQuery },
            fields: ['name', 'description'],
        });
        ctx.res = { count: res[0] };
    }

    @Method('DeleteRole')
    async DeleteRole(ctx: any) {
        let query = JSON.parse(ctx.req.query);
        let res = await ctx.models.roles.destroy({
            where: query,
        });

        ctx.res = { state: res ? true : false, num: res };
    }

    @Method('DeleteRoleById')
    async DeleteRoleById(ctx: any) {
        let res = await ctx.models.roles.destroy({
            where: {
                id: ctx.req.id,
            },
        });

        ctx.res = { state: res ? true : false, num: res };
    }

    @Method('GetRoleAccessesById')
    async GetRoleAccessesById(ctx: any) {
        let res = await ctx.models.roles.findOne({
            where: { id: ctx.req.id },
            include: { model: ctx.models.roleMethods },
        });
        res.roleMethods = res.role_methods.map(
            (method: any) => method.dataValues
        );

        ctx.res = res;
    }

    @Method('AddAccessToRoleByRid')
    async AddAccessToRoleByRid(ctx: any) {
        let roleId = ctx.req.roleId;
        let value = ctx.req.value;
        let res = await ctx.models.roleMethods.create({
            roleId,
            value,
        });
        ctx.req.id = roleId;

        await this.GetRoleAccessesById(ctx);
    }

    @Method('DelAccessToRoleByRid')
    async DelAccessToRoleByRid(ctx: any) {
        let query;
        let roleId = ctx.req.roleId;
        let value = ctx.req.value;
        if (ctx.req.delId) {
            query = {
                id: ctx.req.delId,
            };
        } else if (roleId && value) {
            query = {
                roleId,
                value,
            };
        }
        let res = await ctx.models.roleMethods.destroy({
            where: query,
        });
        ctx.req.id = roleId;

        await this.GetRoleAccessesById(ctx);
    }
}
