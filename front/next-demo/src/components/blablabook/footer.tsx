import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";

interface FooterProps {
	className?: string;
	style?: React.CSSProperties;
}

export default function Footer({ className, style }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={`${styles.footer} ${className}`} style={style}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo + description */}
          <div>
            <div className={styles.logo}>
              <span className={styles.star}>✦</span>
              <Image src="/logo/logo02.PNG" alt="Logo BlaBlaBook" width={150} height={30} />
            </div>
            <p className={styles.description}>
              Notre mission est de connecter les lecteurs du monde entier,
              échanger et rapprocher les passionnés de lecture.
            </p>
          </div>
          {/* Liens */}
          <div>
            <h3 className={styles.title}>Lien</h3>
            <ul className={styles.list}>
              <li><Link href="/accueil">Accueil</Link></li>
              <li><Link href="/catalogue">Catalogue</Link></li>
              <li><Link href="/bibliotheque">Bibliothèque</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className={styles.title}>Support</h3>
            <ul className={styles.list}>
              <li><Link href="/aide">Centre d’aide</Link></li>
              <li><Link href="/politique-confidentialite">Politique de confidentialité</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        © {currentYear} BlaBlaBook. All rights reserved
      </div>
    </footer>
  );
}
