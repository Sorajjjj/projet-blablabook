"use client";

// Import of page components
import Footer from "@/components/footer";
import Header from "@/components/Header";
import Styles from "./details.module.css";
import Image from "next/image";
import { TealRoundedButton } from "@/components/blablabook/buttons";


export default function libraryPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header showSearchBar={false} />
			<main className="flex-1 container mx-auto p-8">
				<p className={Styles["breadcrumb"]}>
					Bibliothèque / détails d’un livre
				</p>
				{/* BOOK CARD */}
				<section className={Styles["book-card"]}>
					<Image
						src="/couverture-livre-test.png"
						alt="Couverture du livre"
						width={200}
						height={260}
					/>
					<div className={Styles["book-info"]}>
						<div className={Styles["title-row"]}>
							<h1>SECRETS DES FLEURS</h1>
							<span className={Styles["heart"]}>❤️</span>
						</div>
						<p className={Styles["author"]}>Madeline Miller</p>
						<div className={Styles["rating"]}>
							⭐⭐⭐⭐☆ <span>4.0 / 5</span>
						</div>
						<div className="actions">
							<TealRoundedButton>Marquer comme lu</TealRoundedButton>
							<span className={Styles["added"]}>Ajouté hier</span>
						</div>
					</div>
				</section>
				{/* DESCRIPTION */}
				<section className={Styles["description"]}>
					<h2>Description du livre</h2>
					<p>
						Le Chant d’Achille de Madeline Miller revisite la mythologie grecque
						à travers l’histoire d’Achille et Patrocle. De leur rencontre dans
						l’enfance à leur destin tragique pendant la guerre de Troie, le
						roman raconte une amitié profonde qui se transforme en amour
						puissant et bouleversant. Entre héros, dieux capricieux et batailles
						épiques, ce récit met surtout en lumière les émotions, la loyauté et
						les sacrifices que l’on est prêt à faire par amour.
					</p>
				</section>
			</main>
			<Footer />
		</div>
	);
}
