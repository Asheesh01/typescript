import mongoose, { model, Model, Schema } from "mongoose";
export async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/brainly");
        console.log("✅ DB connected");
    }
    catch (err) {
        console.log("❌ DB error:", err);
    }
}
const USerSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});
const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});
export const UserModel = model("User", USerSchema);
export const ContentModel = model("Content", ContentSchema);
//# sourceMappingURL=db.js.map