/**
 * BookingWidget Component
 * Formulaire de réservation redesigné - Style épuré et moderne
 */

'use client';

import { useState, FormEvent } from 'react';
import styles from './BookingWidget.module.css';

export default function BookingWidget() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('Aujourd\'hui');
  const [time, setTime] = useState('18:10');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // TODO: Remplacer par appel API réel lors de l'intégration backend
    console.log('Réservation demandée:', { pickup, destination, date, time });
    
    // Simulation feedback utilisateur
    alert(`Consultation des prix...\nDe: ${pickup}\nVers: ${destination}\nDate: ${date} à ${time}`);
  };

  return (
    <div className={styles.widget}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="10" cy="10" r="2" fill="currentColor"/>
              <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              id="pickup"
              className={styles.input}
              placeholder="Adresse de départ"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 9C11.1 9 12 8.1 12 7C12 5.9 11.1 5 10 5C8.9 5 8 5.9 8 7C8 8.1 8.9 9 10 9Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 18C13 15 16 12 16 9C16 5.7 13.3 3 10 3C6.7 3 4 5.7 4 9C4 12 7 15 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              id="destination"
              className={styles.input}
              placeholder="Adresse d'arrivée"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.dateTimeRow}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 8H17M7 2V6M13 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                id="date"
                className={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 6V10H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                id="time"
                className={styles.input}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Consulter les prix
        </button>
      </form>
    </div>
  );
}
