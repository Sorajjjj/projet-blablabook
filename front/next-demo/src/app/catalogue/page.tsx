"use client";

import Header from "@/components/blablabook/Header";
import Footer from "@/components/blablabook/footer";
import React, { useEffect, useState } from "react";
import Styles from "./catalogue.module.css";
import BookCard from "@/components/blablabook/book-card";

interface iBook {
  title: string;
  bookId: string;
  author: {
    fullName: string;
  };
  imageUrl: string | null;
}

export default function CataloguePage() {
  const [books, setBooks] = useState<iBook[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
        if (!response.ok) throw new Error("Erreur API");
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.error("Erreur lors du fetch:", err);
      }
    })();
  }, []);

  return (
    // <div>
    <div className="bg-blabla-light-cream">
      <Header showSearchBar={true} user={null} />

      <div className={Styles.container}>
        <h1 className={Styles.title}>📚 Nos livres</h1>

        <div className={Styles.grid}>
          {books.map((book) => (
            <BookCard
              key={book.bookId}
              title={book.title}
              author={book.author.fullName}
              bookId={book.bookId}
              imageUrl={book.imageUrl}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
