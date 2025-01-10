import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        members: v.array(v.id("users")),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("channels", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("channels"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        members: v.optional(v.array(v.id("users"))),
    },
    handler: async (ctx, args) => {
        const { id, ...rest } = args;
        return await ctx.db.patch(id, rest);
    },
});

export const remove = mutation({
    args: { id: v.id("channels") },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
});

export const list = query({
    handler: async (ctx) => {
        return await ctx.db.query("channels").collect();
    },
});

export const getById = query({
    args: { id: v.id("channels") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
}); 