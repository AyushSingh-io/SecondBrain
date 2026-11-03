import mongoose, { model, Schema } from "mongoose";

try {
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log("MongoDB connected successfully!");

} catch (error: any) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
}


//Schemas : 

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
})

const ContentSchema = new Schema({
    title: { type: String, required: true, unique: true },
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    type: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const UserModel = model("User", UserSchema);
export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);