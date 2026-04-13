import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import Script from "next/script";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calculadortrabalhista.com.br"), // ← TROQUE pela sua URL
  title: {
    default: "Calculadora Trabalhista | Rescisão, 13º, Férias e mais",
    template: "%s | Calculadora Trabalhista",
  },
  description:
    "Calcule rescisão, 13º salário, férias, hora extra, FGTS e salário líquido de forma rápida e gratuita. Baseado na CLT e tabelas atualizadas 2024.",
  keywords: [
    "calculadora trabalhista",
    "calcular rescisão",
    "calcular 13 salário",
    "calcular férias",
    "calcular hora extra",
    "calcular FGTS",
    "calcular salário líquido",
    "desconto INSS",
    "desconto IRRF",
    "CLT",
  ],
  authors: [{ name: "Calculadora Trabalhista" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Calculadora Trabalhista",
  },
};

// ⚠️ TROQUE "ca-pub-XXXXXXXXXXXXXXXXXX" pelo seu Publisher ID do AdSense
const ADSENSE_ID = "ca-pub-XXXXXXXXXXXXXXXXXX";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* Google AdSense — só ativa após aprovação */}
        {ADSENSE_ID !== "ca-pub-XXXXXXXXXXXXXXXXXX" && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner adsenseId={ADSENSE_ID} />
      </body>
    </html>
  );
}
