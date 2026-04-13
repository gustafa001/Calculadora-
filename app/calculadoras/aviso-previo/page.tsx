"use client";
import { useState } from "react";
import Disclaimer from "../../components/Disclaimer";
import AdSenseSlot from "../../components/AdSenseSlot";
import { calcularAvisoPrevio, formatBRL, type ResultadoAvisoPrevio } from "../../lib/calculos-clt";

export default function AvisoPrevioPage() {
  const [form, setForm] = useState({ salario: "", anos: "" });
  const [resultado, setResultado] = useState<ResultadoAvisoPrevio | null>(null);
  const [erro, setErro] = useState("");

  function handleSubmit() {
    setErro("");
    const salario = parseFloat(form.salario.replace(",", "."));
    const anos = parseInt(form.anos);
    if (!salario || salario <= 0) return setErro("Informe um salário válido.");
    if (isNaN(anos) || anos < 0) return setErro("Informe os anos trabalhados.");
    setResultado(calcularAvisoPrevio(salario, anos));
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-xs font-mono text-forest-500 uppercase tracking-widest">Calculadora</span>
        <h1 className="section-title mt-1">Aviso Prévio Proporcional</h1>
        <p className="text-forest-600 text-sm leading-relaxed">
          Calcule o aviso prévio indenizado conforme a <strong>Lei 12.506/2011</strong>: 30 dias base + 3 dias por ano trabalhado (máximo 90 dias).
        </p>
      </div>
      <AdSenseSlot slotId="SLOT_AVISO_TOPO" className="mb-6" />

      <div className="calc-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Salário bruto (R$)</label>
            <input className="input-field" type="number" min="0" step="0.01"
              placeholder="ex: 6000,00" value={form.salario} onChange={set("salario")} />
          </div>
          <div>
            <label className="label">Anos completos trabalhados</label>
            <input className="input-field" type="number" min="0" max="40" step="1"
              placeholder="ex: 5" value={form.anos} onChange={set("anos")} />
            <p className="text-xs text-forest-400 mt-1">Conte apenas anos completos</p>
          </div>
        </div>
        {erro && <p className="mt-4 text-red-600 text-sm">{erro}</p>}
        <button className="btn-primary mt-6" onClick={handleSubmit}>Calcular Aviso Prévio →</button>
      </div>

      {resultado && (
        <div className="result-box">
          <p className="text-lime-400 font-display text-lg mb-4">Resultado — Aviso Prévio Indenizado</p>
          <div className="result-line"><span>Dias de aviso prévio</span><span className="result-value">{resultado.diasAviso} dias</span></div>
          <div className="result-line"><span>Valor por dia</span><span className="result-value">{formatBRL(resultado.valorDiario)}</span></div>
          <div className="result-line"><span>Aviso prévio indenizado</span><span className="result-value">{formatBRL(resultado.valorIndenizado)}</span></div>
          <div className="result-line"><span>13º proporcional s/ aviso</span><span className="result-value">{formatBRL(resultado.decimoTerceiroAviso)}</span></div>
          <div className="result-line"><span>FGTS s/ aviso (8%)</span><span className="result-value">{formatBRL(resultado.fgtsAviso)}</span></div>
          <div className="result-total border-t border-forest-600 mt-2 pt-3">
            <span>Total Indenizado</span>
            <span className="result-value text-2xl">{formatBRL(resultado.totalIndenizado)}</span>
          </div>
        </div>
      )}

      <div className="calc-card mt-6 bg-forest-800/5 border-forest-300/20">
        <h2 className="font-display text-lg text-forest-900 mb-3">Regra da Lei 12.506/2011</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-forest-700 border-collapse">
            <thead>
              <tr className="bg-forest-800 text-cream">
                <th className="px-3 py-2 text-left rounded-tl-lg">Anos trabalhados</th>
                <th className="px-3 py-2 text-right rounded-tr-lg">Dias de aviso</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Menos de 1 ano", 30],
                ["1 ano", 33],
                ["2 anos", 36],
                ["5 anos", 45],
                ["10 anos", 60],
                ["20 anos (máximo)", 90],
              ].map(([label, dias]) => (
                <tr key={label as string} className="border-b border-forest-200">
                  <td className="px-3 py-2">{label}</td>
                  <td className="px-3 py-2 text-right font-mono font-semibold text-forest-800">{dias} dias</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdSenseSlot slotId="SLOT_AVISO_MEIO" className="mt-6" />
      <Disclaimer />
    </div>
  );
}
