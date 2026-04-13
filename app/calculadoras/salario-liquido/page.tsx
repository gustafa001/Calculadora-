"use client";
import { useState } from "react";
import Disclaimer from "../../components/Disclaimer";
import AdSenseSlot from "../../components/AdSenseSlot";
import {
  calcularSalarioLiquido, formatBRL, calcularINSS,
  TABELA_INSS_2024, TABELA_IRRF_2024, type ResultadoSalarioLiquido,
} from "../../lib/calculos-clt";

export default function SalarioLiquidoPage() {
  const [form, setForm] = useState({ salario: "", dependentes: "0", outrosDescontos: "" });
  const [resultado, setResultado] = useState<ResultadoSalarioLiquido | null>(null);
  const [erro, setErro] = useState("");

  function handleSubmit() {
    setErro("");
    const salario = parseFloat(form.salario.replace(",", "."));
    if (!salario || salario <= 0) return setErro("Informe um salário válido.");
    const outros = parseFloat(form.outrosDescontos.replace(",", ".")) || 0;
    setResultado(calcularSalarioLiquido(salario, parseInt(form.dependentes), outros));
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-xs font-mono text-forest-500 uppercase tracking-widest">Calculadora</span>
        <h1 className="section-title mt-1">Salário Líquido</h1>
        <p className="text-forest-600 text-sm leading-relaxed">
          Descubra quanto você recebe na mão após os descontos de INSS e IRRF. Tabelas 2024 atualizadas.
        </p>
      </div>
      <AdSenseSlot slotId="SLOT_SALARIO_TOPO" className="mb-6" />

      <div className="calc-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Salário bruto (R$)</label>
            <input className="input-field" type="number" min="0" step="0.01"
              placeholder="ex: 7500,00" value={form.salario} onChange={set("salario")} />
          </div>
          <div>
            <label className="label">Nº de dependentes</label>
            <select className="select-field" value={form.dependentes} onChange={set("dependentes")}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n} dependente{n !== 1 ? "s" : ""} {n > 0 ? `(- R$ ${(n * 189.59).toFixed(2).replace(".", ",")} na base IRRF)` : ""}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Outros descontos opcionais (R$) — plano de saúde, vale, etc.</label>
            <input className="input-field" type="number" min="0" step="0.01"
              placeholder="ex: 200,00 (opcional)" value={form.outrosDescontos} onChange={set("outrosDescontos")} />
          </div>
        </div>
        {erro && <p className="mt-4 text-red-600 text-sm">{erro}</p>}
        <button className="btn-primary mt-6" onClick={handleSubmit}>Calcular Salário Líquido →</button>
      </div>

      {resultado && (
        <div className="result-box">
          <p className="text-lime-400 font-display text-lg mb-4">Demonstrativo Salarial</p>
          <div className="result-line font-semibold"><span>Salário Bruto</span><span className="result-value">{formatBRL(resultado.salarioBruto)}</span></div>
          <div className="result-line text-red-300"><span>(-) Desconto INSS</span><span className="font-mono">- {formatBRL(resultado.descontoINSS)}</span></div>
          {resultado.descontoDependentes > 0 &&
            <div className="result-line text-forest-300"><span>Dedução dependentes (base IRRF)</span><span className="font-mono">- {formatBRL(resultado.descontoDependentes)}</span></div>
          }
          <div className="result-line text-xs text-forest-400"><span>Base de cálculo IRRF</span><span className="font-mono">{formatBRL(resultado.baseIRRF)}</span></div>
          <div className="result-line text-red-300"><span>(-) Desconto IRRF</span><span className="font-mono">- {formatBRL(resultado.descontoIRRF)}</span></div>
          <div className="result-total border-t border-forest-600 mt-2 pt-3">
            <span>Salário Líquido</span>
            <span className="result-value text-2xl">{formatBRL(resultado.salarioLiquido)}</span>
          </div>
          <div className="mt-4 bg-forest-700 rounded-xl p-3 text-center">
            <p className="text-forest-300 text-xs mb-1">Alíquota efetiva total</p>
            <p className="text-lime-400 font-mono font-bold text-xl">{resultado.aliquotaEfetiva}%</p>
          </div>
        </div>
      )}

      {/* Tabelas de referência */}
      <div className="calc-card mt-6 bg-forest-800/5 border-forest-300/20">
        <h2 className="font-display text-lg text-forest-900 mb-4">Tabelas de Referência 2024</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-forest-800 text-sm mb-2">INSS — Alíquotas Progressivas</p>
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-forest-800 text-cream"><th className="px-2 py-1.5 text-left">Faixa salarial</th><th className="px-2 py-1.5 text-right">Alíquota</th></tr></thead>
              <tbody>
                {[
                  ["Até R$ 1.412,00", "7,5%"],
                  ["R$ 1.412,01 – R$ 2.666,68", "9%"],
                  ["R$ 2.666,69 – R$ 4.000,03", "12%"],
                  ["R$ 4.000,04 – R$ 7.786,02", "14%"],
                ].map(([f, a]) => (
                  <tr key={f} className="border-b border-forest-200">
                    <td className="px-2 py-1.5 text-forest-700">{f}</td>
                    <td className="px-2 py-1.5 text-right font-mono font-semibold text-forest-900">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="font-semibold text-forest-800 text-sm mb-2">IRRF — Faixas de Tributação</p>
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-forest-800 text-cream"><th className="px-2 py-1.5 text-left">Base de cálculo</th><th className="px-2 py-1.5 text-right">Alíquota</th></tr></thead>
              <tbody>
                {[
                  ["Até R$ 2.259,20", "Isento"],
                  ["Até R$ 2.826,65", "7,5%"],
                  ["Até R$ 3.751,05", "15%"],
                  ["Até R$ 4.664,68", "22,5%"],
                  ["Acima de R$ 4.664,68", "27,5%"],
                ].map(([f, a]) => (
                  <tr key={f} className="border-b border-forest-200">
                    <td className="px-2 py-1.5 text-forest-700">{f}</td>
                    <td className="px-2 py-1.5 text-right font-mono font-semibold text-forest-900">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AdSenseSlot slotId="SLOT_SALARIO_MEIO" className="mt-6" />
      <Disclaimer />
    </div>
  );
}
