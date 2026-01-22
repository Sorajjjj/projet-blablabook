"use client";
import Link from "next/link";
import header from "./Header.module.css";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { OrangeOutlineButton, OrangeSolidButton } from "./buttons";
import UserMenu from "./user-menu";
import { useRouter } from "next/navigation";

export default function Header({ 
  showSearchBar = false, 
  showLinks = false,
  user = null,
  // onLogout // Logout function passed as a prop
} : { 
  showSearchBar?: boolean, 
  showLinks?: boolean,
  user?: { name: string; email: string } | null,
  // onLogout: () => void // Function to handle logout
}) {

  const router = useRouter();

  // Determine if the user is authenticated
  const isAuthenticated = user !== null;

  // Handle logout action
  // const handleLogout = () => {
  //   console.log("Deconnexion");
  //   // Call the onLogout prop function if provided
  //   if (onLogout) {
  //     onLogout();
  //   }
  // };

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
            
            {isAuthenticated ? (
              <li>
                <UserMenu user={user}  />
              </li>
            ) : (
              <>
                <li>
                  <OrangeSolidButton
                    onClick={() => router.push("/login")}
                  >
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
      </div>
    </header>
  );
}