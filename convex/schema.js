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
})