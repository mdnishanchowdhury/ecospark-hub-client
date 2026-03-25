import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

interface IPageProps {
    searchParams: Promise<{ email: string }>;
}

export default async function ResetPasswordPage({ searchParams }: IPageProps) {
    const params = await searchParams;
    const email = params.email;

    return (
        <div className="min-h-[80vh] w-full flex items-center justify-center p-4">
            <ResetPasswordForm email={email} />
        </div>
    );
}