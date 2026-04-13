"use client";
import { useEffect } from "react";

interface Props {
  slotId: string; // ex: "1234567890"
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

// ⚠️ Substitua pelo seu Publisher ID
const PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXXXX";

export default function AdSenseSlot({ slotId, format = "auto", className = "" }: Props) {
  useEffect(() => {
    // Só inicializa se o usuário aceitou cookies
    const consent = localStorage.getItem("cookie_consent");
    if (consent !== "accepted") return;
    if (PUBLISHER_ID === "ca-pub-XXXXXXXXXXXXXXXXXX") return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  // Não renderiza nada se não tiver Publisher ID configurado
  if (PUBLISHER_ID === "ca-pub-XXXXXXXXXXXXXXXXXX") {
    return (
      <div
        className={`adsense-slot bg-forest-300/10 border-2 border-dashed border-forest-300/30 rounded-xl text-center text-forest-400 text-xs py-4 ${className}`}
      >
        <p className="font-mono">[ Espaço para Anúncio AdSense ]</p>
        <p className="mt-1 text-forest-300/60">Configure seu Publisher ID para ativar</p>
      </div>
    );
  }

  return (
    <div className={`adsense-slot ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
