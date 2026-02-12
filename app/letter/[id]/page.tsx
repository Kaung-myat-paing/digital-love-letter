import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LetterViewer from "@/components/LetterViewer";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LetterPage({ params }: Props) {
  const { id: slug } = await params;
  if (!slug) notFound();

  const { data, error } = await supabase
    .from("letters")
    .select("author_name")
    .eq("slug", slug)
    .single();

  if (error || !data) notFound();

  return (
    <LetterViewer slug={slug} authorName={data.author_name ?? ""} />
  );
}
