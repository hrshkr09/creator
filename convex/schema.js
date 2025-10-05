import {defineSchema, defineTable} from "convex/server"
import {v} from "convex/values"

export default  defineSchema({
    users: defineTable({
        name : v.string(),
        email:v.string(),
        tokenIdentifier: v.string(),//clerk user ID for auth
        imageUrl:v.optional(v.string()),//profile picture
        username:v.optional(v.string()),//unique username for public profiles


        //Activity timestamps
        createdAt: v.number(),
        lastActiveAt: v.number(),

    }).index("by_token",["tokenIdentifier"]).index("by_email",["email"]).index("by_username",["username"]).searchIndex("search_name",{searchField:"name"}).searchIndex("search_email",{searchField:"email"}),


    posts: defineTable({
        title: v.string(),
        content: v.string(), //Rich text content (JSON string or HTML)
        status: v.union(v.literal("draft"),v.literal("published")),

        //Author relationship
        authorId: v.id("users"),

        //Content metadata
        tags: v.array(v.string()),
        category: v.optional(v.string()),//Single category
        featuredImage: v.optional(v.string()), //ImageKit URL

        //Timestamp
        createdAt: v.string(),
        updatedAt: v.string(),
        publishedAt: v.optional(v.number()),
        scheduledAt: v.optional(v.number()),// fir scheduled publishing

        //Analytics
        viewCount: v.number(),
        likeCount: v.number(),


    }).index("by_author",["authorId"])
    .index("by_status",["status"])
    .index("by_published",["publishedAt"])
    .index("by_author_status",["authorId","status"])
    .searchIndex("search_content",{searchField:"title"}),



    comments: defineTable({
        postId: v.id("posts"),
        authorId:v.optional(v.id("users")),// optional for anonymous comments
        authorName:v.string(),// for anonymous or display name
        authorEmail: v.optional(v.string()),//for anonymous comments

        content: v.string(),
        status: v.union(
            v.literal("approved"),
            v.literal("pending"),
            v.literal("rejected")
        ),

        createdAt: v.number(),
    }).index("by_post",["postId"]).index("by_post_status",["postId","status"]).index("by_author",["authorId"]),


    likes: defineTable({
        postId: v.id("posts"),
        userId: v.optional(v.id("users")),//optional for anonymous likes

        createdAt: v.number(),

    }).index("by_post",["postId"])
    .index("by_user",["userId"])
    .index("by_post_user",["postId","userId"]), // prevent duplicate likes


    follows: defineTable({
        followerId: v.id("users"),//user doing the folllowing
        followingId: v.id("users"),// user being followed

        createdAt: v.number(),
    }).index("by_follower" ,["followerId"])
    .index("by_following",["followingId"])
    .index("by_relationship",["followerId","followingId"]),//prevent duplicates

    dailyStats: defineTable({
        postId: v.id("postId"),
        date: v.string(), // YYYY-MM-DD format for easy querying
        views: v.number(),

    }).index("by_post",["postId"])
    .index("by_date",["date"])
    .index("by_post_date",["postId","date"]),//unqiue constraint
})