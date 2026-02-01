"use client"

import css from "./NoteForm.module.css"
import * as Yup from 'yup'
import { useMutation, useQueryClient,} from "@tanstack/react-query"
import { createNote } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useNoteDraftStore } from "@/lib/store/noteStore"
import React from "react"


const noteValidationSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title too short").max(50, "Title too long").required("Title is required"),
  content: Yup.string().max(500, "Message too long"),
  tag: Yup.string().required("Tag is required")
})

interface NoteFormProps{
  onClose: () => void
}

interface NoteFormValues{
  title: string,
  content: string
  tag: string
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo"
};

function NoteForm({ onClose }: NoteFormProps) {

  const router = useRouter()

  const draft = useNoteDraftStore(state => state.draft)
  const setDraft = useNoteDraftStore(state => state.setDratft)
  const clearDraft = useNoteDraftStore(state => state.clearDraft)
  
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      router.push(`/notes/filter/all`)
      clearDraft()
    }
  })

  function handleback() {
    router.push(`/notes/filter/all`)
  }

  function handleSubmit(formData: FormData){
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const tag = formData.get("tag") as string

    createMutation.mutate({title, content, tag})
  }

  function handleCahge(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setDraft({...draft, [event.target.name]: event.target.value})
  }

    return (
        <form action={handleSubmit}> 
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" className={css.input} onChange={handleCahge} defaultValue={draft.title}/>
            <span className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                rows={8}
            className={css.textarea}
            onChange={handleCahge}
            defaultValue={draft.content}
              />
            <span className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={css.select} onChange={handleCahge} defaultValue={draft.tag}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
            <span className={css.error} />
          </div>
          
          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={handleback}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
            disabled={createMutation.isPending}>
              Create note
            </button>
          </div>
        </form>
    )
}


export default NoteForm

