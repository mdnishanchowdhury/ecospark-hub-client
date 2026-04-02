import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // সরাসরি আপনার Express ব্যাকএন্ডের URL দিন
  baseURL: "http://localhost:5000", 
  fetchOptions: {
    // এটি কুকি এবং সেশন হ্যান্ডেল করার জন্য অত্যন্ত জরুরি
    credentials: "include",
  },
});