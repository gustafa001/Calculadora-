"use client";
import { useState } from "react";
import Disclaimer from "../../components/Disclaimer";
import AdSenseSlot from "../../components/AdSenseSlot";
import { calcularFGTS, formatBRL, type ResultadoFGTS } from "../../lib/calculos-clt";

export default function FGTSPage() {
  const [form, setForm] = useState({ salario: "", meses: "" });
  const [resultado, setResultado] = useState<ResultadoFGTS | null>(null);
  const [erro, setErro] = useState("");

  function handleSubmit() {
    setErro("");
    const salario = parseFloat(form.salario.replace(",", "."));
    const meses = parseInt(form.meses);
    if (!salario || salario <= 0) return setErro("Informe um salário válido.");
    if (!meses || meses <= 0) return setErro("Informe os meses trabalhados.");
    setResultado(calcularFGTS(salario, meses));
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-xs font-mono text-forest-500 uppercase tracking-widest">Calculadora</span>
        <h1 className="section-title mt-1">FGTS Acumulado</h1>
        <p className="text-forest-600 text-sm leading-relaxed">
          Calcule o saldo do FGTS acumulado com 8% do salário bruto por mês e a multa rescisória de 40%.
        </p>
      </div>
      <AdSenseSlot slotId="SLOT_FGTS_TOPO" className="mb-6" />

      <div className="calc-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Salário bruto médio (R$)</label>
            <input className="input-field" type="number" min="0" step="0.01"
              placeholder="ex: 5000,00" value={form.salario} onChange={set("salario")} />
            <p className="text-xs text-forest-400 mt-1">Use a média se houve reajustes</p>
          </div>
          <div>
            <label className="label">Meses trabalhados</label>
            <input className="input-field" type="number" min="1" step="1"
              placeholder="ex: 24" value={form.meses} onChange={set("meses")} />
          </div>
        </div>
        {erro && <p className="mt-4 text-red-600 text-sm">{erro}</p>}
        <button className="btn-primary mt-6" onClick={handleSubmit}>Calcular FGTS →</button>
      </div>

      {resultado && (
        <div className="result-box">
          <p className="text-lime-400 font-display text-lg mb-4">Resultado do FGTS</p>
          <div className="result-line"><span>Depósito mensal (8%)</span><span className="result-value">{formatBRL(resultado.depositoMensal)}</span></div>
          <div className="result-line"><span>Período considerado</span><span className="result-value">{resultado.meses} meses</span></div>
          <div className="result-line"><span>Saldo total acumulado</span><span className="result-value">{formatBRL(resultado.totalAcumulado)}</span></div>
          <div className="result-line"><span>Multa rescisória (40%)</span><span className="result-value">{formatBRL(resultado.multaRescisao)}</span></div>
          <div className="result-total border-t border-forest-600 mt-2 pt-3">
            <span>FGTS + Multa (demissão)</span>
            <span className="result-value text-2xl">{formatBRL(resultado.totalComMulta)}</span>
          </div>
          <p className="text-xs text-forest-400 mt-3">
            * Estimativa baseada em salário fixo. O saldo real está disponível no app FGTS (Caixa) ou no extrato do FGTS Digital.
          </p>
        </div>
      )}

      <div className="calc-card mt-6 bg-forest-800/5 border-forest-300/20">
        <h2 className="font-display text-lg text-forest-900 mb-3">Como funciona o FGTS?</h2>
        <div className="text-sm text-forest-600 space-y-2 leading-relaxed">
          <p>O empregador deposita mensalmente <strong>8%</strong> do salário bruto em conta vinculada na Caixa Econômica Federal.</p>
          <p>Em caso de <strong>demissão sem justa causa</strong>, o trabalhador recebe o saldo + <strong>multa de 40%</strong> sobre o total.</p>
          <p>O saque também é permitido em casos como: aposentadoria, doenças graves, compra da casa própria e calamidade pública.</p>
        </div>
      </div>

      <AdSenseSlot slotId="SLOT_FGTS_MEIO" className="mt-6" />
      <Disclaimer />
    </div>
  );
}
