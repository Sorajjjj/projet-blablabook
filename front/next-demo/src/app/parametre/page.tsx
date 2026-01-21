'use client';
import styles from './parametre.module.css';
import Header from '@/components/Header';
import Footer from '@/components/footer';

export default function ParametrePage() {
    return (
        <div className={styles.pageContainer}>
            <Header />
            <br />
            <br />
            <div className={styles.container}>
        <header>
            <p className={styles.breadcrumb}>Comptes / Paramètres</p>
            <h1 className={styles.pageTitle}>MES PARAMETRES</h1>
        </header>

        <section className={styles.settingsCard}>
            <h2>Bibliothèque Personnelle</h2>
            <div className={styles.row}>
                <div className={styles.labelCol}>
                    <strong>Profil</strong>
                    <p>Modifiez votre identifiant</p>
                </div>
                <div className={styles.inputCol}>
                    <label className={styles.label}>Nouvel Identifiant</label>
                    <div className={styles.inputGroup}>
                        <input className={styles.input} type="text" />
                        <button className={styles.btnOrange}>Valider</button>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.labelCol}>
                    <strong>Thème</strong>
                    <p>Personnalisez votre interface</p>
                </div>
                <div className={styles.inputCol}>
                    <div className={styles.toggleGroup}>
                        <button className={styles.toggleBtn}>Clair</button>
                        <button className={`${styles.toggleBtn} ${styles.active}`}>Sombre</button>
                    </div>
                </div>
            </div>
        </section>

        <section className={styles.settingsCard}>
            <h2>Sécurité et Confidentialité</h2>
            <div className={styles.row}>
                <div className={styles.labelCol}>
                    <strong>Contact</strong>
                    <p>Modifiez votre adresse e-mail</p>
                </div>
                <div className={styles.inputCol}>
                    <label className={styles.label}>Nouvelle adresse e-mail</label>
                    <input className={styles.input} type="email" />
                    <label className={styles.label}>Confirmez votre nouvelle adresse e-mail</label>
                    <input className={styles.input} type="email" />
                    <button className={`${styles.btnOrange} ${styles.rightAlign}`}>Valider</button>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.labelCol}>
                    <strong>Sécurité</strong>
                    <p>Modifiez votre mot de passe</p>
                </div>
                <div className={styles.inputCol}>
                    <label className={styles.label}>Nouveau mot de passe</label>
                    <input className={styles.input} type="password" />
                    <label className={styles.label}>Confirmez votre nouveau mot de passe</label>
                    <input className={styles.input} type="password" />
                    <button className={`${styles.btnOrange} ${styles.rightAlign}`}>Valider</button>
                </div>
            </div>
        </section>

        <section className={styles.settingsCard}>
            <h2>Gestion de compte</h2>
            <div className={styles.row}>
                <div className={styles.labelCol}>
                    <strong>Paramètres du compte</strong>
                    <p>Supprimez votre compte</p>
                </div>
                <div className={styles.inputCol}>
                    <button className={styles.btnLargeOrange}>Supprimer définitivement</button>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.labelCol}>
                    <p>Désactivez votre compte</p>
                </div>
                <div className={styles.inputCol}>
                    <button className={styles.btnLargeOrange}>Désactiver temporairement</button>
                </div>  
            </div>
        </section>
    </div>
    <br />
    <br />
            <Footer />
        </div>
    );
}   