// "use client";

// // Import of page components
// import Footer from "@/components/blablabook/footer";
// import Header from "@/components/blablabook/Header";
// import Styles from "./accueil.module.css";
// import BookCard from "@/components/blablabook/book-card";
// import { useEffect, useState, useRef } from "react";
// import Link from "next/link";

// interface iBook {
// 	title: string;
// 	bookId: string;
// 	author: {
// 		fullName: string;
// 	};
// 	imageUrl: string | null;
// }

// export default function AccueilPage() {
// 	const [randomBook, setRandomBook] = useState<iBook[]>([]);
// 	const [showLeftArrow, setShowLeftArrow] = useState(false);
// 	const [showRightArrow, setShowRightArrow] = useState(true); // Visible by default

// 	// 1. Create a reference (the "laser pointer") to target the scrollable div
// 	const scrollContainerRef = useRef<HTMLDivElement>(null);

// 	// Fetch 15 random books from the backend
// 	useEffect(() => {
// 		(async () => {
// 			try {
// 				const response = await fetch("http://localhost:4000/api/books/random");

// 				if (!response.ok) throw new Error("Erreur API");
// 				const data = await response.json();
// 				setRandomBook(data);
// 			} catch (err) {
// 				console.error("Erreur lors du fetch:", err);
// 			}
// 		})();
// 	}, []);

// 	// 2. Functions to trigger the horizontal scroll
// 	const scrollRight = () => {
// 		// Check if the reference is pointing to a real element
// 		if (scrollContainerRef.current) {
// 			// Use the scrollBy method to move the scrollbar 350px to the right
// 			scrollContainerRef.current.scrollBy({
// 				left: 400,
// 				behavior: "smooth", // Makes the movement fluid
// 			});
// 		}
// 	};

// 	const scrollLeft = () => {
// 		if (scrollContainerRef.current) {
// 			// We use a negative value to move back to the left
// 			scrollContainerRef.current.scrollBy({
// 				left: -400,
// 				behavior: "smooth",
// 			});
// 		}
// 	};

// 	// Monitor scroll position to show/hide left arrow
// 	const handleScroll = () => {
// 		if (scrollContainerRef.current) {
// 			const { scrollLeft, scrollWidth, clientWidth } =
// 				scrollContainerRef.current;

// 			// Show left arrow if we scrolled more than 10px
// 			setShowLeftArrow(scrollLeft > 10);

// 			// Show right arrow if we haven't reached the end
// 			// We substract 10px to avoid precision issues with some browsers
// 			setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
// 		}
// 	};

// 	return (
// 		<div className="flex flex-col min-h-screen w-full bg-blabla-light-cream">
// 			<Header showSearchBar={true} />

// 			<main className="flex-1 w-full">
// 				{/* HERO SECTION */}
// 				<section className={Styles.hero} aria-label="Section de bienvenue">
// 					<h1>Bienvenue sur BlaBlaBook</h1>
// 					<p>Découvrez et gérez votre bibliothèque personnelle</p>
// 				</section>

// 				{/* DISCOVERY SECTION*/}
// 				<section className={Styles.discovery} aria-label="Section découverte">
// 					<h2>DÉCOUVREZ</h2>

// 					<div className="relative">
// 						{/* LEFT ARROW: Only visible if showLeftArrow is true */}
// 						{showLeftArrow && (
// 							<button
// 								onClick={scrollLeft}
// 								className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-lg border border-gray-100 hover:scale-110 transition-all md:flex hidden"
// 								aria-label="Faire défiler vers la gauche"
// 							>
// 								<svg
// 									xmlns="http://www.w3.org/2000/svg"
// 									fill="none"
// 									viewBox="0 0 24 24"
// 									strokeWidth={2.5}
// 									stroke="currentColor"
// 									className="w-6 h-6 text-teal-600"
// 								>
// 									<path
// 										strokeLinecap="round"
// 										strokeLinejoin="round"
// 										d="M15.75 19.5L8.25 12l7.5-7.5"
// 									/>
// 								</svg>
// 							</button>
// 						)}

// 						{/* THE CAROUSEL CONTAINER */}
// 						<div
// 							ref={scrollContainerRef}
// 							onScroll={handleScroll}
// 							className={Styles.carouselContainer}
// 							role="region"
// 							aria-label="Carrousel de livres aléatoires"
// 						>
// 							{/* TERNARY 1: Checking if we have books */}
// 							{randomBook.length > 0 ? (
// 								randomBook.map((book) => (
// 									<div key={book.bookId} className={Styles.bookWrapper}>
// 										<BookCard
// 											title={book.title}
// 											// TERNARY 2: Safe check for author
// 											author={
// 												book.author ? book.author.fullName : "Auteur inconnu"
// 											}
// 											bookId={book.bookId}
// 											imageUrl={book.imageUrl}
// 										/>
// 									</div>
// 								))
// 							) : (
// 								<p>Chargement des livres...</p>
// 							)}

// 							{/* SEE ALL BOOKS CARD */}
// 							<div className={Styles.bookWrapper}>
// 								<Link
// 									href="/catalogue"
// 									/* The 'group' class MUST be here, on the Link itself. 
//        This way, it only affects what is INSIDE this specific link. */
// 									className="flex flex-col items-center justify-center w-70 h-[332px] bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm group"
// 								>
// 									{/* Only this icon will scale when THIS link is hovered */}
// 									<div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-4 text-teal-600 shadow-inner transform group-hover:scale-110 transition-transform duration-300">
// 										<svg
// 											xmlns="http://www.w3.org/2000/svg"
// 											fill="none"
// 											viewBox="0 0 24 24"
// 											strokeWidth={2.5}
// 											stroke="currentColor"
// 											className="w-6 h-6"
// 										>
// 											<path
// 												strokeLinecap="round"
// 												strokeLinejoin="round"
// 												d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
// 											/>
// 										</svg>
// 									</div>
// 									<span className="font-bold text-teal-700 uppercase text-xs tracking-widest">
// 										Voir tout
// 									</span>
// 								</Link>
// 							</div>
// 						</div>

// 						{/* RIGHT ARROW: Now wrapped in a condition */}
// 						{showRightArrow && (
// 							<button
// 								onClick={scrollRight}
// 								className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-lg border border-gray-100 hover:scale-110 md:flex hidden"
// 								aria-label="Faire défiler vers la droite"
// 							>
// 								<svg
// 									xmlns="http://www.w3.org/2000/svg"
// 									fill="none"
// 									viewBox="0 0 24 24"
// 									strokeWidth={2.5}
// 									stroke="currentColor"
// 									className="w-6 h-6 text-teal-600"
// 								>
// 									<path
// 										strokeLinecap="round"
// 										strokeLinejoin="round"
// 										d="M8.25 4.5l7.5 7.5-7.5 7.5"
// 									/>
// 								</svg>
// 							</button>
// 						)}
// 					</div>
// 				</section>
// 			</main>

// 			<Footer />
// 		</div>
// 	);
// }
