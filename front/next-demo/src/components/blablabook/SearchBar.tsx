"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./SearchBar.module.css";


type Book = {
  bookId: string;
  title: string;
};

export default function SearchBarTest() {
  // Typed text
  const [query, setQuery] = useState("");

  // Received results
  const [results, setResults] = useState<Book[]>([]);

  // if under 2 characters, clear results
  async function search(q: string) {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }

    // encodeURIComponent avoids breaking the URL
    const res = await fetch(
      `http://localhost:4000/api/books/search?q=${encodeURIComponent(q)}`
    );

    const data = await res.json();
    setResults(data);
  }

return (
  <form className={styles.searchForm}>
    <input
      placeholder="Cherchez un livre..."
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