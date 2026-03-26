import PublicNavbar from "@/components/shared/Navbar/PublicNavbar";

export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="max-w-7xl mx-auto">

                <PublicNavbar />

                <main className="flex-grow">
                    {children}
                </main>

            </div>
        </>
    );
}
