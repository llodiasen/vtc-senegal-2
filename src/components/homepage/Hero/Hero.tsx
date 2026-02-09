/**
 * Hero Section
 * Section principale redesignée - Design épuré et moderne
 */

import styles from './Hero.module.css';
import BookingWidget from '../BookingWidget/BookingWidget';

export default function Hero() {
  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>allocab</div>
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>
              Commander
              <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className={styles.navLink}>
              Entreprise
              <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className={styles.navLink}>Pourquoi Allocab</a>
            <a href="#" className={styles.navLink}>Devenir chauffeur</a>
          </nav>
          <div className={styles.headerRight}>
            <div className={styles.langSelector}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1"/>
                <path d="M2 8h12M8 2c-1.5 2-1.5 4-1.5 6s0 4 1.5 6M8 2c1.5 2 1.5 4 1.5 6s0 4-1.5 6" stroke="currentColor" strokeWidth="1"/>
              </svg>
              <span>FR</span>
            </div>
            <a href="#" className={styles.headerLink}>Aide</a>
            <a href="#" className={styles.headerLink}>Connexion</a>
            <button className={styles.signUpButton}>S'inscrire</button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbContainer}>
          <span className={styles.breadcrumbItem}>Allocab</span>
          <span className={styles.breadcrumbSeparator}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className={styles.breadcrumbItem}>Commander VTC</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <h1 className={styles.title}>
              Réservez facilement vos{' '}
              <span className={styles.highlight}>trajets VTC</span>{' '}
              partout en France
            </h1>
            
            <p className={styles.description}>
              Gare, aéroport, rendez-vous client ou week-end en famille ? Réservez un VTC à l'avance : prix fixes, chauffeurs ponctuels et trajets garantis partout en France avec nos 10 000 chauffeurs.
            </p>
            
            <BookingWidget />
            
            {/* Avantages */}
            <div className={styles.advantages}>
              <div className={styles.advantageItem}>
                <div className={styles.advantageIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Chauffeur confirmé dès la commande</span>
              </div>
              
              <div className={styles.advantageItem}>
                <div className={styles.advantageIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 6V5.5H5.5V6H6ZM6 13H5.5V13.5H6V13ZM13 13V13.5H13.5V13H13ZM13 6H13.5V5.5H13V6ZM7 3.5H12V2.5H7V3.5ZM15.5 7V13H16.5V7H15.5ZM12 16.5H7V17.5H12V16.5ZM3.5 13V7H2.5V13H3.5ZM7 16.5C5.067 16.5 3.5 14.933 3.5 13H2.5C2.5 15.4853 4.51472 17.5 7 17.5V16.5ZM15.5 13C15.5 14.933 13.933 16.5 12 16.5V17.5C14.4853 17.5 16.5 15.4853 16.5 13H15.5ZM12 3.5C13.933 3.5 15.5 5.067 15.5 7H16.5C16.5 4.51472 14.4853 2.5 12 2.5V3.5ZM7 2.5C4.51472 2.5 2.5 4.51472 2.5 7H3.5C3.5 5.067 5.067 3.5 7 3.5V2.5ZM6.5 6V8H7.5V6H6.5ZM7 8.5H9V7.5H7V8.5ZM9.5 8V10H10.5V8H9.5ZM10 10.5H12V9.5H10V10.5ZM12.5 10V13H13.5V10H12.5ZM13 12.5H6V13.5H13V12.5ZM6.5 13V6H5.5V13H6.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <span>Tarif fixe jour & nuit garanti</span>
              </div>
              
              <div className={styles.advantageItem}>
                <div className={styles.advantageIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 8H17M7 2V6M13 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span>Réservation jusqu'à 1 an à l'avance</span>
              </div>
              
              <div className={styles.advantageItem}>
                <div className={styles.advantageIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17 10C17 6.13 13.87 3 10 3C6.13 3 3 6.13 3 10C3 13.87 6.13 17 10 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M17 14L14 17L17 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Replanification automatique si retard</span>
              </div>
              
              <div className={styles.advantageItem}>
                <div className={styles.advantageIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="4" y="8" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 8V6C7 4.34 8.34 3 10 3C11.66 3 13 4.34 13 6V8" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="10" cy="13" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <span>Paiement 100% sécurisé</span>
              </div>
              
              <div className={styles.advantageItem}>
                <div className={styles.advantageIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 9C11.1 9 12 8.1 12 7C12 5.9 11.1 5 10 5C8.9 5 8 5.9 8 7C8 8.1 8.9 9 10 9Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 18C13 15 16 12 16 9C16 5.7 13.3 3 10 3C6.7 3 4 5.7 4 9C4 12 7 15 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Présent partout en France</span>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.illustration}>
              <svg viewBox="0 0 600 600" className={styles.illustrationSvg}>
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.03" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                
                <circle cx="120" cy="120" r="100" fill="url(#grad1)" />
                <circle cx="480" cy="480" r="140" fill="url(#grad2)" />
                <rect x="380" y="80" width="180" height="180" rx="90" fill="url(#grad1)" opacity="0.4" />
                
                <g transform="translate(200, 320)">
                  <path d="M 30 50 L 70 15 L 170 15 L 210 50 L 210 85 L 30 85 Z" 
                        fill="#0a0a0a" stroke="none"/>
                  <path d="M 80 15 L 95 0 L 145 0 L 160 15 Z" 
                        fill="#1a1a1a" stroke="none"/>
                  <path d="M 85 20 L 95 8 L 115 8 L 115 48 L 85 48 Z" 
                        fill="#3b82f6" fillOpacity="0.15" stroke="#e5e5e5" strokeWidth="0.5"/>
                  <path d="M 125 20 L 145 8 L 145 48 L 125 48 Z" 
                        fill="#3b82f6" fillOpacity="0.15" stroke="#e5e5e5" strokeWidth="0.5"/>
                  <circle cx="70" cy="85" r="16" fill="#0a0a0a" stroke="#666" strokeWidth="1.5"/>
                  <circle cx="70" cy="85" r="8" fill="#e5e5e5"/>
                  <circle cx="170" cy="85" r="16" fill="#0a0a0a" stroke="#666" strokeWidth="1.5"/>
                  <circle cx="170" cy="85" r="8" fill="#e5e5e5"/>
                  <rect x="35" y="55" width="12" height="6" rx="1" fill="#ff6b35" fillOpacity="0.6"/>
                  <rect x="193" y="55" width="12" height="6" rx="1" fill="#ff6b35" fillOpacity="0.6"/>
                </g>
                
                <g transform="translate(340, 220)">
                  <circle cx="0" cy="0" r="24" fill="#fafafa" stroke="#1a1a1a" strokeWidth="1.2"/>
                  <circle cx="-7" cy="0" r="2" fill="#1a1a1a"/>
                  <circle cx="7" cy="0" r="2" fill="#1a1a1a"/>
                  <path d="M -7 6 Q 0 9 7 6" stroke="#1a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  <rect x="-18" y="28" width="36" height="75" rx="4" 
                        fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="1.2"/>
                  <rect x="-18" y="108" width="14" height="42" rx="3" fill="#1a1a1a"/>
                  <rect x="4" y="108" width="14" height="42" rx="3" fill="#1a1a1a"/>
                </g>
                
                <g transform="translate(430, 250)">
                  <circle cx="0" cy="0" r="19" fill="#fafafa" stroke="#1a1a1a" strokeWidth="1.2"/>
                  <circle cx="-6" cy="0" r="1.5" fill="#1a1a1a"/>
                  <circle cx="6" cy="0" r="1.5" fill="#1a1a1a"/>
                  <rect x="-15" y="22" width="30" height="56" rx="3" 
                        fill="#1e3a8a" fillOpacity="0.9" stroke="#1a1a1a" strokeWidth="1.2"/>
                  <rect x="15" y="26" width="7" height="30" rx="3" 
                        fill="#1e3a8a" fillOpacity="0.9" transform="rotate(-40 18.5 26)"/>
                  <rect x="-15" y="82" width="11" height="32" rx="2" fill="#1a1a1a"/>
                  <rect x="4" y="82" width="11" height="32" rx="2" fill="#1a1a1a"/>
                </g>
                
                <circle cx="180" cy="480" r="3" fill="#ff6b35" fillOpacity="0.3"/>
                <circle cx="460" cy="140" r="5" fill="#1e3a8a" fillOpacity="0.25"/>
                <circle cx="520" cy="360" r="4" fill="#ff6b35" fillOpacity="0.3"/>
                <path d="M 50 550 Q 200 500 350 520 T 550 480" 
                      stroke="#e5e5e5" strokeWidth="1" fill="none" opacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
