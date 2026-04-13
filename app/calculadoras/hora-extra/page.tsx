"use client";
import { useState } from "react";
import Disclaimer from "../../components/Disclaimer";
import AdSenseSlot from "../../components/AdSenseSlot";
import { calcularHoraExtra, formatBRL, type ResultadoHoraExtra } from "../../lib/calculos-clt";

export default function HoraExtraPage() {
  const [form, setForm] = useState({ salario: "", horasSemanais: "44", qtdHoras: "", tipo: "50" as "50" | "100" | "noturna" });
  const [resultado, setResultado] = useState<ResultadoHoraExtra | null>(null);
  const [erro, setErro] = useState("");

  function handleSubmit() {
    setErro("");
    const salario = parseFloat(form.salario.replace(",", "."));
    const qtd = parseFloat(form.qtdHoras.replace(",", "."));
    if (!salario || salario <= 0) return setErro("Informe um salário válido.");
    if (!qtd || qtd <= 0) return setErro("Informe a quantidade de horas extras.");
    setResultado(calcularHoraExtra(salario, parseInt(form.horasSemanais), qtd, form.tipo));
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }));

  const tiposLabel: Record<string, string> = { "50": "50% (dias úteis)", "100": "100% (domingos/feriados)", "noturna": "Noturna (50% + 20%)" };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-xs font-mono text-forest-500 uppercase tracking-widest">Calculadora</span>
        <h1 className="section-title mt-1">Hora Extra</h1>
        <p className="text-forest-600 text-sm leading-relaxed">
          Calcule o valor das horas extras com 50% (dias úteis), 100% (domingos e feriados) ou adicional noturno.
        </p>
      </div>
      <AdSenseSlot slotId="SLOT_HORAEXTRA_TOPO" className="mb-6" />
      <div className="calc-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Salário bruto (R$)</label>
            <input className="input-field" type="number" min="0" step="0.01" placeholder="ex: 2800,00" value={form.salario} onChange={set("salario")} />
          </div>
          <div>
            <label className="label">Jornada semanal</label>
            <select className="select-field" value={form.horasSemanais} onChange={set("horasSemanais")}>
              <option value="44">44h semanais (padrão CLT)</option>
              <option value="40">40h semanais</option>
              <option value="36">36h semanais</option>
              <option value="30">30h semanais</option>
            </select>
          </div>
          <div>
            <label className="label">Quantidade de horas extras</label>
            <input className="input-field" type="number" min="0" step="0.5" placeholder="ex: 10" value={form.qtdHoras} onChange={set("qtdHoras")} />
          </div>
          <div>
            <label className="label">Tipo de hora extra</label>
            <select className="select-field" value={form.tipo} onChange={set("tipo")}>
              <option value="50">50% — Dias úteis</option>
              <option value="100">100% — Domingos e feriados</option>
              <option value="noturna">Noturna (50% + 20%)</option>
            </select>
          </div>
        </div>
        {erro && <p className="mt-4 text-red-600 text-sm">{erro}</p>}
        <button className="btn-primary mt-6" onClick={handleSubmit}>Calcular Hora Extra →</button>
      </div>

      {resultado && (
        <div className="result-box">
          <p className="text-lime-400 font-display text-lg mb-4">Resultado — Hora Extra {tiposLabel[form.tipo]}</p>
          <div className="result-line"><span>Valor da hora normal</span><span className="result-value">{formatBRL(resultado.valorHoraNormal)}</span></div>
          <div className="result-line"><span>Adicional</span><span className="result-value">+{resultado.adicional.toFixed(0)}%</span></div>
          <div className="result-line"><span>Valor da hora extra</span><span className="result-value">{formatBRL(resultado.valorHoraExtra)}</span></div>
          <div className="result-line"><span>Quantidade de horas</span><span className="result-value">{resultado.totalHorasExtras}h</span></div>
          <div className="result-total border-t border-forest-600 mt-2 pt-3">
            <span>Total a Receber</span><span className="result-value text-2xl">{formatBRL(resultado.totalBruto)}</span>
          </div>
          <p className="text-xs text-forest-400 mt-3">* Valor bruto. Será acrescido ao salário do mês e sofrerá desconto de INSS e IRRF na folha.</p>
        </div>
      )}
      <AdSenseSlot slotId="SLOT_HORAEXTRA_MEIO" className="mt-6" />
      <Disclaimer />
    </div>
  );
}
