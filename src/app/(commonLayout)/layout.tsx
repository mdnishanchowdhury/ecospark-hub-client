import { Navbar } from "@/components/shared/navbar";

export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="max-w-7xl mx-auto">

                <Navbar />

                <main className="flex-grow">
                    {children}
                </main>

            </div>
        </>
    );
}
