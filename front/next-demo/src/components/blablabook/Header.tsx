"use client";

import Link from "next/link";
import header from "./Header.module.css"
import SearchBar from "./SearchBar";
import Image from "next/image";
import { OrangeOutlineButton, OrangeSolidButton } from "./buttons";


export default function Header({ showSearchBar = false, showLinks = false } : { showSearchBar?: boolean, showLinks?: boolean }) {
  return (
		<header className={header.header}>
			<div className={header.container}>
				<div className={header.logo}>
					<Link href="/accueil">
						<Image
							src="/logo/logo01.PNG"
							alt="Logo BlaBlaBook"
							width={100}
							height={40}
						/>
					</Link>
				</div>
				<div className={header.searchBarContainer}>
					{showSearchBar && <SearchBar />}
				</div>
				<nav className={header.nav}>
					<ul className={header.navList}>
						{showLinks && (
							<>
								<li>
									<Link href="/">Accueil</Link>
								</li>
								<li>
									<Link href="/bibliotheque">Bibliothèque</Link>
								</li>
							</>
						)}
						<li>
							<Link href="#">Catalogue</Link>
						</li>
						<li>
							<OrangeSolidButton
								onClick={() => (window.location.href = "/login")}
							>
								Connexion
							</OrangeSolidButton>
						</li>
						<li>
							<OrangeOutlineButton
								onClick={() => (window.location.href = "/inscription")}
							>
								Inscription
							</OrangeOutlineButton>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}   