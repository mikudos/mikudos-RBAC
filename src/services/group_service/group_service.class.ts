import highland from 'highland';
import { compact, concat, uniq, difference } from 'lodash';
import { Application, Service, Method, App } from 'mikudos-node-app';
const { Op } = require('sequelize');

@Service({ name: 'GroupService', serviceName: 'GroupService' })
export default class {
    softDeleteQuery = {
        deletedAt: null,
    };
    constructor(private options = {}, @App() private app: Application) {
        this.options = options || {};
    }

    @Method('FindGroup')
    async FindGroup(ctx: any) {
        let query = JSON.parse(ctx.req.query);
        let page = { offset: ctx.req.offset, limit: ctx.req.limit };
        let res = await ctx.models.groups.findAndCountAll({
            where: { ...query, ...this.softDeleteQuery },
            ...page,
        });

        ctx.res = res;
    }

    @Method('GetOneGroup')
    async GetOneGroup(ctx: any) {
        let res: any;
        if (ctx.req.id) {
            res = await ctx.models.groups.findByPk(ctx.req.id);
        } else {
            let query = {};
            try {
                query = JSON.parse(ctx.req.query);
            } catch (error) {}
            res = await ctx.models.groups.findOne({
                where: { ...query, ...this.softDeleteQuery },
            });
        }

        ctx.res = res;
    }

    @Method('CreateGroup')
    async CreateGroup(ctx: any) {
        let res;
        try {
            res = await ctx.models.groups.create(ctx.req);
        } catch (error) {
            error.data = { info: error.errors[0].message };
            throw error;
        }
        ctx.res = res;
    }

    @Method('UpdateGroupById')
    async UpdateGroupById(ctx: any) {
        let updateObj = ctx.req.obj;
        let query;
        if (ctx.req.id) {
            query = { id: ctx.req.id };
        } else {
            query = JSON.parse(ctx.req.query);
        }
        if (!query) throw new Error('Invalid Query params');
        let res = await ctx.models.groups.update(updateObj, {
            where: { ...query, ...this.softDeleteQuery },
            fields: ['name', 'description'],
        });
        ctx.res = { count: res[0] };
    }

    @Method('DeleteGroup')
    async DeleteGroup(ctx: any) {
        let query = JSON.parse(ctx.req.query);
        let res = await ctx.models.groups.destroy({
            where: query,
        });

        ctx.res = { state: res ? true : false, num: res };
    }

    @Method('DeleteGroupById')
    async DeleteGroupById(ctx: any) {
        let res = await ctx.models.groups.destroy({
            where: {
                id: ctx.req.id,
            },
        });

        ctx.res = { state: res ? true : false, num: res };
    }

    @Method('GetGroupAccessesById')
    async GetGroupAccessesById(ctx: any) {
        let group = await ctx.models.groups.findOne({
            where: { id: ctx.req.id },
        });
        let ridsArr = compact((group.rids as string).split(','));
        let roles = await ctx.models.roles.findAll({
            where: {
                id: {
                    [Op.in]: ridsArr,
                },
            },
            include: { model: ctx.models.roleMethods },
        });
        roles = roles.map((role: any) => {
            role.roleMethods = role.role_methods.map(
                (method: any) => method.dataValues
            );
            return role;
        });

        ctx.res = highland(roles);
        ctx.res.end();
    }

    @Method('AddRoleIdsToGroupByGid')
    async AddRoleIdsToGroupByGid(ctx: any) {
        let group = await ctx.models.groups.findOne({
            where: { id: ctx.req.id },
        });
        let oldRids = (group.rids as string).split(',').map((s) => parseInt(s));
        oldRids = compact(oldRids);
        let rids = uniq(concat(oldRids, ctx.req.roleIds as number[])).join(',');
        const sequelizeClient = ctx.app.get('sequelizeClient');
        let res = await sequelizeClient.query(
            `UPDATE \`groups\` SET rids="${rids}" WHERE id=${ctx.req.id}`,
            {
                type: sequelizeClient.QueryTypes.UPDATE,
            }
        );

        await this.GetGroupAccessesById(ctx);
    }

    @Method('DelRoleIdsToGroupByGid')
    async DelRoleIdsToGroupByGid(ctx: any) {
        let group = await ctx.models.groups.findOne({
            where: { id: ctx.req.id },
        });
        let oldRids = (group.rids as string).split(',').map((s) => parseInt(s));
        oldRids = compact(oldRids);
        let rids = difference(oldRids, ctx.req.roleIds as number[]).join(',');
        let res = await ctx.models.groups.update(
            {
                rids,
            },
            {
                where: { id: ctx.req.id, ...this.softDeleteQuery },
                fields: ['rids'],
            }
        );

        await this.GetGroupAccessesById(ctx);
    }
}
