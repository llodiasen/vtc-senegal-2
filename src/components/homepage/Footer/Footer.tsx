/**
 * Footer Component
 * Pied de page avec informations de contact et liens utiles
 */

import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Colonne 1 - À propos */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>VTC Premium</h3>
            <p className={styles.columnText}>
              Votre service de chauffeur privé disponible 24h/24 partout en France. 
              Confort, ponctualité et professionnalisme garantis.
            </p>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Liens rapides</h4>
            <ul className={styles.linkList}>
              <li><a href="#reservation" className={styles.link}>Réserver</a></li>
              <li><a href="#fleet" className={styles.link}>Notre flotte</a></li>
              <li><a href="#tarifs" className={styles.link}>Tarifs</a></li>
              <li><a href="#faq" className={styles.link}>FAQ</a></li>
            </ul>
          </div>

          {/* Colonne 3 - Services */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Services</h4>
            <ul className={styles.linkList}>
              <li><a href="#airport" className={styles.link}>Transfert aéroport</a></li>
              <li><a href="#business" className={styles.link}>Déplacements pro</a></li>
              <li><a href="#events" className={styles.link}>Événements</a></li>
              <li><a href="#longue-distance" className={styles.link}>Longue distance</a></li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+33123456789" className={styles.link}>01 23 45 67 89</a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <a href="mailto:contact@vtc.fr" className={styles.link}>contact@vtc.fr</a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span className={styles.contactText}>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} VTC Premium. Tous droits réservés.
          </p>
          <div className={styles.legalLinks}>
            <a href="#mentions-legales" className={styles.legalLink}>Mentions légales</a>
            <span className={styles.separator}>•</span>
            <a href="#cgv" className={styles.legalLink}>CGV</a>
            <span className={styles.separator}>•</span>
            <a href="#confidentialite" className={styles.legalLink}>Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
