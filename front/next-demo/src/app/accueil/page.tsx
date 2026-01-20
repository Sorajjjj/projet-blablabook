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
		<div className="flex flex-col min-h-screen w-full bg-blabla-light-cream">
			<Header showSearchBar={true} />
			<main className="flex-1 w-full">
				<section className={Styles.hero} aria-label="Section de bienvenue">
					<h1>Bienvenue sur BlaBlaBook</h1>
					<p>Découvrir et gérer votre bibliothèque</p>
				</section>
				<section
					className={Styles.discovery}
					aria-label="Section de découverte de livres"
				>
					<h2>DÉCOUVREZ</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl mx-auto px-4">
						{randomBook.length > 0 ? (
							randomBook.map((book: iBook) => (
								<article key={book.bookId}>
									<BookCard title={book.title} />
								</article>
							))
						) : (
							<p className="text-center col-span-full">
								Aucun livre disponible pour le moment.
							</p>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
