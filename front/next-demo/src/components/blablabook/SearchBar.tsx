"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./SearchBar.module.css";


type Book = {
  bookId: string;
  title: string;
};

export default function SearchBarTest() {
  // Texte tapé
  const [query, setQuery] = useState("");

  // Résultats reçus
  const [results, setResults] = useState<Book[]>([]);

  // Si moins de 2 caractères on sort
  async function search(q: string) {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }

    // encodeURIComponent évite de casser l’URL
    const res = await fetch(
      `http://localhost:4000/api/books/search?q=${encodeURIComponent(q)}`
    );

    const data = await res.json();
    setResults(data);
  }

return (
  <form className={styles.searchForm}>
    <input
      placeholder="Chercher un livre..."
      value={query}
      onChange={(e) => {
        const value = e.target.value;
        setQuery(value);
        search(value);
      }}
      className={styles.input}
    />

    <ul className={styles.resultsBox}>
      {results.map((b) => (
        <li key={b.bookId} className={styles.resultItem}>
          <Link href={`/detail-livre/${b.bookId}`}>
            {b.title}
          </Link>
        </li>
      ))}
    </ul>
  </form>
);


}