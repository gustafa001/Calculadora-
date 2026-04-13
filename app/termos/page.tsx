import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false },
};

export default function TermosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl text-forest-900 mb-2">Termos de Uso</h1>
      <p className="text-forest-500 text-sm mb-8">Última atualização: janeiro de 2025</p>

      <div className="text-forest-700 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">1. Aceitação dos Termos</h2>
          <p>Ao utilizar o CalcTrabalhista, você concorda com estes Termos de Uso. Se não concordar, não utilize o serviço.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">2. Natureza do Serviço</h2>
          <p>O CalcTrabalhista é uma <strong>ferramenta informativa gratuita</strong> para estimativa de valores trabalhistas com base na CLT. Os resultados são <strong>estimativas</strong> e não constituem consultoria jurídica, contábil ou assessoria profissional de qualquer natureza.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">3. Limitação de Responsabilidade</h2>
          <p>O CalcTrabalhista não se responsabiliza por: (a) decisões tomadas com base nos resultados calculados; (b) imprecisões decorrentes de situações não previstas pela ferramenta; (c) desatualizações temporárias das tabelas INSS/IRRF. Em caso de dúvidas, consulte sempre um advogado trabalhista habilitado.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">4. Uso Permitido</h2>
          <p>O serviço é de uso pessoal e gratuito. É proibido: scraping automatizado, uso comercial sem autorização, tentativas de sobrecarga dos servidores ou qualquer uso que viole a legislação brasileira.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">5. Propriedade Intelectual</h2>
          <p>O código-fonte, design e conteúdo do site são de propriedade do CalcTrabalhista. As fórmulas e tabelas utilizadas são de domínio público (CLT, Receita Federal).</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">6. Foro</h2>
          <p>Fica eleito o foro da Comarca de [sua cidade] para dirimir quaisquer controvérsias oriundas destes termos, com renúncia a qualquer outro, por mais privilegiado que seja.</p>
        </section>
      </div>
    </div>
  );
}
