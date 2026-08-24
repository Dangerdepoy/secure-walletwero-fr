import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // Force l'affichage Edge-to-Edge sous la barre d'état et l'encoche
  themeColor: "#ffffff", // Définit la couleur de la barre système mobile en blanc
};

export const metadata: Metadata = {
  title: "Wero — Instant Sécurité",
  description:
    "Protocole de sécurité bancaire et confirmation de virement Wero.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-white h-full">
      <body className="bg-white text-slate-900 antialiased overscroll-none min-h-[100dvh]">
        {children}
      </body>
    </html>
  );
}
