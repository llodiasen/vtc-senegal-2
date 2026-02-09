import React from 'react';
import {
  Star,
  Banknote,
  CalendarCheck,
  CalendarClock,
  Shield,
  MapPin,
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  text: string;
}

const features: Feature[] = [
  {
    icon: <Star className="w-5 h-5" />,
    text: 'Chauffeur confirmé dès la commande',
  },
  {
    icon: <Banknote className="w-5 h-5" />,
    text: 'Tarif fixe jour & nuit garanti',
  },
  {
    icon: <CalendarCheck className="w-5 h-5" />,
    text: "Réservation jusqu'à 1 an à l'avance",
  },
  {
    icon: <CalendarClock className="w-5 h-5" />,
    text: 'Replanification automatique si retard',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: 'Paiement 100% sécurisé',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    text: 'Présent partout au Sénégal',
  },
];

export const FeatureList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-3 text-white/90"
        >
          <div className="flex-shrink-0 text-secondary-500">
            {feature.icon}
          </div>
          <span className="text-sm md:text-base">{feature.text}</span>
        </div>
      ))}
    </div>
  );
};
