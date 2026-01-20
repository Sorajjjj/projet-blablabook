'use client';

// Import of page components
import Footer from "@/components/blablabook/footer";
import Header from "@/components/blablabook/Header";
import Styles from "./accueil.module.css";
import BookCard from "@/components/blablabook/book-card";
import { useEffect, useState } from "react";

interface iBook {
	title: string;
	bookId: string;
	author: {
		fullName: string;
	}
	imageUrl: string | null;
}

export default function AccueilPage() {
	const [randomBook, setRandomBook] = useState<iBook[]>([])

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("http://localhost:4000/api/books/random");
				
				if (!response.ok) throw new Error("Erreur API");
				const data = await response.json();
				setRandomBook(data);
			} 
			catch (err) {
				console.error("Erreur lors du fetch:", err);
			}
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
									<BookCard title={book.title} author={book.author.fullName} bookId={book.bookId} imageUrl={book.imageUrl} />
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
