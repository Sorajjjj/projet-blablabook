"use client";

// Import of page components
import Footer from "@/components/blablabook/footer";
import Header from "@/components/blablabook/Header";
import Styles from "./accueil.module.css";
import BookCard from "@/components/blablabook/book-card";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface iBook {
  title: string;
  bookId: string;
  author: {
    fullName: string;
  };
  imageUrl: string | null;
}

export default function AccueilPage() {
  const [randomBook, setRandomBook] = useState<iBook[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch 15 random books from the backend
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:4000/api/books/random");

        if (!response.ok) throw new Error("Erreur API");
        const data = await response.json();
        setRandomBook(data);
      } catch (err) {
        console.error("Erreur lors du fetch:", err);
      }
    })();
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Scroll adapted on mobile : 250px on mobile, 400px on desktop
      const scrollAmount = window.innerWidth < 768 ? 250 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 400;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Declare background colors for book cards
  const bgColors: string[] = [
    "bg-blabla-light-blue",
    "bg-blabla-orange",
    "bg-blabla-taupe",
    "bg-blabla-teal",
  ];

  //   Create an array of colors
  const colors: string[] = [];

  //   random color for each book
  randomBook.forEach((_, index) => {
    if (index === 0) {
      colors.push(bgColors[Math.floor(Math.random() * bgColors.length)]);
    } else {
      const previousColor = colors[index - 1];

      const availableColors = bgColors.filter(
        (color) => color !== previousColor,
      );

      colors.push(
        availableColors[Math.floor(Math.random() * availableColors.length)],
      );
    }
  });

  return (
    <div className="flex flex-col min-h-screen w-full bg-blabla-light-cream">
      <Header showSearchBar={true} />

      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <section className={Styles.hero} aria-label="Section de bienvenue">
          <h1>Bienvenue sur BlaBlaBook</h1>
          <p>Découvrez et gérez votre bibliothèque personnelle</p>
        </section>

        {/* DISCOVERY SECTION */}
        <section className={Styles.discovery} aria-label="Section découverte">
          <h2>DÉCOUVREZ</h2>

          <div className="relative">
            {/* LEFT ARROW - Hidden on mobile */}
            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-lg border border-gray-100 hover:scale-110 transition-all hidden md:flex"
                aria-label="Faire défiler vers la gauche"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-teal-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}

            {/* THE CAROUSEL CONTAINER */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className={Styles.carouselContainer}
              role="region"
              aria-label="Carrousel de livres aléatoires"
            >
              {randomBook.length > 0 ? (
                randomBook.map((book, index) => (
                  <div key={book.bookId} className={Styles.bookWrapper}>
                    <BookCard
                      title={book.title}
                      author={
                        book.author ? book.author.fullName : "Auteur inconnu"
                      }
                      bookId={book.bookId}
                      imageUrl={book.imageUrl}
                      bgColor={colors[index]}
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm md:text-base px-2">
                  Chargement des livres...
                </p>
              )}

              {/* SEE ALL BOOKS CARD */}
              <div className={Styles.bookWrapper}>
                <Link
                  href="/catalogue"
                  className="flex flex-col items-center justify-center w-[145px] h-[260px] md:w-70 md:h-83 bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm group"
                >
                  <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-teal-50 flex items-center justify-center mb-2 md:mb-4 text-teal-600 shadow-inner transform group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                  <span className="font-bold text-teal-700 uppercase text-[9px] md:text-xs tracking-widest px-2 text-center">
                    Voir tout
                  </span>
                </Link>
              </div>
            </div>

            {/* RIGHT ARROW - Hidden on mobile */}
            {showRightArrow && (
              <button
                onClick={scrollRight}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-lg border border-gray-100 hover:scale-110 transition-all hidden md:flex"
                aria-label="Faire défiler vers la droite"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-teal-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
