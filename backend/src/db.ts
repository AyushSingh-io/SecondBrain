
import mongoose, { model, Schema } from "mongoose";

try {
    console.log(process.env.MONGODB_URI)
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
}, { timestamps: true })

const ContentSchema = new Schema({
    title: { type: String, required: true, unique: true },
    link: String,
    // tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    tags : {type : [String] , default : []},
    type: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content : String
}, { timestamps: true })


const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
}, { timestamps: true })


export const UserModel = model("User", UserSchema);
export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);