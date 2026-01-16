'use client';

// Import of page components
import Footer from "@/components/footer";
import Header from "@/components/Header";
import Styles from "./accueil.module.css";
import BookCard from "@/components/blablabook/book-card";
import { useEffect, useState } from "react";

interface iBook {
	title: string;
	bookId: string;
	releaseDate: null;
	isbn: null;
	summary: null;
	authorId: string;
	createdAt: string;
	updatedAt: string;
}

export default function AccueilPage() {
	const [randomBook, setRandomBook] = useState<iBook[]>([])

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:4000/api/books/random");
			const data = await response.json();
			setRandomBook(data);
			console.log(data);
		})();
	}, []);

	return (
		<div className="w-full bg-blabla-light-cream">
			<Header showSearchBar={true} />

			<main className="min-h-screen w-full">
				<section className={Styles.hero}>
					<h1>Bienvenue sur BlaBlaBook</h1>
					<p>Découvrir et gérer votre bibliothèque</p>
				</section>

				<section className={Styles.recommendations}>
					<h2>POUR VOUS</h2>
					<div className="flex flex-wrap justify-center gap-4">

              {randomBook.length > 0 ? (randomBook.map((book: iBook) => { 
                return (
									<article key={book.bookId}>
										<BookCard title={book.title} />
									</article>
								); 
              })) 
                : (<p>Pas de de livres aléatoires...</p>)}

					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
