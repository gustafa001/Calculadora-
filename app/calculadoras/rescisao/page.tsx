"use client";
import { useState } from "react";
import Disclaimer from "../../components/Disclaimer";
import AdSenseSlot from "../../components/AdSenseSlot";
import {
  calcularRescisao,
  formatBRL,
  type ResultadoRescisao,
} from "../../lib/calculos-clt";

export default function RescisaoPage() {
  const [form, setForm] = useState({
    salario: "",
    dataAdmissao: "",
    dataDemissao: "",
    fgtsAcumulado: "",
    dependentes: "0",
    temFeriasVencidas: false,
  });

  const [resultado, setResultado] = useState<ResultadoRescisao | null>(null);
  const [erro, setErro] = useState("");

  function handleSubmit() {
    setErro("");
    const salario = parseFloat(form.salario.replace(",", "."));
    const fgts = parseFloat(form.fgtsAcumulado.replace(",", "."));
    const deps = parseInt(form.dependentes);

    if (!salario || salario <= 0) return setErro("Informe um salário válido.");
    if (!form.dataAdmissao) return setErro("Informe a data de admissão.");
    if (!form.dataDemissao) return setErro("Informe a data de demissão.");

    const admissao = new Date(form.dataAdmissao + "T00:00:00");
    const demissao = new Date(form.dataDemissao + "T00:00:00");

    if (demissao <= admissao) return setErro("Data de demissão deve ser após a admissão.");

    const res = calcularRescisao({
      salario,
      dataAdmissao: admissao,
      dataDemissao: demissao,
      temFeriasVencidas: form.temFeriasVencidas,
      fgtsAcumulado: fgts || 0,
      dependentes: deps,
    });

    setResultado(res);
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-xs font-mono text-forest-500 uppercase tracking-widest">Calculadora</span>
        <h1 className="section-title mt-1">Rescisão sem Justa Causa</h1>
        <p className="text-forest-600 text-sm leading-relaxed">
          Calcule todos os direitos rescisórios: saldo de salário, aviso prévio indenizado, 13º e
          férias proporcionais, FGTS + multa de 40%.
        </p>
      </div>

      <AdSenseSlot slotId="SLOT_RESCISAO_TOPO" className="mb-6" />

      <div className="calc-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Salário bruto (R$)</label>
            <input className="input-field" type="number" min="0" step="0.01" placeholder="ex: 3500,00"
              value={form.salario} onChange={set("salario")} />
          </div>

          <div>
            <label className="label">Nº de dependentes</label>
            <select className="select-field" value={form.dependentes} onChange={set("dependentes")}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n} dependente{n !== 1 ? "s" : ""}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Data de admissão</label>
            <input className="input-field" type="date" value={form.dataAdmissao} onChange={set("dataAdmissao")} />
          </div>

          <div>
            <label className="label">Data de demissão</label>
            <input className="input-field" type="date" value={form.dataDemissao} onChange={set("dataDemissao")} />
          </div>

          <div>
            <label className="label">Saldo FGTS acumulado (R$)</label>
            <input className="input-field" type="number" min="0" step="0.01" placeholder="ex: 8000,00"
              value={form.fgtsAcumulado} onChange={set("fgtsAcumulado")} />
            <p className="text-xs text-forest-400 mt-1">Veja no extrato Caixa/FGTS Digital</p>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <input type="checkbox" id="ferias-vencidas" checked={form.temFeriasVencidas}
              onChange={set("temFeriasVencidas")} className="w-4 h-4 accent-forest-600" />
            <label htmlFor="ferias-vencidas" className="text-sm text-forest-700 cursor-pointer">
              Tem férias vencidas (período anterior não gozado)
            </label>
          </div>
        </div>

        {erro && <p className="mt-4 text-red-600 text-sm font-medium">{erro}</p>}

        <button className="btn-primary mt-6" onClick={handleSubmit}>
          Calcular Rescisão →
        </button>
      </div>

      {resultado && (
        <div className="result-box">
          <p className="text-lime-400 font-display text-lg mb-1">Resultado da Rescisão</p>
          <p className="text-forest-300 text-xs mb-4">
            {resultado.mesesTrabalhados} meses trabalhados · Aviso prévio: {resultado.diasAvisoPrevio} dias
          </p>

          <div className="space-y-0">
            <div className="result-line"><span>Saldo de Salário ({resultado.diasTrabalhados} dias)</span><span className="result-value">{formatBRL(resultado.saldoSalario)}</span></div>
            <div className="result-line"><span>13º Proporcional</span><span className="result-value">{formatBRL(resultado.decimoTerceiroProporcional)}</span></div>
            <div className="result-line"><span>Férias Proporcionais</span><span className="result-value">{formatBRL(resultado.feriasProporcional)}</span></div>
            <div className="result-line"><span>⅓ das Férias Proporcionais</span><span className="result-value">{formatBRL(resultado.tercoFerias)}</span></div>
            {resultado.feriasVencidas > 0 && <>
              <div className="result-line"><span>Férias Vencidas</span><span className="result-value">{formatBRL(resultado.feriasVencidas)}</span></div>
              <div className="result-line"><span>⅓ das Férias Vencidas</span><span className="result-value">{formatBRL(resultado.tercoFeriasVencidas)}</span></div>
            </>}
            <div className="result-line"><span>Aviso Prévio Indenizado ({resultado.diasAvisoPrevio} dias)</span><span className="result-value">{formatBRL(resultado.avisoPrevioIndenizado)}</span></div>
            <div className="result-line"><span>13º sobre Aviso Prévio</span><span className="result-value">{formatBRL(resultado.decimoTerceiroAviso)}</span></div>
            <div className="result-line"><span>FGTS do Mês (8%)</span><span className="result-value">{formatBRL(resultado.fgtsMes)}</span></div>
            <div className="result-line">
              <span>Multa FGTS (40%{resultado.fgtsDeposito > 0 ? ` de ${formatBRL(resultado.fgtsDeposito)}` : ""})</span>
              <span className="result-value">
                {resultado.fgtsDeposito > 0
                  ? formatBRL(resultado.multaFGTS)
                  : <span className="text-yellow-400 text-xs">Informe o saldo FGTS acumulado</span>
                }
              </span>
            </div>
            <div className="result-line text-red-300"><span>(-) Desconto INSS</span><span className="font-mono">- {formatBRL(resultado.descontoINSS)}</span></div>
            <div className="result-line text-red-300"><span>(-) Desconto IRRF</span><span className="font-mono">- {formatBRL(resultado.descontoIRRF)}</span></div>
          </div>

          <div className="result-total">
            <span className="text-cream">Total Líquido a Receber</span>
            <span className="result-value text-2xl">{formatBRL(resultado.totalLiquido)}</span>
          </div>
        </div>
      )}

      <AdSenseSlot slotId="SLOT_RESCISAO_MEIO" className="mt-6" />
      <Disclaimer />
    </div>
  );
}
