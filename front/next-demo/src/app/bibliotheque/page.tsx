'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Footer from "@/components/blablabook/footer";
import Header from "@/components/blablabook/Header";
import Styles from "./library.module.css";
import { SimpleButton } from "@/components/blablabook/buttons";
import BookCardLibrary from "@/components/blablabook/book-card-library";
import { CheckCheck, BookMarked, BookHeart, BookCopy } from 'lucide-react';

export default function LibraryPage() {

	const router = useRouter();

	// State management for library data and UI
	const [library, setLibrary] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("all");

	// Logic to filter books based on the selected category
	const filteredLibrary = library.filter((item) => {
		if (activeTab === "Toute ma bibliothèque") return true;

		if (activeTab === "A lire") return item.status === "A lire";
		if (activeTab === "En cours") return item.status === "En cours";
		if (activeTab === "Lu") return item.status === "Lu";

		return true;
	});

	// API call to fetch all books in the library
	const fetchLibrary = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/libraries", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				}
			});

			if (!response.ok) {
				if (response.status === 401) {
					router.push("/login"); 
					return;
				}}

			const result = await response.json();
			setLibrary(result.data || []);
		} catch (error) {
			console.error("Erreur lors du chargement de la bibliothèque:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLibrary();
	}, []);

	// Handle book removal with API request and local state update
	const handleDeleteBook = async (bookId: string) => {
		if (!confirm("Voulez-vous vraiment retirer ce livre ?")) return;

		try {
			const response = await fetch(`http://localhost:4000/api/libraries/${bookId}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (response.ok) {
				setLibrary((prev) => prev.filter((item) => item.bookId !== bookId));
			} else {
				alert("Erreur lors de la suppression sur le serveur");
			}
		} catch (error) {
			console.error("Erreur réseau suppression:", error);
		}
	};

	// Local update for book reading status
	const handleUpdateStatus = (bookId: string, newstatus: string) => {
		setLibrary((prev) => {
			return prev.map((item) =>
				item.bookId === bookId ? { ...item, status: newstatus } : item
			);
		});
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header showSearchBar={true} />
			<main className={`${Styles.mainLayout} flex flex-1 bg-blabla-light-cream`}>

				{/* Sidebar navigation */}
				<aside className={Styles.sidebar}>
					<h2 className={Styles.sidebarTitle}>Navigation</h2>
					<ul className={Styles["sidebar-menu-ul"]}>
						<li>
							<SimpleButton
								onClick={() => setActiveTab("Toute ma bibliothèque")}
								className={`py-5 w-full ${activeTab === "Toute ma bibliothèque" ? Styles["active"] : ""}`}
							>
								<BookCopy /> Toute ma bibliothèque
							</SimpleButton>
						</li>
						<li>
							<SimpleButton
								onClick={() => setActiveTab("A lire")}
								className={`pl-0 py-5 ${activeTab === "A lire" ? Styles["active"] : ""}`}
							>
								<BookHeart /> A lire
							</SimpleButton>
						</li>
						<li>
							<SimpleButton
								onClick={() => setActiveTab("En cours")}
								className={`pl-1 py-5 ${activeTab === "En cours" ? Styles["active"] : ""}`}
							>
								<BookMarked /> En cours
							</SimpleButton>
						</li>
						<li>
							<SimpleButton
								onClick={() => setActiveTab("Lu")}
								className={`pl-0 py-5 ${activeTab === "Lu" ? Styles["active"] : ""}`}
							>
								<CheckCheck /> Lu
							</SimpleButton>
						</li>
					</ul>
				</aside>

				{/* Main content and book listing */}
				<section className={Styles.content}>
					<p className={Styles.breadcrumb}>`Bibliothèque / {activeTab}`</p>

					<div className="flex justify-between items-center mb-10">
						<h1 className={Styles.title}>MA BIBLIOTHÈQUE</h1>
					</div>

					{/* Mobile filter navigation */}
					<div className={Styles.filter}>
						<button
							onClick={() => setActiveTab("Toute ma bibliothèque")}
							className={`${Styles.filterButton} ${activeTab === "all" || activeTab === "Toute ma bibliothèque" ? Styles.filterActive : ""}`}
						>
							Tous
						</button>
						<button
							onClick={() => setActiveTab("Lu")}
							className={`${Styles.filterButton} ${activeTab === "Lu" ? Styles.filterActive : ""}`}
						>
							Lu
						</button>
						<button
							onClick={() => setActiveTab("A lire")}
							className={`${Styles.filterButton} ${activeTab === "A lire" ? Styles.filterActive : ""}`}
						>
							À lire
						</button>
						<button
							onClick={() => setActiveTab("En cours")}
							className={`${Styles.filterButton} ${activeTab === "En cours" ? Styles.filterActive : ""}`}
						>
							En cours
						</button>
					</div>

					{/* Rendering list of books or empty states */}
					<div className="flex flex-col gap-6">
						{loading ? (
							<p className="text-gray-500 italic text-center">Chargement de vos livres...</p>
						) :
							library.length > 0 ? (
								filteredLibrary.map((item) => (
									<BookCardLibrary
										key={item.bookId}
										book={item.book}
										status={item.status}
										addedAt={item.createdAt}
										onUpdateStatus={(newStatus) => handleUpdateStatus(item.bookId, newStatus)}
										onDelete={() => handleDeleteBook(item.bookId)}
									/>
								))
							) : (
								<p className="text-gray-500 italic text-center">Votre bibliothèque est vide.</p>
							)}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}