import LogiForm from "@/components/forms/LoginForm";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>
}

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;
  return (
    <LogiForm redirectPath={redirectPath} />
  )
}

export default LoginPage