/**
 * Fleet Component
 * Section affichant la flotte de véhicules disponibles
 * Données mockées pour démonstration
 */

import styles from './Fleet.module.css';
import VehicleCard from './VehicleCard';

// Données mockées des véhicules
const vehicles = [
  {
    id: 1,
    name: 'Berline Standard',
    type: 'Eco',
    capacity: 3,
    luggage: 2,
    description: 'Confort et économie pour vos trajets quotidiens',
    priceIndicator: '€€'
  },
  {
    id: 2,
    name: 'Berline Premium',
    type: 'Confort',
    capacity: 3,
    luggage: 3,
    description: 'Véhicule haut de gamme pour un confort optimal',
    priceIndicator: '€€€'
  },
  {
    id: 3,
    name: 'Van 6 places',
    type: 'Groupe',
    capacity: 6,
    luggage: 6,
    description: 'Idéal pour les groupes et les familles',
    priceIndicator: '€€€€'
  },
  {
    id: 4,
    name: 'Berline Luxe',
    type: 'Premium',
    capacity: 3,
    luggage: 3,
    description: 'L\'excellence au service de vos déplacements',
    priceIndicator: '€€€€€'
  }
];

export default function Fleet() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Notre flotte de véhicules</h2>
        <p className={styles.subtitle}>
          Choisissez le véhicule adapté à vos besoins
        </p>
        
        <div className={styles.vehiclesGrid}>
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
