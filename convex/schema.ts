import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
export default defineSchema({
  ...authTables,

  channels: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    members: v.array(v.id("users")),
  }).index("by_name", ["name"]),

  messages: defineTable({
    channelId: v.optional(v.id("channels")), // null for DMs
    senderId: v.id("users"),
    recipientId: v.optional(v.id("users")), // for DMs
    content: v.string(),
    fileUrl: v.optional(v.string()),
    fileType: v.optional(v.string()),
    edited: v.optional(v.boolean()),
    parentId: v.optional(v.id("messages")), // for threads
    timestamp: v.number(), // for message ordering
  })
    .index("by_channel", ["channelId", "timestamp"])
    .index("by_dm", ["senderId", "recipientId", "timestamp"])
    .index("by_parent", ["parentId", "timestamp"]),

  reactions: defineTable({
    messageId: v.id("messages"),
    userId: v.id("users"),
    emoji: v.string(),
  }).index("by_message", ["messageId"]),

  userStatus: defineTable({
    userId: v.id("users"),
    status: v.string(), // online, offline, away, etc.
    customStatus: v.optional(v.string()),
    lastSeen: v.number(),
  }).index("by_user", ["userId"]),
});
