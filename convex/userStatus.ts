import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const update = mutation({
    args: {
        status: v.string(),
        customStatus: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");
        const userId = identity.subject as Id<"users">;

        const existing = await ctx.db
            .query("userStatus")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (existing) {
            return await ctx.db.patch(existing._id, {
                status: args.status,
                customStatus: args.customStatus,
                lastSeen: Date.now(),
            });
        }

        return await ctx.db.insert("userStatus", {
            userId,
            status: args.status,
            customStatus: args.customStatus,
            lastSeen: Date.now(),
        });
    },
});

export const get = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("userStatus")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .first();
    },
});