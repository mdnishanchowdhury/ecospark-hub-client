"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("better-auth.session_token");
    cookieStore.delete("better-auth.session_data");

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    redirect("/login?loggedOut=true");
}