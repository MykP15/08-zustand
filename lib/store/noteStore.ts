import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewNote } from "@/lib/api";

type NoteDraftStore = {
  draft: NewNote;
  setDratft: (note: NewNote) => void;
  clearDraft: () => void;
};

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDratft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    },
  ),
);
