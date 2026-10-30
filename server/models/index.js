const User = require("./User");
const Post = require("./Post");


// ==========================================
// USER → POSTS
// ==========================================

User.hasMany(Post, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});


// ==========================================
// POST → USER
// ==========================================

Post.belongsTo(User, {
    foreignKey: "userId",
});


module.exports = {
    User,
    Post,
};