import { z } from "zod"

export const loginZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 charactters long")
})

export type ILoginPayload = z.infer<typeof loginZodSchema>


export const registerZodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-zA-Z0-9]/, "Password must contain letters or numbers"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type IRegisterPayload = z.infer<typeof registerZodSchema>;


export const verifySchema = z.object({
    otp: z.string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d+$/, "Only numbers are allowed")
});