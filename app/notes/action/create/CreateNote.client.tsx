"use client"

import NoteForm from "@/components/NoteForm/NoteForm"
import css from "@/app/notes/action/create/CreateNote.module.css"

function CreateNoteClient() {
     return (
         <>    
             <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm onClose={() => {}}></NoteForm>
  </div>
</main>
         </>
    )
}

export default CreateNoteClient