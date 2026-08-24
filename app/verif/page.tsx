'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, Lock } from 'lucide-react';

export default function VerifPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push('/confirm');
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="h-[100dvh] w-full bg-[radial-gradient(circle_at_top_right,#efe685_0%,#ffffff_45%)] flex items-center justify-center p-4 overflow-hidden font-sans select-none text-[#111111]">
      {/* Carte Néo-Brutaliste */}
      <div className="bg-white border-[3px] border-[#111111] w-full max-w-[420px] p-8 sm:p-10 text-center rounded-[40px] shadow-[10px_10px_0px_#111111] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Boîte Logo Inclinée */}
        <div className="w-20 h-20 bg-[#efe685] border-[3px] border-[#111111] rounded-[24px] flex items-center justify-center mx-auto mb-6 -rotate-3">
          <div className="w-12 h-12 bg-[#FFE800] rounded-xl flex items-center justify-center border-2 border-[#111111]">
            <span className="font-black text-black text-sm tracking-tighter">wero</span>
          </div>
        </div>

        <h1 className="font-extrabold text-2xl mb-2 tracking-tight">
          Vérification...
        </h1>
        <p className="text-xs font-bold text-slate-500 mb-8">
          Protocole de sécurité bancaire en cours
        </p>

        {/* Barre de progression avec bordure noire */}
        <div className="bg-[#f0f0f0] h-[14px] border-[3px] border-[#111111] rounded-full mb-8 overflow-hidden relative">
          <div
            className="h-full bg-[#111111] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Liste des Étapes Dynamiques */}
        <div className="flex flex-col gap-2.5 text-left mb-8">
          {/* Étape 1 */}
          <div
            className={`flex items-center gap-3.5 font-bold text-xs p-3 rounded-xl transition-all duration-300 ${
              progress >= 35
                ? 'text-[#27ae60] opacity-100'
                : progress >= 5
                ? 'opacity-100 bg-[#fafafa]'
                : 'opacity-20'
            }`}
          >
            {progress >= 35 ? (
              <CheckCircle2 className="w-4 h-4 text-[#27ae60] shrink-0 stroke-[2.5]" />
            ) : (
              <Loader2 className={`w-4 h-4 shrink-0 ${progress >= 5 ? 'animate-spin' : ''}`} />
            )}
            <span>{progress >= 35 ? 'Données cryptées' : 'Cryptage des données'}</span>
          </div>

          {/* Étape 2 */}
          <div
            className={`flex items-center gap-3.5 font-bold text-xs p-3 rounded-xl transition-all duration-300 ${
              progress >= 70
                ? 'text-[#27ae60] opacity-100'
                : progress >= 35
                ? 'opacity-100 bg-[#fafafa]'
                : 'opacity-20'
            }`}
          >
            {progress >= 70 ? (
              <CheckCircle2 className="w-4 h-4 text-[#27ae60] shrink-0 stroke-[2.5]" />
            ) : (
              <Loader2 className={`w-4 h-4 shrink-0 ${progress >= 35 ? 'animate-spin' : ''}`} />
            )}
            <span>{progress >= 70 ? 'Conformité validée' : 'Analyse de conformité'}</span>
          </div>

          {/* Étape 3 */}
          <div
            className={`flex items-center gap-3.5 font-bold text-xs p-3 rounded-xl transition-all duration-300 ${
              progress >= 70
                ? 'opacity-100 bg-[#fafafa]'
                : 'opacity-20'
            }`}
          >
            <Loader2 className={`w-4 h-4 shrink-0 ${progress >= 70 ? 'animate-spin' : ''}`} />
            <span>Synchronisation finale</span>
          </div>
        </div>

        {/* Badge de Sécurité */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[1.5px]">
          <Lock className="w-3.5 h-3.5" />
          <span>SSL SECURED 256-BIT</span>
        </div>

      </div>
    </div>
  );
}
