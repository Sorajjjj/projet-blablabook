import Link from "next/link";
import header from "./Header.module.css"
import SearchBar from "./SearchBar";
import Image from "next/image";
import { OrangeOutlineButton, OrangeSolidButton } from "./blablabook/buttons";


export default function Header({ showSearchBar = false } : { showSearchBar?: boolean }) {
  return (
    <header className={header.header}>
      <div className={header.container}>
        <div className={header.logo}>
          <Image src="/logo/logo01.PNG" alt="Logo BlaBlaBook" width={70} height={30} />
        </div>
        <div className={header.searchBarContainer}>
          {showSearchBar && <SearchBar />}
          </div>
        <nav className={header.nav}>
          <ul className={header.navList}>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/bibliotheque">Bibliothèque</Link></li>
            <li><OrangeSolidButton>Connexion</OrangeSolidButton></li>
            <li><OrangeOutlineButton>Inscription</OrangeOutlineButton></li>
          </ul>
        </nav>
      </div>
    </header>           
  );
}   