"use client";
import { useAuth } from "@/context/AuthContext"; // Import the custom hook for Auth
import { useRouter } from "next/navigation";
import Link from "next/link";
import header from "./Header.module.css";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { OrangeOutlineButton, OrangeSolidButton } from "./buttons";
import UserMenu from "./user-menu";


export default function Header({ 
  showSearchBar = false, 
  showLinks = false 
}: { 
  showSearchBar?: boolean, 
  showLinks?: boolean 
}) {
  const router = useRouter();

  // We use the global Auth context to get user state and logout function
  const { user, logout } = useAuth();

  // If user is not null, they are authenticated
  const isAuthenticated = user !== null;

  // Handle logout using the global context function
  const handleLogout = async () => {
    await logout(); // This clears the state AND the localStorage
    router.push("/login"); // Redirect to login page
  };

  console.log("Header User state", user);

  return (
    <header className={header.header}>
      <div className={header.container}>
        <div className={header.logo}>
          <Link href="/accueil">
            <Image src="/logo/logo01.PNG" alt="Logo" width={100} height={40} />
          </Link>
        </div>

        <div className={header.searchBarContainer}>
          {showSearchBar && <SearchBar />}
        </div>

        <nav className={header.nav}>
          <ul className={header.navList}>
            {showLinks && (
              <>
                <li><Link href="/">Accueil</Link></li>
                <li><Link href="/bibliotheque">Bibliothèque</Link></li>
              </>
            )}
            <li><Link href="#">Catalogue</Link></li>
            
            {/* Conditional rendering based on global Auth State */}
            {isAuthenticated ? (
              <li>
                {/* We pass the global user and our local handleLogout */}
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
                  <OrangeOutlineButton onClick={() => router.push("/inscription")}>
                    Inscription
                  </OrangeOutlineButton>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}