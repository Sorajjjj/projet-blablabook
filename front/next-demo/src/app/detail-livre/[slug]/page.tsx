"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; 
import { CirclePlus } from 'lucide-react';

// Import of page components
import Footer from "@/components/blablabook/footer";
import Header from "@/components/blablabook/Header";
import { TealRoundedButton } from "@/components/blablabook/buttons";
import Styles from "./details.module.css";


interface iBookDetail {
  bookId: string;
  title: string;
  releaseDate: string;
  isbn: string;
  summary: string;
  author: {
    fullName: string;
  };
  imageUrl?: string;
}

export default function BookDetailPage() {

  const { slug } = useParams();
  const [book, setBook] = useState<iBookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackImageSrc = "/couverture-secours.png";

  // State to manage the image source (URL or local path)
  const [imgSrc, setImgSrc] = useState<string>(fallbackImageSrc);
  const [imgError, setImgError] = useState(false);

  const handleAddBook = async () => {
    if (!book) return;

    const response = await fetch("http://localhost:4000/api/libraries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        bookId: book.bookId,
        status: "A lire"
      }),
    });

    console.log("Add book status:", response.status);
  }

  // Fetch book data
  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/books/${slug}`);
        if (!response.ok) throw new Error("Error fetching book data");
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // Image synchronization
  useEffect(() => {
    if (book?.imageUrl) {
      setImgSrc(book.imageUrl);
      setImgError(false); 
    } else {
      // If no URL, use the public path string directly
      setImgSrc(fallbackImageSrc);
    }
  }, [book]);

  if (!book) {
    return <div className="p-8 text-center">Livre introuvable</div>;
  }

  const displaySummary = book.summary ? book.summary : "Aucune description disponible pour ce livre.";

  return (
    <div className="flex flex-col min-h-screen">
      <Header showSearchBar={false} />
      <main className="flex-1 container mx-auto p-8">
        <p className={Styles["breadcrumb"]}>
          Bibliothèque / détails d’un livre
        </p>
        
        {/* BOOK CARD */}
        <section className={Styles["book-card"]}>
          
          <Image
            src={imgSrc}
            alt={`Couverture du livre ${book.title}`}
            width={200}
            height={260}
            className="object-cover rounded-md shadow-lg" 
            // We remove 'unoptimized' check because strings from 'public' are handled fine
            onError={() => {
              if (imgError) return; 
              console.log("Image load error, switching to public fallback...");
              setImgError(true);
              setImgSrc(fallbackImageSrc);
            }}
          />

          <div className={`${Styles["book-info"]} flex flex-col`}>
            <div className={Styles["title-row"]}>
              <h1 className=" text-blabla-dark">{book.title}</h1>

              <button
                onClick={handleAddBook}
                title="Ajouter à ma bibliothèque"
                className="hover:scale-110 transition-transform cursor-pointer">
                <CirclePlus size={32} className="text-teal-600" />
              </button>
            </div>
            <p className={Styles["author"]}>
              {book.author?.fullName || "Auteur inconnu"}
            </p>
            {book.releaseDate && (
              <span className={Styles["added"]}>
                Sorti le : {new Date(book.releaseDate).toLocaleDateString()}
              </span>
            )}
            <div className={Styles["rating"]}>
              ⭐⭐⭐⭐☆ <span>4.0 / 5</span>
            </div>
            <div className="actions mt-auto flex items-center gap-4">
              <TealRoundedButton>Marquer comme lu</TealRoundedButton>
              <span className={Styles["added"]}>Ajouté hier</span>
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className={`${Styles["description"]} text-blabla-dark`}>
          <h2>Description du livre</h2>
          <p>{displaySummary}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}