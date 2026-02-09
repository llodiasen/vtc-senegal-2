/**
 * FAQItem Component
 * Élément d'accordéon pour afficher une question/réponse
 */

'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQItemProps {
  faq: FAQ;
}

export default function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button 
        className={styles.faqQuestion}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.questionText}>{faq.question}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          ▼
        </span>
      </button>
      
      <div className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ''}`}>
        <p className={styles.answerText}>{faq.answer}</p>
      </div>
    </div>
  );
}
