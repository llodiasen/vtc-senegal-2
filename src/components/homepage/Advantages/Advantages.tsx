/**
 * Advantages Component
 * Section mettant en avant les avantages du service VTC
 */

import styles from './Advantages.module.css';

const advantages = [
  {
    id: 1,
    title: 'Chauffeurs professionnels',
    description: 'Tous nos chauffeurs sont formés, expérimentés et parfaitement courtois',
    icon: '👔'
  },
  {
    id: 2,
    title: 'Tarifs transparents',
    description: 'Prix fixes connus à l\'avance, sans mauvaise surprise ni frais cachés',
    icon: '💰'
  },
  {
    id: 3,
    title: 'Disponible 24h/24',
    description: 'Service disponible à toute heure, tous les jours de l\'année',
    icon: '🕐'
  },
  {
    id: 4,
    title: 'Sécurité garantie',
    description: 'Véhicules récents et entretenus, assurance tous risques incluse',
    icon: '🛡️'
  }
];

export default function Advantages() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Pourquoi nous choisir ?</h2>
        <p className={styles.subtitle}>Un service premium à votre service</p>
        
        <div className={styles.advantagesGrid}>
          {advantages.map((advantage) => (
            <div key={advantage.id} className={styles.advantageCard}>
              <div className={styles.iconCircle}>
                <span className={styles.icon}>{advantage.icon}</span>
              </div>
              <h3 className={styles.advantageTitle}>{advantage.title}</h3>
              <p className={styles.advantageDescription}>{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
