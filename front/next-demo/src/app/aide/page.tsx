import Header from "@/components/blablabook/Header";
import Footer from "@/components/blablabook/footer";
import styles from "./aide.module.css";

export default function AidePage() {    
    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.h1}>Questions <span>Fréquentes</span></h1>

                <div className={styles.faqItem}>
                    <details>
                        <summary>Comment puis-je suivre ma commande ?</summary>
                        <div className={styles.content}>
                            Une fois votre commande expédiée, vous recevrez un email contenant un lien de suivi. Vous pouvez également consulter l'onglet "Mes Commandes" dans votre espace client.
                        </div>
                    </details>
                </div>

                <div className={styles.faqItem}>
                    <details>
                        <summary>Quels sont les délais de livraison ?</summary>
                        <div className={styles.content}>
                            Pour la France métropolitaine, comptez 3 à 5 jours ouvrés. Pour les ebooks, la livraison est instantanée dans votre bibliothèque numérique après validation du paiement.
                        </div>
                    </details>
                </div>

                <div className={styles.faqItem}>
                    <details>
                        <summary>Puis-je retourner un livre papier ?</summary>
                        <div className={styles.content}>
                            Oui, vous disposez de 14 jours après réception pour nous retourner un livre s'il est dans son état neuf. Les frais de retour sont à votre charge, sauf en cas de produit défectueux.
                        </div>
                    </details>
                </div>

                <div className={styles.faqItem}>
                    <details>
                        <summary>Sous quel format sont vos ebooks ?</summary>
                        <div className={styles.content}>
                            Nos ebooks sont principalement disponibles au format <strong>EPUB</strong> et <strong>PDF</strong>. Ils sont compatibles avec la majorité des liseuses (Kindle, Kobo, Vivlio) et tablettes.
                        </div>
                    </details>
                </div>

                <div className={styles.faqItem}>
                    <details>
                        <summary>Proposez-vous des cartes cadeaux ?</summary>
                        <div className={styles.content}>
                            Absolument ! Nos cartes cadeaux vont de 10€ à 100€ et sont valables un an sur l'ensemble du catalogue.
                        </div>
                    </details>
                </div>

                <div className={styles.contactHint}>
                    <p>Vous n'avez pas trouvé votre réponse ? <a href="/contact">Contactez notre service client</a></p>
                </div>
            </div>
            <Footer />

                    
        </>
    );
}   