import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import CreateNoteClient from "./CreateNote.client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Craete note - NoteHub",
    description: "Create your own note!",
    url: "https://notehub.com/notes/action/create",
  openGraph: {
    title: "NoteHub",
    description: "A convenient website for managing your notes, organizing ideas, and keeping everything in one place.",
    url: "https://notehub.com/notes/action/create",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub",
    }]
  }
} as Metadata


function CreateNote() {
     
    const queryClient = new QueryClient();

     return (
         <HydrationBoundary state={dehydrate(queryClient)}>
         <CreateNoteClient></CreateNoteClient>
         </HydrationBoundary>
    )
}

export default CreateNote