"use client";
import { useState } from "react";
import Disclaimer from "../../components/Disclaimer";
import AdSenseSlot from "../../components/AdSenseSlot";
import { calcularDecimoTerceiro, formatBRL, type ResultadoDecimoTerceiro } from "../../lib/calculos-clt";

export default function DecimoTerceiroPage() {
  const [form, setForm] = useState({ salario: "", meses: "12", dependentes: "0", jaPagouPrimeira: false });
  const [resultado, setResultado] = useState<ResultadoDecimoTerceiro | null>(null);
  const [erro, setErro] = useState("");

  function handleSubmit() {
    setErro("");
    const salario = parseFloat(form.salario.replace(",", "."));
    if (!salario || salario <= 0) return setErro("Informe um salário válido.");
    setResultado(calcularDecimoTerceiro(salario, parseInt(form.meses), parseInt(form.dependentes), form.jaPagouPrimeira));
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [field]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-xs font-mono text-forest-500 uppercase tracking-widest">Calculadora</span>
        <h1 className="section-title mt-1">13º Salário Proporcional</h1>
        <p className="text-forest-600 text-sm leading-relaxed">Calcule o décimo terceiro salário com descontos de INSS e IRRF 2024.</p>
      </div>
      <AdSenseSlot slotId="SLOT_DECIMO_TOPO" className="mb-6" />
      <div className="calc-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Salário bruto (R$)</label>
            <input className="input-field" type="number" min="0" step="0.01" placeholder="ex: 4200,00" value={form.salario} onChange={set("salario")} />
          </div>
          <div>
            <label className="label">Meses trabalhados no ano</label>
            <select className="select-field" value={form.meses} onChange={set("meses")}>
              {Array.from({length: 12}, (_, i) => i+1).map(m => <option key={m} value={m}>{m} {m === 1 ? "mês" : "meses"}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Nº de dependentes</label>
            <select className="select-field" value={form.dependentes} onChange={set("dependentes")}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <input type="checkbox" id="primeira" checked={form.jaPagouPrimeira} onChange={set("jaPagouPrimeira")} className="w-4 h-4 accent-forest-600" />
            <label htmlFor="primeira" className="text-sm text-forest-700 cursor-pointer">1ª parcela já foi paga</label>
          </div>
        </div>
        {erro && <p className="mt-4 text-red-600 text-sm">{erro}</p>}
        <button className="btn-primary mt-6" onClick={handleSubmit}>Calcular 13º →</button>
      </div>

      {resultado && (
        <div className="result-box">
          <p className="text-lime-400 font-display text-lg mb-4">Resultado do 13º Salário</p>
          <div className="result-line"><span>13º Bruto ({resultado.mesesConsiderados}/12 avos)</span><span className="result-value">{formatBRL(resultado.bruto)}</span></div>
          <div className="result-line text-red-300"><span>(-) Desconto INSS</span><span className="font-mono">- {formatBRL(resultado.inss)}</span></div>
          <div className="result-line text-red-300"><span>(-) Desconto IRRF</span><span className="font-mono">- {formatBRL(resultado.irrf)}</span></div>
          <div className="result-total border-t border-forest-600 mt-2 pt-3">
            <span>13º Líquido Total</span><span className="result-value text-2xl">{formatBRL(resultado.liquido)}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-forest-700 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-forest-700 rounded-xl p-3">
              <p className="text-forest-300 text-xs mb-1">1ª Parcela (nov)</p>
              <p className="result-value text-base">{formatBRL(resultado.primeiraParcela)}</p>
            </div>
            <div className="bg-forest-700 rounded-xl p-3">
              <p className="text-forest-300 text-xs mb-1">2ª Parcela (dez)</p>
              <p className="result-value text-base">{formatBRL(resultado.segundaParcela)}</p>
            </div>
          </div>
        </div>
      )}
      <AdSenseSlot slotId="SLOT_DECIMO_MEIO" className="mt-6" />
      <Disclaimer />
    </div>
  );
}
