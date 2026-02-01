import { fetchNotes} from "@/lib/api";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

interface NotesByCategoryProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Notes: ${slug[0]}` ,
    description: `Notes by category ${slug[0]}`,
    openGraph: {
      title: `Notes: ${slug[0]}`,
      description: `Notes by category ${slug[0]}`,
      url: `https://notehub.com/notes/filter/${slug[0]}`,
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub`
      }],
    }
  }
}




export default async function NotesByCategory({ params }: NotesByCategoryProps) {
  const { slug } = await params;

  const category = slug?.[0] === "all" ? undefined : slug?.[0];

  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, tag: category }],
    queryFn: () => fetchNotes({ page: 1, tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category}/>
    </HydrationBoundary>
  );
}
