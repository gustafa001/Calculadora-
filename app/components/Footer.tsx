import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-forest-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display text-lg text-cream mb-2">
              Calc<span className="text-lime-400">Trabalhista</span>
            </p>
            <p className="text-sm leading-relaxed">
              Ferramentas gratuitas para calcular direitos trabalhistas conforme
              a CLT. Tabelas INSS e IRRF atualizadas para 2024.
            </p>
          </div>

          <div>
            <p className="font-semibold text-cream text-sm mb-3">Calculadoras</p>
            <ul className="space-y-1.5 text-sm">
              {[
                ["Rescisão sem Justa Causa", "/calculadoras/rescisao"],
                ["13º Salário", "/calculadoras/decimo-terceiro"],
                ["Férias + ⅓", "/calculadoras/ferias"],
                ["Hora Extra", "/calculadoras/hora-extra"],
                ["FGTS Acumulado", "/calculadoras/fgts"],
                ["Aviso Prévio", "/calculadoras/aviso-previo"],
                ["Salário Líquido", "/calculadoras/salario-liquido"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-lime-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-cream text-sm mb-3">Legal</p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/privacidade" className="hover:text-lime-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-lime-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
            <p className="text-xs mt-4 leading-relaxed text-forest-400">
              Os resultados são estimativas. Consulte um advogado trabalhista para
              situações específicas.
            </p>
          </div>
        </div>

        <div className="border-t border-forest-700 pt-6 text-xs text-forest-400 text-center">
          © {new Date().getFullYear()} CalcTrabalhista — Uso gratuito para fins informativos. Não constitui consultoria jurídica.
        </div>
      </div>
    </footer>
  );
}
