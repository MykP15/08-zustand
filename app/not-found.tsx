import css from "@/app/Home.module.css"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Not Found",
  description: "Not Found page.",
  url: "https://notehub.com/not-found",
  openGraph: {
    title: "Not Found - NoteHub",
    description: "",
    url: "https://notehub.com/not-found",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub",
    }]
  }
} as Metadata;



function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
