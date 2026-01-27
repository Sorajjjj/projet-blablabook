"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import header from "./Header.module.css";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { OrangeOutlineButton, OrangeSolidButton } from "./buttons";
import UserMenu from "./user-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header({
	showSearchBar = false,
	showLinks = false,
}: {
	showSearchBar?: boolean;
	showLinks?: boolean;
}) {
	const router = useRouter();
	const { user, logout } = useAuth();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const isAuthenticated = user !== null;

	const handleLogout = async () => {
		await logout();
		setIsMobileMenuOpen(false);
		router.push("/login");
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<header className={header.header}>
			<div className={header.container}>
				{/* Logo */}
				<div className={header.logo}>
					<Link href="/accueil" onClick={closeMobileMenu}>
						<Image src="/logo/logo01.PNG" alt="Logo" width={100} height={40} />
					</Link>
				</div>

				{/* SearchBar Desktop */}
				<div className={header.searchBarContainer}>
					{showSearchBar && <SearchBar />}
				</div>

				{/* Navigation Desktop */}
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
							<Link href="/catalogue">Catalogue</Link>
						</li>

						{isAuthenticated ? (
							<li>
								<UserMenu user={user} onLogout={handleLogout} />
							</li>
						) : (
							<>
								<li>
									<OrangeSolidButton onClick={() => router.push("/login")}>
										Connexion
									</OrangeSolidButton>
								</li>
								<li>
									<OrangeOutlineButton
										onClick={() => router.push("/inscription")}
									>
										Inscription
									</OrangeOutlineButton>
								</li>
							</>
						)}
					</ul>
				</nav>

				{/* Menu Burger Mobile */}
				<div className={header.mobileMenuButton}>
					{isAuthenticated ? (
						<UserMenu user={user} onLogout={handleLogout} isMobile={true} />
					) : (
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							aria-label="Menu"
						>
							{isMobileMenuOpen ? (
								<X className="w-6 h-6 text-gray-700" />
							) : (
								<Menu className="w-6 h-6 text-gray-700" />
							)}
						</button>
					)}
				</div>
			</div>

			{/* Menu Mobile Overlay - Seulement si non authentifié */}
			{isMobileMenuOpen && (
				<div className={header.mobileMenu}>
					<nav className={header.mobileNav}>
						{/* --- NOUVEAU BLOC A AJOUTER ICI --- */}
						{/* En-tête interne au menu pour pouvoir le fermer */}
						<div className={header.mobileHeaderRow}>
							{/* On rappelle le logo pour garder l'identité visuelle */}
							<div className={header.logo}>
								<Image
									src="/logo/logo01.PNG"
									alt="Logo"
									width={100}
									height={40}
								/>
							</div>

							{/* Le bouton Croix qui fonctionne car il est DANS le menu */}
							<button onClick={closeMobileMenu}>
								<X className="w-6 h-6 text-gray-700" />
							</button>
						</div>
						{/* SearchBar Mobile */}
						{showSearchBar && (
							<div className={header.mobileSearchBar}>
								<SearchBar />
							</div>
						)}

						{showLinks && (
							<>
								<Link
									href="/"
									onClick={closeMobileMenu}
									className={header.mobileNavLink}
								>
									Accueil
								</Link>
								<Link
									href="/bibliotheque"
									onClick={closeMobileMenu}
									className={header.mobileNavLink}
								>
									Bibliothèque
								</Link>
							</>
						)}
						<Link
							href="/catalogue"
							onClick={closeMobileMenu}
							className={header.mobileNavLink}
						>
							Catalogue
						</Link>

						<div className="flex flex-col gap-3 mt-4 px-4">
							<OrangeSolidButton
								onClick={() => {
									closeMobileMenu();
									router.push("/login");
								}}
								className="w-full"
							>
								Connexion
							</OrangeSolidButton>
							<OrangeOutlineButton
								onClick={() => {
									closeMobileMenu();
									router.push("/inscription");
								}}
								className="w-full"
							>
								Inscription
							</OrangeOutlineButton>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
