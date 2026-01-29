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
	user: initialUser = null
}: {
	showSearchBar?: boolean;
	showLinks?: boolean;
	user?: any;
}) {
	const router = useRouter();
	const { user, logout, isHydrated } = useAuth();
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
				{/* --- LOGO --- */}
				<div className={header.logo}>
					<Link href="/accueil" onClick={closeMobileMenu}>
						<Image
							src="/logo/logo01.PNG"
							alt="Logo"
							width={100}
							height={40}
							priority
						/>
					</Link>
				</div>

				{/* --- SEARCH BAR (DESKTOP) --- */}
				<div className={header.searchBarContainer}>
					{showSearchBar && <SearchBar />}
				</div>

				{/* --- DESKTOP NAVIGATION (Medium screens and up) --- */}
				<div className="hidden md:flex items-center gap-6">
					<nav className={header.nav}>
						<ul className={header.navList}>
							{/* ACCUEIL: Only show if showLinks is true AND user is NOT logged in.
								If logged in, 'Accueil' is inside the Avatar Dropdown. 
							*/}
							{isHydrated && !isAuthenticated && showLinks && (
								<li>
									<Link href="/accueil">Accueil</Link>
								</li>
							)}

							{/* CATALOGUE: Always visible on desktop */}
							<li>
								<Link href="/catalogue">Catalogue</Link>
							</li>
						</ul>
					</nav>

					{/* User Actions (Desktop) */}
					<div className="flex items-center gap-3">
						{/* Wait for hydration to avoid HTML mismatch errors */}
						{isHydrated ? (
							isAuthenticated ? (
								// Connected: Show Avatar (UserMenu)
								<UserMenu user={user} onLogout={handleLogout} />
							) : (
								// Guest: Show Login/Register buttons
								<>
									<OrangeSolidButton onClick={() => router.push("/login")}>
										Connexion
									</OrangeSolidButton>
									<OrangeOutlineButton
										onClick={() => router.push("/inscription")}
									>
										Inscription
									</OrangeOutlineButton>
								</>
							)
						) : (
							// Placeholder while hydrating to maintain layout stability
							<div className="w-20" />
						)}
					</div>
				</div>

				{/* --- MOBILE ACTIONS (Small screens) --- */}
				<div className="md:hidden flex items-center gap-4">
					{isHydrated ? (
						isAuthenticated ? (
							// CASE 1: LOGGED IN -> Show Avatar (UserMenu)
							<UserMenu user={user} onLogout={handleLogout} isMobile={true} />
						) : (
							// CASE 2: USER IS GUEST -> Show Burger Menu button
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
								aria-label="Toggle menu"
							>
								{isMobileMenuOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</button>
						)
					) : (
						<div className="w-10 h-10" />
					)}
				</div>
			</div>

			{/* ============================== */}
			{/* MOBILE MENU OVERLAY (GUEST ONLY) */}
			{/* ============================== */}
			{isHydrated && !isAuthenticated && isMobileMenuOpen && (
				<div className={header.mobileMenu}>
					<div className={header.mobileNav}>
						{/* Header (Logo + Close) */}
						<div className="flex justify-between items-center px-4 pb-4 border-b border-gray-100 mb-4">
							<div className={header.logo}>
								<Image
									src="/logo/logo01.PNG"
									alt="Logo"
									width={100}
									height={40}
								/>
							</div>
							<button onClick={closeMobileMenu} aria-label="Close menu">
								<X className="w-6 h-6 text-gray-700" />
							</button>
						</div>

						{/* Mobile SearchBar */}
						{showSearchBar && (
							<div className={header.mobileSearchBar}>
								<SearchBar />
							</div>
						)}

						{/* Guest Navigation Links */}
						<div className="flex flex-col px-4 gap-4 mt-2">
							{showLinks && (
								<Link
									href="/accueil"
									onClick={closeMobileMenu}
									className={header.mobileNavLink}
								>
									Accueil
								</Link>
							)}
							<Link
								href="/catalogue"
								onClick={closeMobileMenu}
								className={header.mobileNavLink}
							>
								Catalogue
							</Link>
						</div>

						{/* Guest Auth Buttons */}
						<div className="flex flex-col gap-3 mt-6 px-4 border-t border-gray-100 pt-6">
							<OrangeSolidButton
								onClick={() => {
									closeMobileMenu();
									router.push("/login");
								}}
								className="w-full justify-center"
							>
								Connexion
							</OrangeSolidButton>
							<OrangeOutlineButton
								onClick={() => {
									closeMobileMenu();
									router.push("/inscription");
								}}
								className="w-full justify-center"
							>
								Inscription
							</OrangeOutlineButton>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
