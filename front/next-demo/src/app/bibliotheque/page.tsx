'use client';

// Import of page components
import Footer from "@/components/blablabook/footer";
import Header from "@/components/blablabook/Header";
import Styles from "./library.module.css"
import { OrangeOutlineButton, SimpleButton } from "@/components/blablabook/buttons";


// interface iBook {
//   title: string;
//   bookId: string;
//   releaseDate: null;
//   isbn: null;
//   summary: null;
//   authorId: string;
//   createdAt: string;
//   updatedAt: string;
// }

export default function libraryPage() {

  return (
		<div className="flex flex-col min-h-screen">
			<Header showSearchBar={true} />
			<main className="flex flex-1 bg-blabla-light-cream gap-20 p-20">
				{/* <!-- SIDEBAR --> */}
				<aside className={Styles.sidebar}>
					<h2 className={Styles.sidebarTitle}>Navigation</h2>
					<ul className={Styles["sidebar-menu-ul"]}>
						<li>
							<OrangeOutlineButton className="py-5">
								📕 Toute ma bibliothèque
							</OrangeOutlineButton>
						</li>
						<li>
							🤍 <SimpleButton className=" pl-0 py-5">Favoris</SimpleButton>
						</li>
						<li>
							📖<SimpleButton className=" pl-1 py-5"> En cours</SimpleButton>
						</li>
						<li>
							✔️ <SimpleButton className=" pl-0 py-5"> Lus</SimpleButton>
						</li>
					</ul>
				</aside>
				{/* <!-- CONTENT --> */}
				<section className={Styles.content}>
					<p className={Styles.breadcrumb}>Bibliothèque / Tous les livres</p>
					<div className="flex justify-between items-center mb-10">
						<h1 className={Styles.title}>MA BIBLIOTHÈQUE</h1>
						{/* <!-- FILTER --> */}
						<div className={Styles.filter}>
							<button
								className={`${Styles.filterActive} ${Styles.filterButton}`}
							>
								Tous
							</button>
							<button className={Styles.filterButton}>Lus</button>
							<button className={Styles.filterButton}>À lire</button>
						</div>
					</div>
					{/* <!-- BOOK CARD --> */}
					{/* <!-- BOOK CARD --> */}
				</section>
			</main>
			<Footer />
		</div>
	);

}