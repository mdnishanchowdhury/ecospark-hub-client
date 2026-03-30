import { Toaster } from "sonner";

export default function AdminDashboardLayout({
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
