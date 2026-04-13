"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  adsenseId: string;
}

export default function CookieBanner({ adsenseId }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    setVisible(false);
    // Inicializa AdSense após consentimento
    if (adsenseId !== "ca-pub-XXXXXXXXXXXXXXXXXX" && typeof window !== "undefined") {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  function reject() {
    localStorage.setItem("cookie_consent", "rejected");
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-forest-900 border-t-2 border-lime-400 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-forest-300 leading-relaxed">
          <p>
            <span className="font-semibold text-cream">🍪 Cookies e Privacidade —</span>{" "}
            Usamos cookies de terceiros (Google AdSense) para exibir anúncios que financiam este
            serviço gratuito. Ao continuar, você concorda com nossa{" "}
            <Link href="/privacidade" className="text-lime-400 underline">
              Política de Privacidade
            </Link>{" "}
            conforme a LGPD.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={reject}
            className="text-xs text-forest-300 hover:text-cream border border-forest-600 px-4 py-2 rounded-lg transition-colors"
          >
            Rejeitar
          </button>
          <button
            onClick={accept}
            className="text-xs font-semibold bg-lime-400 text-forest-900 px-5 py-2 rounded-lg hover:bg-lime-300 transition-colors"
          >
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  );
}
