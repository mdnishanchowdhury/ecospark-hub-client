import CommunityPage from "@/components/modules/Community/CommunityPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "community | ecospark-hub",
  description: "connect with eco-innovators and share your green concepts.",
};

export default function Page() {
  return (
    <main className="w-full flex justify-center">
      <CommunityPage />
    </main>
  );
}