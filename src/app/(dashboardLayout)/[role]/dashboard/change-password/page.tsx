import ChangePasswordForm from "@/components/forms/ChangePasswordForm";


interface IPageProps {
    searchParams: Promise<{ email: string }>;
}

export default async function ChangePasswordPage({ searchParams }: IPageProps) {

    return (
        <div className="min-h-[80vh] w-full flex items-center justify-center">
            <ChangePasswordForm />
        </div>
    );
}