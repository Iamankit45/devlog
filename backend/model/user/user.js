const mongoose = require("mongoose");
const Post = require("../post/post");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name! ']
  },

    userName: {
      type: String,
      unique: true,
      required: [true, "userName is required"],
    },

//will use this username paramtere as searching user

    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // isBlocked: {
    //   type: Boolean,
    //   default: false,
    // },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    // role: {
    //   type: String,
    //   default:'User',
    //   enum: ["Admin", "Guest", "Editor"],
    // },
    // viewers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    // blocked: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],

    // plan: [
    //   {
    //     type: String,
    //     enum: ["Free", "Premium", "Pro"],
    //     default: "Free",
    //   },
    // ],

    userAward: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//hooks

//pre -before record is saved






//get post count
userSchema.virtual("post-count").get(function () {
  return this.posts.length;
});

//get followers count
userSchema.virtual("followers-count").get(function () {
  return this.followers.length;
});

//get following count
userSchema.virtual("following-count").get(function () {
  return this.following.length;
});

//get viewers count
// userSchema.virtual("viewers-count").get(function () {
//   return this.viewers.length;
// });

//get blocked count
// userSchema.virtual("blocked-count").get(function () {
//   return this.blocked.length;
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
