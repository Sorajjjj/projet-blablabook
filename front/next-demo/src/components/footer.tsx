import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.grid}>
          {/* Logo + description */}
          <div>
            <div className={styles.logo}>
              <span className={styles.star}>✦</span>
              <span>BlaBla</span>
              <span className={styles.orange}>Book</span>
            </div>
            <p className={styles.description}>
              Notre mission est de connecter les lecteurs du monde entier,
              s’échanger et rapprocher les passionnés de lecture.
            </p>
          </div>

          {/* Liens */}
          <div>
            <h3 className={styles.title}>Lien</h3>
            <ul className={styles.list}>
              <li><Link href="/">Accueil</Link></li>
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
        © 2026 BlaBlaBook. All rights reserved
      </div>
    </footer>
  );
}
