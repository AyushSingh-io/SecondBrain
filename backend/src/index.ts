import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { authMiddleware } from "./middleware.js";
import { userValidation, contentValidation } from "./validation.js";
import cors from "cors";

const app = express()

app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true
}))

app.post("/api/v1/signup", async (req, res) => {
    const validation = userValidation.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ message: validation.error.issues })
    }

    const username = validation.data.username;
    const password = validation.data.password;

    try {
        await UserModel.create({
            username,
            password
        })

    } catch (error) {
        return res.status(400).json({ message: "Error occured while sign in or user already exists" })
    }

    return res.status(201).json({ message: "User signed in successfully" })

})

app.post("/api/v1/signin", async (req, res) => {
    //zod validatioN:
    const validation = userValidation.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ message: validation.error.issues })
    }

    const { username, password } = validation.data;

    let user;
    try {
        user = await UserModel.findOne({
            username,
            password
        })
    } catch (error) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
        {
            _id: user._id
        },
        process.env.JWTKEY
    )


    return res.status(200).json({ message: "User logged In", user: user, token: token })

})

app.post("/api/v1/content", authMiddleware, async (req, res) => {

    const validation = contentValidation.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ message: validation.error.issues });
    }

    const { title, link, type } = validation.data;

    //@ts-ignore
    const id = req.user._id;

    let newContent;

    try {
        newContent = await ContentModel.create({
            title,
            link,
            tags: [],
            type: type,
            userId: id
        })

    } catch (error) {
        return res.status(500).json({ message: "Error occured while creating content" });
    }

    return res.status(201).json({ message: "added content successfully", content: newContent })

})

app.get("/api/v1/content", authMiddleware, async (req, res) => {

    //@ts-ignore
    const id = req.user._id;

    const allContent = await ContentModel.find({
        userId: id,
    }).populate("userId", "-password")

    return res.status(200).json({ message: "Fetched contents successfully", contents: allContent })

})

app.delete("/api/v1/content:contentId", authMiddleware, async (req, res) => {
    const contentId = req.params.contentId
    console.log(contentId)

    //@ts-ignore
    const id = req.user._id;

    if (!contentId) {
        return res.status(400).json({ message: "content Id is required" })
    }

    let deleted ;
    try {
         deleted = await ContentModel.deleteOne({
            _id: contentId,
            userId: id
        })
    } catch (error) {
        return res.status(500).json({message : "error occured while deleting"})
    }

    return res.status(200).json({ message: "content id ", deletedContent: deleted })

})

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
    const { share } = req.body;

    if (share === undefined) {
        return res.status(400).json({ message: "Share cannot be undefined" })
    }

    // @ts-ignore
    const userId = req.user._id

    try {
        if (share) {

            const alreadyShared = await LinkModel.findOne({
                userId: userId
            });

            if (alreadyShared) {
                return res.status(200).json({ message: "You already have sharedLink", shareLink: alreadyShared.hash })
            }

            const shareLinkToken = crypto.randomBytes(32).toString("hex")
            const newShareLink = await LinkModel.create({
                hash: shareLinkToken,
                userId: userId
            })

            return res.status(201).json({
                message: "Share Link has generated",
                shareLink:  shareLinkToken
            })

        } else {
            const deletedShareLink = await LinkModel.deleteOne({
                userId: userId
            })

            return res.status(200).json({ message: "Share Link has deleted" });
        }
    } catch (error) {
        return res.status(500).json({ message: "error has occured ", error: error });
    }


})

app.get("/api/v1/brain/:shareLink", authMiddleware, async (req, res) => {

    const shareLink = req.params.shareLink

    if (!shareLink) {
        return res.status(400).json({ message: "Share Link is required" })
    }

    try {
        const r = await LinkModel.findOne({
            hash: shareLink as string
        })

        if (!r) {
            return res.status(400).json({ message: "Invalid ShareLink" })
        }

        const ownerId = r.userId;

        const contents = await ContentModel.find({
            userId: ownerId
        })

        return res.status(200).json({ message: "successfully fetched sharedLink contents", sharedContent: contents })

    } catch (error) {
        return res.status(500).json({ message: "error occured while fetching shared contents" })
    }

})

app.listen(process.env.PORT, () => {
    console.log("server listening")
})