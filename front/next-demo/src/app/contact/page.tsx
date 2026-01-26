'use client';   

import Styles from './contact.module.css';
import Header from '@/components/blablabook/Header';
import Footer from '@/components/blablabook/footer';

export default function ContactPage() {
  return (
    <>
      <Header showSearchBar={false} user={null} />
      <div className={Styles.container}>    
        <div className={Styles.contactWrapper}>
            <div className={Styles.contactInfo}>
                <h2>Contactez-nous</h2>
                <p>Une question, un projet ou besoin d'un devis ? Notre équipe vous répond rapidement.</p>

                <div className={Styles.infoItem}>
                    <strong>📍 Adresse</strong>
                    10 Rue Exemple, Paris
                </div>

                <div className={Styles.infoItem}>
                    <strong>📞 Téléphone</strong>
                    +33 1 23 45 67 89
                </div>

                <div className={Styles.infoItem}>
                    <strong>✉ Email</strong>
                    contact@blablabook.fr
                </div>
            </div>

       
            <div className={Styles.contactForm}>
                <h2>Envoyer un message</h2>
                <form>
                    <div className={Styles.formGroup}>
                        <label htmlFor="name">Nom complet</label>
                        <input type="text" id="name" name="name" placeholder="Votre nom" required />
                    </div>

                    <div className={Styles.formGroup}>
                        <label htmlFor="email">Adresse email</label>
                        <input type="email" id="email" name="email" placeholder="votre@email.com" required />
                    </div>

                    <div className={Styles.formGroup}>
                        <label htmlFor="subject">Sujet</label>
                        <input type="text" id="subject" name="subject" placeholder="Objet du message" required />
                    </div>

                    <div className={Styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="Écrivez votre message..." required></textarea>
                    </div>

                    <button type="submit" className={Styles.button}>Envoyer</button>
                </form>
            </div>

        </div>
    </div>
        <Footer />  
    </>
    );
}
        