import Link from "next/link";
import header from "./Header.module.css"

export default function Header() {
  return (
    <header className={header.header}>
      <div className={header.container}>
        <div className={header.logo}>
          <span className={header.star}>✦</span>
          <span>BlaBla</span>
          <span className={header.orange}>Book</span>
        </div>
        <nav className={header.nav}>
          <ul className={header.navList}>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/bibliotheque">Bibliothèque</Link></li>
            <li><Link href="/login" className={header.loginButton}>Se connecter</Link></li>
          </ul>
        </nav>
      </div>
    </header>           
  );
}   