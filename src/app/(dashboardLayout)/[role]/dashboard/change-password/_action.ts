"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { isAxiosError } from "axios";

export const changePasswordAction = async (payload: any) => {
  try {
    const response = await httpClient.post("/auth/change-password", payload);

    const data = response.data as { success: boolean; message?: string };

    return {
      success: true,
      message: data.message || "Password changed successfully.",
    };
  } catch (error: any) {
    let errorMessage = "Something went wrong. Please try again.";

    if (isAxiosError(error)) {
      errorMessage = (error.response?.data as any)?.message || error.message;
    }

    return {
      success: false,
      message: errorMessage
    };
  }
};