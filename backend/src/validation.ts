import { z } from "zod";

export const userValidation = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(4).max(20)
})

export const contentValidation = z.object({
    title: z.string().min(3).max(100),
    link: z.string(),
    type: z.string()
})

