/**
 * Envoi de messages vers un chat Telegram via un bot.
 * IMPORTANT (sécurité) : ce module ne doit JAMAIS être importé depuis un
 * composant client ("use client"). Il ne doit être appelé que depuis des
 * route handlers (app/api/**\/route.ts), qui s'exécutent côté serveur.
 * Le token du bot et l'identifiant du chat sont lus depuis les variables
 * d'environnement et ne sont donc jamais envoyés au navigateur.
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export class TelegramConfigError extends Error {
  constructor() {
    super(
      "TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID manquant dans les variables d'environnement."
    );
    this.name = "TelegramConfigError";
  }
}

/**
 * Échappe les caractères spéciaux du mode de formatage Telegram "MarkdownV2".
 */
function escapeMarkdownV2(value: string): string {
  return value.replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, (match) => `\\${match}`);
}

export type TelegramField = { label: string; value: string };

/**
 * Construit un message lisible à partir d'un titre et d'une liste de champs
 * label/valeur, puis l'envoie au chat configuré.
 */
export async function sendTelegramMessage(
  title: string,
  fields: TelegramField[]
): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    // On ne bloque jamais le parcours utilisateur si Telegram n'est pas
    // configuré (ex: environnement de développement) : on journalise
    // seulement côté serveur.
    console.error(new TelegramConfigError().message);
    return;
  }

  const lines = [
    `*${escapeMarkdownV2(title)}*`,
    "",
    ...fields
      .filter((f) => f.value && f.value.trim().length > 0)
      .map(
        (f) => `*${escapeMarkdownV2(f.label)} :* ${escapeMarkdownV2(f.value)}`
      ),
  ];

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: lines.join("\n"),
      parse_mode: "MarkdownV2",
    }),
    // Les envois Telegram ne doivent pas être mis en cache.
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(
      `Échec de l'envoi Telegram (${response.status}): ${body}`
    );
  }
}
