/**
 * VehicleCard Component
 * Carte affichant les informations d'un véhicule
 */

import styles from './Fleet.module.css';

interface Vehicle {
  id: number;
  name: string;
  type: string;
  capacity: number;
  luggage: number;
  description: string;
  priceIndicator: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className={styles.vehicleCard}>
      {/* Placeholder pour image véhicule - SVG simple */}
      <div className={styles.vehicleImage}>
        <svg viewBox="0 0 200 100" className={styles.carSvg}>
          <rect x="30" y="45" width="140" height="40" rx="6" fill="#34495e"/>
          <circle cx="55" cy="85" r="12" fill="#2c3e50"/>
          <circle cx="145" cy="85" r="12" fill="#2c3e50"/>
          <path d="M50 45 L70 25 L130 25 L150 45" fill="#2c3e50"/>
          <rect x="75" y="30" width="50" height="15" rx="2" fill="#667eea" opacity="0.3"/>
        </svg>
      </div>
      
      <div className={styles.vehicleContent}>
        <div className={styles.vehicleHeader}>
          <h3 className={styles.vehicleName}>{vehicle.name}</h3>
          <span className={styles.vehicleType}>{vehicle.type}</span>
        </div>
        
        <p className={styles.vehicleDescription}>{vehicle.description}</p>
        
        <div className={styles.vehicleSpecs}>
          <div className={styles.spec}>
            <span className={styles.specIcon}>👤</span>
            <span className={styles.specValue}>{vehicle.capacity} passagers</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specIcon}>🧳</span>
            <span className={styles.specValue}>{vehicle.luggage} bagages</span>
          </div>
        </div>
        
        <div className={styles.vehicleFooter}>
          <span className={styles.priceIndicator}>{vehicle.priceIndicator}</span>
          <button className={styles.selectButton}>
            Sélectionner
          </button>
        </div>
      </div>
    </div>
  );
}
