import { fetchNoteById } from "@/lib/api"
import { QueryClient, HydrationBoundary, dehydrate} from "@tanstack/react-query"
import NoteDetails from "./NoteDetails.client"
import type { Metadata } from "next"

interface NoteProps{
    params: Promise<{ id: string }>
}


export async function generateMetadata({ params }: NoteProps): Promise<Metadata> {
    const { id } = await params
    const note = await fetchNoteById(id)
    return {
        title: `Note: ${note.title}`,
        description: `${note.content}`,
        openGraph: {
            title: `Note: ${note.title}`,
            description: `${note.content}`,
            url: `https://notehub.com/notes/${id}`,
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: `NoteHub`
            }],
        }
    }
}



async function Note({ params }: NoteProps) {

    const {id} = await params

    const queryClient = new QueryClient()

    queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id)
})

    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
    )
}

export default Note