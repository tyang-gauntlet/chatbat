import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        members: v.array(v.id("users")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");
        const userId = identity.subject as Id<"users">;

        return await ctx.db.insert("channels", {
            name: args.name,
            description: args.description,
            members: [userId, ...args.members],
            createdBy: userId,
        });
    },
});

export const list = query({
    handler: async (ctx) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error("Not authenticated");

        return await ctx.db
            .query("channels")
            .order("desc")
            .collect();
    },
});

export const get = query({
    args: { channelId: v.id("channels") },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error("Not authenticated");

        return await ctx.db.get(args.channelId);
    },
}); 