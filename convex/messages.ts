import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const send = mutation({
  args: {
    channelId: v.optional(v.id("channels")),
    recipientId: v.optional(v.id("users")),
    content: v.string(),
    fileUrl: v.optional(v.string()),
    fileType: v.optional(v.string()),
    parentId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db.insert("messages", {
      channelId: args.channelId,
      senderId: identity.subject as Id<"users">,
      recipientId: args.recipientId,
      content: args.content,
      fileUrl: args.fileUrl,
      fileType: args.fileType,
      parentId: args.parentId,
      timestamp: Date.now(),
      edited: false,
    });
  },
});

export const listChannelMessages = query({
  args: { channelId: v.id("channels") },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
      .order("desc")
      .collect();
  },
});

export const listDirectMessages = query({
  args: { recipientId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject as Id<"users">;

    return await ctx.db
      .query("messages")
      .withIndex("by_dm")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), userId),
            q.eq(q.field("recipientId"), args.recipientId)
          ),
          q.and(
            q.eq(q.field("senderId"), args.recipientId),
            q.eq(q.field("recipientId"), userId)
          )
        )
      )
      .order("desc")
      .collect();
  },
});
