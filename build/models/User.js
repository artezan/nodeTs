"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
const UserSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        default: "",
        required: true
    },
    lastName: {
        type: String,
        default: "",
        required: true
    },
    username: {
        type: String,
        default: "",
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        default: "",
        required: true
    },
    password: {
        type: String,
        default: "",
        required: true
    },
    posts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post"
        }],
    books: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Books"
        }]
});
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=User.js.map