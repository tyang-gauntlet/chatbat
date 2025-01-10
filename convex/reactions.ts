import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const add = mutation({
    args: {
        messageId: v.id("messages"),
        emoji: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        return await ctx.db.insert("reactions", {
            messageId: args.messageId,
            userId: identity.subject as Id<"users">,
            emoji: args.emoji,
        });
    },
});

export const list = query({
    args: { messageId: v.id("messages") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("reactions")
            .withIndex("by_message", (q) => q.eq("messageId", args.messageId))
            .collect();
    },
}); 