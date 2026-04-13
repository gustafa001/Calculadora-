import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do CalcTrabalhista conforme a LGPD.",
  robots: { index: false },
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl text-forest-900 mb-2">Política de Privacidade</h1>
      <p className="text-forest-500 text-sm mb-8">Última atualização: janeiro de 2025</p>

      <div className="prose prose-sm max-w-none text-forest-700 space-y-6">
        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">1. Controlador dos Dados</h2>
          <p>O <strong>CalcTrabalhista</strong> é o controlador dos dados coletados neste site, conforme a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">2. Dados Coletados</h2>
          <p><strong>Dados inseridos nas calculadoras:</strong> todos os valores que você digita (salário, datas, etc.) são processados exclusivamente no seu navegador, nunca enviados para nossos servidores. Não armazenamos nenhuma informação financeira pessoal.</p>
          <p className="mt-2"><strong>Dados de navegação (com seu consentimento):</strong> ao aceitar os cookies, o Google AdSense e o Google Analytics podem coletar dados como endereço IP anonimizado, tipo de dispositivo, páginas visitadas e interações, para fins de exibição de anúncios relevantes e análise de tráfego.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">3. Cookies e Base Legal</h2>
          <p>Utilizamos cookies de terceiros (Google) mediante seu consentimento prévio (base legal: art. 7º, I, da LGPD). Você pode aceitar ou rejeitar esses cookies no banner exibido em sua primeira visita. Ao rejeitar, nenhum cookie de rastreamento será ativado.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">4. Google AdSense e Analytics</h2>
          <p>Utilizamos o Google AdSense para exibição de anúncios e o Google Analytics para análise de audiência. O Google pode usar cookies para personalizar anúncios com base no seu histórico de navegação. Para mais informações, consulte a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-forest-600 underline">Política de Privacidade do Google</a>. Você pode desativar a personalização de anúncios em <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-forest-600 underline">adssettings.google.com</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">5. Seus Direitos (LGPD)</h2>
          <p>Você tem direito a: confirmação da existência de tratamento, acesso aos dados, correção, anonimização ou eliminação, portabilidade, revogação do consentimento a qualquer momento. Para exercer seus direitos, entre em contato pelo e-mail: <strong>privacidade@calculadortrabalhista.com.br</strong> (troque pelo seu e-mail real).</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">6. Retenção de Dados</h2>
          <p>Os dados de navegação coletados pelo Google são retidos conforme a política do Google (geralmente 26 meses para Analytics). O registro de consentimento de cookies é armazenado localmente no seu navegador via localStorage e pode ser excluído a qualquer momento limpando os dados do site.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-forest-900 mb-2">7. Alterações nesta Política</h2>
          <p>Podemos atualizar esta política periodicamente. Alterações significativas serão informadas por banner no site. Recomendamos revisitar esta página periodicamente.</p>
        </section>
      </div>
    </div>
  );
}
