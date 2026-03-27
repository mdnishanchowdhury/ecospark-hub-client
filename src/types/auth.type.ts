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

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status?: string;
    bio?: string;
    address?: string;
    phoneNumber?: string;
    totalIdeasShared?: number;
    totalPurchases?: number;
    needPasswordChange?: boolean;
}

export interface IRegisterResponse {
    success: boolean;
    message: string;
    data: {
        data: {
            token: string | null;
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
    }
}

export interface IUserPayload {
    userId: string;
    role: UserRole;
    email: string;
    emailVerified: boolean;
    name?: string;
}

