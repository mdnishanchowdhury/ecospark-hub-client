import { getIdeaById } from "@/services/ideas/idea.service";
import { notFound } from "next/navigation";
import IdeaDetails from "@/components/modules/Ideas/IdeaDetails";

interface IdeaDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function IdeaDetailPage({ params }: IdeaDetailPageProps) {
  const { id } = await params;
  const response = await getIdeaById(id);

  if (!response?.success || !response?.data) {
    notFound();
  }

  const idea = response.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <IdeaDetails idea={idea as any} />
    </div>
  );
}