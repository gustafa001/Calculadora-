import type { Metadata } from "next";
import Link from "next/link";
import AdSenseSlot from "./components/AdSenseSlot";

export const metadata: Metadata = {
  title: "Calculadoras Trabalhistas Gratuitas 2024 | CLT",
  description:
    "Calcule rescisão, 13º salário, férias, hora extra, FGTS e salário líquido. Ferramentas gratuitas conforme CLT, com tabelas INSS e IRRF 2024.",
};

const calculadoras = [
  {
    href: "/calculadoras/rescisao",
    icon: "📋",
    title: "Rescisão sem Justa Causa",
    desc: "Calcule saldo de salário, aviso prévio, 13º proporcional, férias e multa de 40% do FGTS.",
    tags: ["CLT", "Demissão"],
  },
  {
    href: "/calculadoras/decimo-terceiro",
    icon: "🎄",
    title: "13º Salário",
    desc: "Calcule o décimo terceiro salário proporcional, com descontos de INSS e IRRF.",
    tags: ["Anual", "Proporcional"],
  },
  {
    href: "/calculadoras/ferias",
    icon: "🏖️",
    title: "Férias + ⅓ Constitucional",
    desc: "Calcule o valor das suas férias com o acréscimo de 1/3 e opção de abono pecuniário.",
    tags: ["30 dias", "Abono"],
  },
  {
    href: "/calculadoras/hora-extra",
    icon: "⏰",
    title: "Hora Extra",
    desc: "Calcule o valor de horas extras com 50%, 100% ou adicional noturno.",
    tags: ["50%", "100%", "Noturna"],
  },
  {
    href: "/calculadoras/fgts",
    icon: "🏦",
    title: "FGTS Acumulado",
    desc: "Calcule o saldo do FGTS acumulado por meses de trabalho e a multa de 40%.",
    tags: ["8%", "Multa 40%"],
  },
  {
    href: "/calculadoras/aviso-previo",
    icon: "📅",
    title: "Aviso Prévio Proporcional",
    desc: "Calcule o aviso prévio indenizado conforme Lei 12.506/2011 (30 + 3 dias/ano).",
    tags: ["Lei 12.506", "Proporcional"],
  },
  {
    href: "/calculadoras/salario-liquido",
    icon: "💰",
    title: "Salário Líquido",
    desc: "Descubra seu salário líquido após descontos de INSS e IRRF com dependentes.",
    tags: ["INSS", "IRRF"],
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-forest-900 text-cream py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lime-400 font-body font-semibold text-sm uppercase tracking-widest mb-4">
            Gratuito · Atualizado 2024 · Baseado na CLT
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Calculadoras{" "}
            <span className="text-lime-400">Trabalhistas</span>
          </h1>
          <p className="text-forest-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Calcule rescisão, 13º, férias, hora extra, FGTS e salário líquido
            em segundos. Tabelas INSS e IRRF atualizadas.
          </p>
        </div>
      </section>

      {/* Ad banner */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <AdSenseSlot slotId="SLOT_HORIZONTAL_TOPO" format="horizontal" />
      </div>

      {/* Grid de calculadoras */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">
          Escolha sua calculadora
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculadoras.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group calc-card hover:border-forest-600/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{calc.icon}</span>
                <div className="flex-1">
                  <h3 className="font-display text-lg text-forest-900 group-hover:text-forest-600 transition-colors mb-1">
                    {calc.title}
                  </h3>
                  <p className="text-sm text-forest-600 leading-relaxed mb-3">
                    {calc.desc}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {calc.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-forest-300/20 text-forest-700 px-2 py-0.5 rounded-full font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-forest-600 text-sm font-semibold group-hover:text-lime-600 flex items-center gap-1 transition-colors">
                Calcular agora →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Info section */}
      <section className="bg-forest-800 text-cream py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl mb-4">
            Por que usar esta calculadora?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-sm">
            {[
              { icon: "🔒", title: "Seguro e Privado", text: "Nenhum dado seu é enviado para servidores. Todo cálculo roda no seu navegador." },
              { icon: "📊", title: "Tabelas Atualizadas", text: "INSS e IRRF seguem as tabelas oficiais de 2024. Atualizamos a cada mudança." },
              { icon: "⚖️", title: "Baseado na CLT", text: "Cálculos seguem a Consolidação das Leis do Trabalho e jurisprudência vigente." },
            ].map((item) => (
              <div key={item.title} className="text-left bg-forest-700/50 rounded-xl p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-lime-400 mb-1">{item.title}</h3>
                <p className="text-forest-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom ad */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AdSenseSlot slotId="SLOT_HORIZONTAL_RODAPE" format="horizontal" />
      </div>
    </div>
  );
}
