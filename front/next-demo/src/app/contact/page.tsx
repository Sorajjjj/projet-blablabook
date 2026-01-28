'use client';   

import Styles from './contact.module.css';
import Header from '@/components/blablabook/Header';
import Footer from '@/components/blablabook/footer';

export default function ContactPage() {
  return (
    <>
      <Header   />
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

       
           

        </div>
    </div>
        <Footer />  
    </>
    );
}
        