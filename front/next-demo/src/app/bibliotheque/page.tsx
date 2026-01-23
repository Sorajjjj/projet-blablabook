'use client';

import { useState, useEffect } from "react";
import Footer from "@/components/blablabook/footer";
import Header from "@/components/blablabook/Header";
import Styles from "./library.module.css";
import { OrangeOutlineButton, SimpleButton } from "@/components/blablabook/buttons";
import BookCardLibrary from "@/components/blablabook/book-card-library";

export default function LibraryPage() {
	
	// stocke le tableau de livres reçus de l'API (initialement vide [])
	const [library, setLibrary] = useState<any[]>([]);
	// affiche un message d'attente pendant que l'API répond (initialement vrai)
	const [loading, setLoading] = useState(true);

	
const fetchLibrary = async () => {
    try {
        
        const response = await fetch("http://localhost:4000/api/libraries", {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        
        // On vérifie que result.data contient bien nos livres
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

	
	const handleDeleteBook = async (bookId: string) => {
		//TODO MODIFIER et rajouter un composant
		if (!confirm("Voulez-vous vraiment retirer ce livre ?")) return;

		try {
			const response = await fetch(`http://localhost:4000/api/libraries/${bookId}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (response.ok) {
				// On filtre le tableau localement pour retirer le livre supprimé sans recharger la page
				setLibrary((prev) => prev.filter((item) => item.bookId !== bookId));
			} else {
				alert("Erreur lors de la suppression sur le serveur");
			}
		} catch (error) {
			console.error("Erreur réseau suppression:", error);
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header showSearchBar={true} />
			<main className="flex flex-1 bg-blabla-light-cream gap-20 p-20">
				{/* BARRE LATÉRALE DE NAVIGATION */}
				<aside className={Styles.sidebar}>
					<h2 className={Styles.sidebarTitle}>Navigation</h2>
					<ul className={Styles["sidebar-menu-ul"]}>
						<li>
							<OrangeOutlineButton className="py-5 w-full">
								📕 Toute ma bibliothèque
							</OrangeOutlineButton>
						</li>
						<li><SimpleButton className="pl-0 py-5">🤍 Favoris</SimpleButton></li>
						<li><SimpleButton className="pl-1 py-5">📖 En cours</SimpleButton></li>
						<li><SimpleButton className="pl-0 py-5">✔️ Lus</SimpleButton></li>
					</ul>
				</aside>

				{/* SECTION PRINCIPALE (CONTENU) */}
				<section className={Styles.content}>
					<p className={Styles.breadcrumb}>Bibliothèque / Tous les livres</p>
					
					<div className="flex justify-between items-center mb-10">
						<h1 className={Styles.title}>MA BIBLIOTHÈQUE</h1>
						{/* FILTRES (Affichage uniquement pour l'instant) */}
						<div className={Styles.filter}>
							<button className={`${Styles.filterActive} ${Styles.filterButton}`}>Tous</button>
							<button className={Styles.filterButton}>Lus</button>
							<button className={Styles.filterButton}>À lire</button>
						</div>
					</div>

					{/* ZONE DES CARTES DE LIVRES */}
					<div className="flex flex-col gap-6">
						{loading ? (
							<p className="text-gray-500 italic text-center">Chargement de vos livres...</p>
						) : 
						
						library.length > 0 ? (
							
							library.map((item) => (
								<BookCardLibrary 
									key={item.bookId}
									book={item.book} 
									status={item.status} 
									addedAt={item.createdAt} 
									
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