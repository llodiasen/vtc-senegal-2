'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'Comment réserver un trajet avec SCOD VTC ?',
    answer: (
      <div className="space-y-2">
        <p className="text-sm">Voici les étapes à suivre pour réserver un trajet depuis le site ou l&apos;app SCOD VTC :</p>
        <ol className="list-decimal list-inside space-y-1.5 ml-3 text-sm">
          <li>Connectez-vous à votre compte « SCOD VTC »</li>
          <li>Choisissez le mode de réservation : « Partir maintenant » ou « Partir plus tard », puis définissez la date et l&apos;heure.</li>
          <li>Renseignez les informations : adresse de départ/destination et si besoin, « Ajouter un arrêt ».</li>
          <li>Cliquez sur « Je consulte les prix ».</li>
          <li>Choisissez la gamme de véhicule souhaitée</li>
          <li>Renseignez vos informations personnelles</li>
          <li>Sélectionnez votre mode de paiement</li>
          <li>Vérifiez toutes les informations, puis confirmez votre réservation.</li>
        </ol>
        <p className="font-medium text-sm">Un e-mail de confirmation vous sera envoyé.</p>
      </div>
    ),
  },
  {
    question: 'Comment connaître le prix de ma course ?',
    answer: (
      <div className="space-y-2">
        <p className="text-sm">Que vous souhaitiez vérifier la disponibilité d&apos;un chauffeur, faire une simulation de tarif ou obtenir un devis sans réserver, SCOD VTC vous affiche toujours le prix fixe de votre course dès que les informations de trajet sont saisies.</p>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 text-sm">Depuis l&apos;application mobile SCOD VTC (iOS et Android)</h4>
          <ol className="list-decimal list-inside space-y-1.5 ml-3 text-sm">
            <li>Ouvrez l&apos;application SCOD VTC.</li>
            <li>Renseignez votre adresse de départ et d&apos;arrivée.</li>
            <li>Choisissez la date et l&apos;heure du trajet (immédiat ou réservé).</li>
            <li>Le prix s&apos;affiche automatiquement selon la gamme de véhicule sélectionnée.</li>
            <li>Vous pouvez réserver ou simplement quitter l&apos;écran si vous faisiez une estimation.</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 text-sm">Depuis le site web</h4>
          <ol className="list-decimal list-inside space-y-1.5 ml-3 text-sm">
            <li>Rendez-vous sur notre site web.</li>
            <li>Saisissez votre adresse de départ et d&apos;arrivée.</li>
            <li>Sélectionnez la date et l&apos;heure du trajet.</li>
            <li>Cliquez sur le bouton « Je consulte les prix ».</li>
            <li>Les tarifs s&apos;affichent pour chaque gamme disponible.</li>
          </ol>
          <p className="mt-1.5 text-sm">Les prix sont fixes et garantis dès la réservation (sauf modification d&apos;itinéraire via une course libre).</p>
        </div>

        <p className="text-sm text-gray-600 italic">Vous disposez d&apos;un code promo ? Vous pourrez l&apos;ajouter au moment de la réservation.</p>
      </div>
    ),
  },
  {
    question: 'Comment choisir ma gamme de véhicule ?',
    answer: (
      <div className="space-y-2">
        <p className="text-sm">SCOD VTC propose plusieurs gammes de véhicules pour s&apos;adapter à tous vos besoins, que ce soit pour un trajet quotidien, un déplacement professionnel ou un transport spécifique.</p>
        <ol className="list-decimal list-inside space-y-1.5 ml-3 text-sm">
          <li>Rendez-vous sur notre site ou sur l&apos;app SCOD VTC</li>
          <li>Indiquez votre adresse de départ, d&apos;arrivée, date et heure.</li>
          <li>Cliquez sur « Je consulte les prix ».</li>
          <li>Comparez les différentes gammes proposées, et choisissez celle adaptée à vos besoins.</li>
        </ol>
        <div className="bg-primary-50 border-l-2 border-primary-600 p-2.5 mt-2">
          <p className="font-semibold text-gray-900 mb-0.5 text-sm">Conseil :</p>
          <p className="text-gray-700 text-sm">Si vous transportez plusieurs bagages ou voyagez en groupe, privilégiez un Van. Si vous êtes pressé(e) en ville, pensez au Moto-taxi.</p>
        </div>
      </div>
    ),
  },
  {
    question: 'Comment retrouver mon chauffeur à l\'aéroport ou à la gare ?',
    answer: (
      <div className="space-y-2">
        <p className="text-sm">En gare ou à l&apos;aéroport, le lieu exact de prise en charge dépend des informations que vous renseignez lors de votre réservation.</p>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 text-sm">Comment est défini le point de prise en charge ?</h4>
          <ul className="list-disc list-inside space-y-1.5 ml-3 text-sm">
            <li>Si vous renseignez un numéro de vol ou de train, un point de rencontre précis vous est proposé automatiquement lors de la réservation.</li>
            <li>Si vous ne renseignez pas cette information, le point de rendez-vous par défaut est disponible dans la liste ci-dessous.</li>
            <li>Vous pouvez retrouver ce lieu à tout moment dans les détails de votre réservation.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 text-sm">Où consulter mon point de prise en charge ?</h4>
          <ul className="list-disc list-inside space-y-1.5 ml-3 text-sm">
            <li><strong>Depuis l&apos;app mobile :</strong> ouvrez l&apos;application SCOD VTC, allez dans « Réservations », sélectionnez la course concernée, puis cliquez sur « Détails ».</li>
            <li><strong>Depuis le site web :</strong> connectez-vous à votre compte, cliquez sur l&apos;onglet « Réservations », puis sélectionnez la course concernée.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: 'Conditions d\'attente et retard aux aéroports',
    answer: (
      <div className="space-y-2">
        <p className="text-sm">Que se passe-t-il si votre vol ou votre train est en retard ? SCOD VTC peut ajuster automatiquement l&apos;horaire de votre prise en charge, à condition d&apos;avoir renseigné votre numéro de vol ou de train lors de la réservation.</p>
        
        <div className="space-y-2">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Quelles sont les conditions d&apos;attente en gare ou aéroport ?</h4>
            
            <div className="bg-blue-50 border-l-2 border-blue-600 p-2.5 mb-2">
              <p className="font-semibold text-gray-900 mb-1 text-sm">Si votre numéro de vol ou de train est renseigné :</p>
              <ul className="list-disc list-inside space-y-1.5 ml-3 text-gray-700 text-sm">
                <li>L&apos;horaire de prise en charge s&apos;ajuste automatiquement selon les données en temps réel.</li>
                <li>5 minutes d&apos;attente gratuites en « Berline ».</li>
                <li>10 minutes d&apos;attente gratuites en « Berline Affaires », « Van » et « Moto Taxi ».</li>
                <li>Au-delà : des frais d&apos;attente s&apos;appliquent selon la gamme.</li>
                <li>L&apos;attente supplémentaire est soumise à la disponibilité du chauffeur, qui peut refuser d&apos;attendre au-delà des minutes gratuites.</li>
              </ul>
            </div>

            <div className="bg-amber-50 border-l-2 border-amber-600 p-2.5">
              <p className="font-semibold text-gray-900 mb-1 text-sm">Si aucun numéro de vol ou de train n&apos;est renseigné :</p>
              <ul className="list-disc list-inside space-y-1.5 ml-3 text-gray-700 text-sm">
                <li>Le chauffeur attend 5 minutes gratuitement.</li>
                <li>Au-delà, des frais d&apos;attente s&apos;appliquent selon la gamme.</li>
                <li>Comme toujours, la poursuite de l&apos;attente reste à l&apos;appréciation du chauffeur.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">Comment renseigner mon numéro de vol ou de train ?</h4>
            
            <div className="space-y-2">
              <div>
                <p className="font-medium text-gray-900 mb-1.5 text-sm">Depuis le site web</p>
                <ol className="list-decimal list-inside space-y-1.5 ml-3 text-gray-700 text-sm">
                  <li>Cliquez sur le champ « Départ ».</li>
                  <li>Sélectionnez « Gares » ou « Aéroports ».</li>
                  <li>Choisissez le lieu de départ.</li>
                  <li>Renseignez votre numéro de vol ou de train.</li>
                  <li>Indiquez le temps estimé pour sortir après l&apos;arrivée (ex : récupération des bagages).</li>
                  <li>Validez et poursuivez la réservation.</li>
                </ol>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1.5 text-sm">Depuis l&apos;application mobile SCOD VTC</p>
                <ol className="list-decimal list-inside space-y-1.5 ml-3 text-gray-700 text-sm">
                  <li>Dans le champ « Où vient-on vous récupérer », sélectionnez « Gare » ou « Aéroport ».</li>
                  <li>Choisissez le lieu de prise en charge.</li>
                  <li>Indiquez votre numéro de vol ou de train.</li>
                  <li>Précisez ensuite le délai estimé après l&apos;arrivée.</li>
                  <li>Poursuivez et finalisez votre réservation.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary-50 border-l-2 border-primary-600 p-2.5 mt-2">
          <p className="text-sm text-gray-700">
            <strong>Pour toute question,</strong> contactez notre Service Client :{' '}
            <a href="mailto:contact@scodvtc.com" className="text-primary-600 hover:underline font-medium">
              contact@scodvtc.com
            </a>
          </p>
        </div>
      </div>
    ),
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {FAQ_DATA.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-md overflow-hidden hover:border-gray-300 transition-colors duration-200"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-3 sm:p-4 text-left focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 pr-3 sm:pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
