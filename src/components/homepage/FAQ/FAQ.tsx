/**
 * FAQ Component
 * Section questions fréquentes avec accordéon interactif
 */

import styles from './FAQ.module.css';
import FAQItem from './FAQItem';

// Données mockées des questions fréquentes
const faqs = [
  {
    id: 1,
    question: 'Comment réserver un trajet ?',
    answer: 'Il vous suffit de renseigner votre point de départ et votre destination dans le formulaire de réservation, puis de sélectionner le véhicule de votre choix. Vous recevrez immédiatement une confirmation par email et SMS.'
  },
  {
    id: 2,
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons les paiements par carte bancaire (Visa, Mastercard, American Express), les virements bancaires pour les comptes professionnels, et les paiements en espèces directement au chauffeur.'
  },
  {
    id: 3,
    question: 'Puis-je annuler ou modifier ma réservation ?',
    answer: 'Vous pouvez annuler ou modifier votre réservation gratuitement jusqu\'à 2 heures avant l\'heure de prise en charge prévue. Au-delà, des frais d\'annulation peuvent s\'appliquer.'
  },
  {
    id: 4,
    question: 'Les véhicules sont-ils adaptés aux personnes à mobilité réduite ?',
    answer: 'Oui, nous disposons de véhicules spécialement équipés pour accueillir les personnes à mobilité réduite. Merci de préciser vos besoins lors de la réservation pour que nous puissions vous assigner le véhicule adapté.'
  },
  {
    id: 5,
    question: 'Vos chauffeurs sont-ils disponibles 24h/24 ?',
    answer: 'Notre service est disponible 24 heures sur 24, 7 jours sur 7, y compris les jours fériés. Nos chauffeurs professionnels sont à votre disposition à tout moment.'
  },
  {
    id: 6,
    question: 'Proposez-vous des forfaits pour les trajets réguliers ?',
    answer: 'Oui, nous proposons des forfaits avantageux pour les clients réguliers et les entreprises. Contactez notre service commercial pour obtenir un devis personnalisé adapté à vos besoins.'
  }
];

export default function FAQ() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Questions fréquentes</h2>
        <p className={styles.subtitle}>Tout ce que vous devez savoir</p>
        
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
        
        <div className={styles.contactCta}>
          <p className={styles.ctaText}>Vous avez d'autres questions ?</p>
          <button className={styles.ctaButton}>
            Contactez-nous
          </button>
        </div>
      </div>
    </section>
  );
}
