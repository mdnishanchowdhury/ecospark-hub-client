import RegisterForm from "@/components/forms/RegisterForm";

interface RegisterParams {
  searchParams: Promise<{ redirect?: string }>
}

const registerPage = async ({ searchParams }: RegisterParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;
  return (
    <RegisterForm redirectPath={redirectPath} />
  )
}

export default registerPage;