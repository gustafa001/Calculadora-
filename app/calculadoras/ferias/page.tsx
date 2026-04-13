"use client";
import { useState } from "react";
import Disclaimer from "../../components/Disclaimer";
import AdSenseSlot from "../../components/AdSenseSlot";
import { calcularFerias, formatBRL, type ResultadoFerias } from "../../lib/calculos-clt";

export default function FeriasPage() {
  const [form, setForm] = useState({ salario: "", diasFerias: "30", venderAbono: false, dependentes: "0" });
  const [resultado, setResultado] = useState<ResultadoFerias | null>(null);
  const [erro, setErro] = useState("");

  function handleSubmit() {
    setErro("");
    const salario = parseFloat(form.salario.replace(",", "."));
    if (!salario || salario <= 0) return setErro("Informe um salário válido.");
    setResultado(calcularFerias(salario, parseInt(form.diasFerias), form.venderAbono, parseInt(form.dependentes)));
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [field]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-xs font-mono text-forest-500 uppercase tracking-widest">Calculadora</span>
        <h1 className="section-title mt-1">Férias + ⅓ Constitucional</h1>
        <p className="text-forest-600 text-sm leading-relaxed">
          Calcule o valor das suas férias com acréscimo obrigatório de ⅓. Inclui opção de abono pecuniário (venda de 10 dias).
        </p>
      </div>
      <AdSenseSlot slotId="SLOT_FERIAS_TOPO" className="mb-6" />
      <div className="calc-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Salário bruto (R$)</label>
            <input className="input-field" type="number" min="0" step="0.01" placeholder="ex: 3000,00" value={form.salario} onChange={set("salario")} />
          </div>
          <div>
            <label className="label">Dias de férias</label>
            <select className="select-field" value={form.diasFerias} onChange={set("diasFerias")}>
              <option value="30">30 dias (completo)</option>
              <option value="20">20 dias (com abono)</option>
              <option value="15">15 dias (parcelado)</option>
            </select>
          </div>
          <div>
            <label className="label">Nº de dependentes</label>
            <select className="select-field" value={form.dependentes} onChange={set("dependentes")}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <input type="checkbox" id="abono" checked={form.venderAbono} onChange={set("venderAbono")} className="w-4 h-4 accent-forest-600" />
            <label htmlFor="abono" className="text-sm text-forest-700 cursor-pointer">Vender ⅓ (abono pecuniário — 10 dias)</label>
          </div>
        </div>
        {erro && <p className="mt-4 text-red-600 text-sm">{erro}</p>}
        <button className="btn-primary mt-6" onClick={handleSubmit}>Calcular Férias →</button>
      </div>

      {resultado && (
        <div className="result-box">
          <p className="text-lime-400 font-display text-lg mb-4">Resultado das Férias</p>
          <div className="result-line"><span>Salário de Férias</span><span className="result-value">{formatBRL(resultado.salarioFerias)}</span></div>
          <div className="result-line"><span>⅓ Constitucional</span><span className="result-value">{formatBRL(resultado.terco)}</span></div>
          {resultado.abonoPecuniario > 0 && <>
            <div className="result-line"><span>Abono Pecuniário (10 dias)</span><span className="result-value">{formatBRL(resultado.abonoPecuniario)}</span></div>
            <div className="result-line"><span>⅓ do Abono</span><span className="result-value">{formatBRL(resultado.tercoAbono)}</span></div>
          </>}
          <div className="result-line text-red-300"><span>(-) Desconto INSS</span><span className="font-mono">- {formatBRL(resultado.inss)}</span></div>
          <div className="result-line text-red-300"><span>(-) Desconto IRRF</span><span className="font-mono">- {formatBRL(resultado.irrf)}</span></div>
          <div className="result-total border-t border-forest-600 mt-2 pt-3">
            <span>Total Líquido</span><span className="result-value text-2xl">{formatBRL(resultado.totalLiquido)}</span>
          </div>
        </div>
      )}
      <AdSenseSlot slotId="SLOT_FERIAS_MEIO" className="mt-6" />
      <Disclaimer />
    </div>
  );
}
