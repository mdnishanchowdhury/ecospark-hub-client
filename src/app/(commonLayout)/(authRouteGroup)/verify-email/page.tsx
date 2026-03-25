import VarifyForm from "@/components/forms/VarifyForm";

interface VarifyParams {
  searchParams: Promise<{ email?: string; redirect?: string }>
}

const VarifyPage = async ({ searchParams }: VarifyParams) => {
  const params = await searchParams;

  const emailFromUrl = params.email || "";
  const redirectPath = params.redirect;

  return (
    <VarifyForm initialEmail={emailFromUrl} redirectPath={redirectPath} />
  )
}

export default VarifyPage;