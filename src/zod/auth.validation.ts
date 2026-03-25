import { z } from "zod"

export const loginZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 charactters long")
})

export type ILoginPayload = z.infer<typeof loginZodSchema>


export const registerZodSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-zA-Z0-9]/, "Must contain letters or numbers"),
    confirmPassword: z.string().min(1, "Confirm your password"),
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


export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
});

export type IForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;


export const resetPasswordSchema = z
    .object({
        otp: z.string().min(6, { message: "OTP must be 6 digits" }).max(6),
        newPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Must contain one uppercase letter" })
            .regex(/[0-9]/, { message: "Must contain one number" }),
        confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type IResetPasswordPayload = z.infer<typeof resetPasswordSchema>;