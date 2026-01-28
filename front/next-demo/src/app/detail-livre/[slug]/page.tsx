"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { CirclePlus, CircleCheck } from 'lucide-react';

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
  isInLibrary: boolean;
  isLogged: boolean;
}

export default function BookDetailPage() {

  const { slug } = useParams();
  const [book, setBook] = useState<iBookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);

  const fallbackImageSrc = "/couverture-secours.png";

  // State to manage the image source (URL or local path)
  const [imgSrc, setImgSrc] = useState<string>(fallbackImageSrc);
  const [imgError, setImgError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);


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

    if (response.ok) {
      // 1. On affiche le pop-up
      setShowPopUp(true);
      setIsAdded(true);

      // 2. On le cache automatiquement après 3 secondes
      setTimeout(() => {
        setShowPopUp(false);
      }, 3000);
    }

  }

  // Fetch book data
  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/books/${slug}`, {
          credentials: "include",
        });

        console.log("Status d'erreur :", response.status);

        if (!response.ok) throw new Error("Error fetching book data");

        const data = await response.json();
        setBook(data);

        setIsAdded(data.isInLibrary);

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
              {book.isLogged && (
                <>
                  {isAdded ? (
                    <div className="flex items-center gap-2 text-teal-600 animate-in zoom-in duration-300">
                      <span className="text-xs font-bold uppercase">Dans ma pile</span>
                      <CircleCheck size={32} />
                    </div>
                  ) : (
                    <button
                      onClick={handleAddBook}
                      title="Ajouter à ma bibliothèque"
                      className="hover:scale-110 transition-transform cursor-pointer"
                    >
                      <CirclePlus size={32} className="text-teal-600" />
                    </button>
                  )}
                </>
              )}
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
      {showPopUp && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-teal-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-teal-500">
            <div className="bg-white rounded-full p-1">
              <CirclePlus size={18} className="text-teal-600" />
            </div>
            <span className="font-medium">Livre ajouté à votre bibliothèque !</span>
          </div>
        </div>
      )}
    </div>

  );


}