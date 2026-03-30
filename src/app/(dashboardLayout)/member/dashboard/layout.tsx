import { Toaster } from "sonner";

export default function MemberDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  );
}
