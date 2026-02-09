/**
 * HowItWorks Component
 * Section expliquant le processus de réservation en 3 étapes simples
 */

import styles from './HowItWorks.module.css';

const steps = [
  {
    id: 1,
    title: 'Réservez en ligne',
    description: 'Indiquez votre point de départ et votre destination en quelques clics',
    icon: '📱'
  },
  {
    id: 2,
    title: 'Confirmez votre trajet',
    description: 'Choisissez votre véhicule et validez votre réservation instantanément',
    icon: '✓'
  },
  {
    id: 3,
    title: 'Montez à bord',
    description: 'Votre chauffeur vous attend à l\'heure convenue pour un trajet confortable',
    icon: '🚗'
  }
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Comment ça marche ?</h2>
        <p className={styles.subtitle}>Réservez votre trajet en 3 étapes simples</p>
        
        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.id} className={styles.stepCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.stepNumber}>{step.id}</span>
                <span className={styles.icon}>{step.icon}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
