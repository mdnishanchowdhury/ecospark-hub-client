export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: {
        needPasswordChange: boolean;
        email: string;
        name: string;
        role: string;
        image: string;
        isActive: boolean;
        isDeleted: boolean;
        emailVerified: boolean;
    }
}
export type UserRole = "ADMIN" | "MEMBER";

export interface IRegisterResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: {
        needPasswordChange: boolean;
        email: string;
        name: string;
        role: string;
        image: string;
        isActive: boolean;
        isDeleted: boolean;
        emailVerified: boolean;
    }
}