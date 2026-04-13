export default function Disclaimer() {
  return (
    <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
      <p className="font-semibold mb-1">⚠️ Aviso Legal Importante</p>
      <p className="leading-relaxed">
        Os valores calculados são <strong>estimativas baseadas na CLT</strong> e nas tabelas vigentes
        em 2024. Situações específicas (acordos coletivos, benefícios contratuais, horas banco,
        variações salariais, afastamentos) podem alterar significativamente o resultado.{" "}
        <strong>
          Esta ferramenta não substitui a orientação de um advogado trabalhista ou contador.
        </strong>{" "}
        Em caso de dúvidas ou disputas, consulte sempre um profissional habilitado.
      </p>
    </div>
  );
}
