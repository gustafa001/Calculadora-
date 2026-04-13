/**
 * lib/calculos-clt.ts
 * Lógica de cálculos trabalhistas conforme CLT.
 * Tabelas INSS e IRRF: vigência 2025.
 * ⚠️ Atualizar tabelas a cada janeiro.
 */

// ─────────────────────────────────────────────
// TABELAS 2025
// ─────────────────────────────────────────────

/** Tabela INSS 2025 — alíquotas progressivas (Portaria MPS nº 1.716/2024) */
export const TABELA_INSS_2025 = [
  { ate: 1518.00,  aliquota: 0.075 },
  { ate: 2793.88,  aliquota: 0.09  },
  { ate: 4190.83,  aliquota: 0.12  },
  { ate: 8157.41,  aliquota: 0.14  },
];

/** Tabela IRRF 2025 — bases + deduções fixas (MP 1.294/2025 — vigência março/2025) */
export const TABELA_IRRF_2025 = [
  { ate: 2824.00,   aliquota: 0,     deducao: 0       },
  { ate: 3751.05,   aliquota: 0.075, deducao: 211.80  },
  { ate: 4664.68,   aliquota: 0.15,  deducao: 492.80  },
  { ate: 4664.68,   aliquota: 0.225, deducao: 692.78  },
  { ate: Infinity,  aliquota: 0.275, deducao: 926.00  },
];

export const DEDUCAO_DEPENDENTE_IRRF = 189.59;

// ─────────────────────────────────────────────
// INSS (progressivo)
// ─────────────────────────────────────────────

export function calcularINSS(salarioBruto: number): number {
  const teto = 8157.41;
  const base = Math.min(salarioBruto, teto);

  let inss = 0;
  let faixaAnterior = 0;

  for (const faixa of TABELA_INSS_2025) {
    if (base <= faixaAnterior) break;
    const parcela = Math.min(base, faixa.ate) - faixaAnterior;
    inss += parcela * faixa.aliquota;
    faixaAnterior = faixa.ate;
  }

  return round2(inss);
}

// ─────────────────────────────────────────────
// IRRF
// ─────────────────────────────────────────────

export function calcularIRRF(
  salarioBruto: number,
  inss: number,
  dependentes = 0
): number {
  const baseCalculo =
    salarioBruto - inss - dependentes * DEDUCAO_DEPENDENTE_IRRF;

  if (baseCalculo <= 0) return 0;

  for (const faixa of TABELA_IRRF_2025) {
    if (baseCalculo <= faixa.ate) {
      const irrf = baseCalculo * faixa.aliquota - faixa.deducao;
      return round2(Math.max(0, irrf));
    }
  }

  return 0;
}

// ─────────────────────────────────────────────
// AVISO PRÉVIO (Lei 12.506/2011)
// ─────────────────────────────────────────────

export function calcularDiasAvisoPrevio(anosCompletos: number): number {
  // 30 dias + 3 dias por ano trabalhado acima do 1º, máximo 90 dias
  const extra = Math.min(anosCompletos * 3, 60);
  return 30 + extra;
}

// ─────────────────────────────────────────────
// RESCISÃO SEM JUSTA CAUSA
// ─────────────────────────────────────────────

export interface ResultadoRescisao {
  saldoSalario: number;
  decimoTerceiroProporcional: number;
  feriasProporcional: number;
  tercoFerias: number;
  feriasVencidas: number;
  tercoFeriasVencidas: number;
  avisoPrevioIndenizado: number;
  decimoTerceiroAviso: number;
  fgtsDeposito: number;
  fgtsMes: number;
  multaFGTS: number;
  totalBruto: number;
  descontoINSS: number;
  descontoIRRF: number;
  totalLiquido: number;
  diasAvisoPrevio: number;
  // detalhes
  mesesTrabalhados: number;
  diasTrabalhados: number;
}

/** Função auxiliar para contagem calendária real de meses */
function mesesEntreAniversarios(inicio: Date, fim: Date): number {
  let meses = 0;
  const cursor = new Date(inicio);
  while (true) {
    cursor.setMonth(cursor.getMonth() + 1);
    if (cursor > fim) break;
    meses++;
  }
  return meses;
}

export function calcularRescisao(params: {
  salario: number;
  dataAdmissao: Date;
  dataDemissao: Date;
  temFeriasVencidas: boolean;
  fgtsAcumulado: number;
  dependentes?: number;
}): ResultadoRescisao {
  const {
    salario,
    dataAdmissao,
    dataDemissao,
    temFeriasVencidas,
    fgtsAcumulado,
    dependentes = 0,
  } = params;

  // Tempo de serviço
  const diffMs = dataDemissao.getTime() - dataAdmissao.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const anosCompletos = Math.floor(diffDays / 365);

  // Meses avulsas (dentro do ano corrente de trabalho)
  const ultimoAniversario = new Date(dataAdmissao);
  ultimoAniversario.setFullYear(ultimoAniversario.getFullYear() + anosCompletos);
  
  // Bug 2: Contagem de meses proporcionais usando calendário real
  const mesesProporcional = mesesEntreAniversarios(ultimoAniversario, dataDemissao);

  // Bug 3: Dias trabalhados entre o último aniversário e a demissão
  let diasTrabalhados = Math.floor(
    (dataDemissao.getTime() - ultimoAniversario.getTime()) /
    (1000 * 60 * 60 * 24)
  ) - mesesProporcional * 30 + 1; // +1 para incluir o dia da demissão
  diasTrabalhados = Math.max(0, Math.min(30, diasTrabalhados));

  const saldoSalario = round2((salario / 30) * diasTrabalhados);

  // 13º proporcional (meses + dias)
  // Para o 13º, considera-se o mês se trabalhou 15 dias ou mais no mês civil
  const diasNoMesDemissao = dataDemissao.getDate();
  const mesesDecimo = mesesProporcional + (diasNoMesDemissao >= 15 ? 1 : 0);
  const decimoTerceiroProporcional = round2((salario / 12) * mesesDecimo);

  // Férias proporcionais
  const mesesFerias = mesesProporcional + (diasNoMesDemissao >= 15 ? 1 : 0);
  const feriasProporcional = round2((salario / 12) * mesesFerias);
  const tercoFerias = round2(feriasProporcional / 3);

  // Férias vencidas (período aquisitivo anterior não gozado)
  const feriasVencidas = temFeriasVencidas ? salario : 0;
  const tercoFeriasVencidas = temFeriasVencidas ? round2(salario / 3) : 0;

  // Aviso prévio indenizado
  const diasAviso = calcularDiasAvisoPrevio(anosCompletos);
  const avisoPrevioIndenizado = round2((salario / 30) * diasAviso);

  // 13º sobre aviso prévio (proporcional dos dias de aviso)
  const mesesAviso = Math.ceil(diasAviso / 30);
  const decimoTerceiroAviso = round2((salario / 12) * mesesAviso);

  // Bug 1: FGTS do mês sobre saldo de salário
  const fgtsMes = round2(saldoSalario * 0.08);

  // Multa FGTS 40% sobre saldo acumulado
  const fgtsDeposito = fgtsAcumulado;
  const multaFGTS = round2(fgtsAcumulado * 0.4);

  // Total bruto
  const totalBruto =
    saldoSalario +
    decimoTerceiroProporcional +
    feriasProporcional +
    tercoFerias +
    feriasVencidas +
    tercoFeriasVencidas +
    avisoPrevioIndenizado +
    decimoTerceiroAviso +
    fgtsMes +
    multaFGTS;

  // Bug 4: Base de INSS/IRRF completa na rescisão
  const baseDesconto =
    saldoSalario +
    decimoTerceiroProporcional +
    feriasProporcional +
    feriasVencidas +
    avisoPrevioIndenizado +
    decimoTerceiroAviso;

  const descontoINSS = calcularINSS(baseDesconto);
  const descontoIRRF = calcularIRRF(baseDesconto, descontoINSS, dependentes);

  const totalLiquido = round2(totalBruto - descontoINSS - descontoIRRF);

  return {
    saldoSalario,
    decimoTerceiroProporcional,
    feriasProporcional,
    tercoFerias,
    feriasVencidas,
    tercoFeriasVencidas,
    avisoPrevioIndenizado,
    decimoTerceiroAviso,
    fgtsDeposito,
    fgtsMes,
    multaFGTS,
    totalBruto,
    descontoINSS,
    descontoIRRF,
    totalLiquido,
    diasAvisoPrevio: diasAviso,
    mesesTrabalhados: anosCompletos * 12 + mesesProporcional,
    diasTrabalhados,
  };
}

// ─────────────────────────────────────────────
// 13º SALÁRIO
// ─────────────────────────────────────────────

export interface ResultadoDecimoTerceiro {
  bruto: number;
  inss: number;
  irrf: number;
  liquido: number;
  mesesConsiderados: number;
  // Parcelas
  primeiraParcela: number;
  segundaParcela: number;
}

export function calcularDecimoTerceiro(
  salario: number,
  meses: number, // 1-12
  dependentes = 0,
  jaPagouPrimeiraParcela = false
): ResultadoDecimoTerceiro {
  const bruto = round2((salario / 12) * meses);
  const inss = calcularINSS(bruto);
  const irrf = calcularIRRF(bruto, inss, dependentes);
  const liquido = round2(bruto - inss - irrf);

  // 1ª parcela = metade do bruto, sem desconto
  const primeiraParcela = round2(bruto / 2);
  // 2ª parcela = restante após descontos
  const segundaParcela = jaPagouPrimeiraParcela
    ? round2(liquido - primeiraParcela)
    : round2(liquido / 2);

  return { bruto, inss, irrf, liquido, mesesConsiderados: meses, primeiraParcela, segundaParcela };
}

// ─────────────────────────────────────────────
// FÉRIAS
// ─────────────────────────────────────────────

export interface ResultadoFerias {
  salarioFerias: number;
  terco: number;
  totalBrutoFerias: number;
  abonoPecuniario: number;    // 1/3 das férias vendidas (opcional)
  tercoAbono: number;
  inss: number;
  irrf: number;
  totalLiquido: number;
}

export function calcularFerias(
  salario: number,
  diasFerias: number, // padrão 30
  venderAbono: boolean, // vender 1/3 das férias
  dependentes = 0
): ResultadoFerias {
  // Proporcional ao período de férias
  const salarioFerias = round2((salario / 30) * diasFerias);
  const terco = round2(salarioFerias / 3);

  let abonoPecuniario = 0;
  let tercoAbono = 0;

  if (venderAbono) {
    // Abono = 10 dias de salário (1/3 de 30) + 1/3
    abonoPecuniario = round2((salario / 30) * 10);
    tercoAbono = round2(abonoPecuniario / 3);
  }

  const totalBrutoFerias = salarioFerias + terco;
  const baseINSS = salarioFerias + terco; // abono não incide INSS

  const inss = calcularINSS(baseINSS);
  const irrf = calcularIRRF(baseINSS, inss, dependentes);

  const totalLiquido = round2(
    totalBrutoFerias + abonoPecuniario + tercoAbono - inss - irrf
  );

  return {
    salarioFerias,
    terco,
    totalBrutoFerias,
    abonoPecuniario,
    tercoAbono,
    inss,
    irrf,
    totalLiquido,
  };
}

// ─────────────────────────────────────────────
// HORA EXTRA
// ─────────────────────────────────────────────

export interface ResultadoHoraExtra {
  valorHoraNormal: number;
  adicional: number;
  valorHoraExtra: number;
  totalHorasExtras: number;
  totalBruto: number;
}

export function calcularHoraExtra(
  salario: number,
  horasSemanais: number, // 44
  qtdHorasExtras: number,
  tipo: "50" | "100" | "noturna"
): ResultadoHoraExtra {
  const horasMensais = (horasSemanais / 7) * 30;
  const valorHoraNormal = round2(salario / horasMensais);

  let adicionalPct: number;
  switch (tipo) {
    case "100":     adicionalPct = 1.0;  break;
    case "noturna": adicionalPct = 0.5 + 0.2; break; // HE 50% + noturno 20%
    default:        adicionalPct = 0.5;  break;
  }

  const valorHoraExtra = round2(valorHoraNormal * (1 + adicionalPct));
  const totalBruto = round2(valorHoraExtra * qtdHorasExtras);

  return {
    valorHoraNormal,
    adicional: adicionalPct * 100,
    valorHoraExtra,
    totalHorasExtras: qtdHorasExtras,
    totalBruto,
  };
}

// ─────────────────────────────────────────────
// FGTS
// ─────────────────────────────────────────────

export interface ResultadoFGTS {
  depositoMensal: number;
  totalAcumulado: number;
  multaRescisao: number;
  totalComMulta: number;
  meses: number;
}

export function calcularFGTS(
  salario: number,
  meses: number
): ResultadoFGTS {
  const depositoMensal = round2(salario * 0.08);
  const totalAcumulado = round2(depositoMensal * meses);
  const multaRescisao = round2(totalAcumulado * 0.4);

  return {
    depositoMensal,
    totalAcumulado,
    multaRescisao,
    totalComMulta: round2(totalAcumulado + multaRescisao),
    meses,
  };
}

// ─────────────────────────────────────────────
// AVISO PRÉVIO
// ─────────────────────────────────────────────

export interface ResultadoAvisoPrevio {
  diasAviso: number;
  valorDiario: number;
  valorIndenizado: number;
  decimoTerceiroAviso: number;
  fgtsAviso: number;
  totalIndenizado: number;
}

export function calcularAvisoPrevio(
  salario: number,
  anosCompletos: number
): ResultadoAvisoPrevio {
  const diasAviso = calcularDiasAvisoPrevio(anosCompletos);
  const valorDiario = round2(salario / 30);
  const valorIndenizado = round2(valorDiario * diasAviso);

  const mesesAviso = Math.ceil(diasAviso / 30);
  const decimoTerceiroAviso = round2((salario / 12) * mesesAviso);
  const fgtsAviso = round2(valorIndenizado * 0.08);

  return {
    diasAviso,
    valorDiario,
    valorIndenizado,
    decimoTerceiroAviso,
    fgtsAviso,
    totalIndenizado: round2(valorIndenizado + decimoTerceiroAviso + fgtsAviso),
  };
}

// ─────────────────────────────────────────────
// SALÁRIO LÍQUIDO
// ─────────────────────────────────────────────

export interface ResultadoSalarioLiquido {
  salarioBruto: number;
  descontoINSS: number;
  baseIRRF: number;
  descontoIRRF: number;
  descontoDependentes: number;
  salarioLiquido: number;
  aliquotaEfetiva: number;
}

export function calcularSalarioLiquido(
  salario: number,
  dependentes = 0,
  outrosDescontos = 0
): ResultadoSalarioLiquido {
  const descontoINSS = calcularINSS(salario);
  const descontoDependentes = dependentes * DEDUCAO_DEPENDENTE_IRRF;
  const baseIRRF = round2(salario - descontoINSS - descontoDependentes);
  const descontoIRRF = calcularIRRF(salario, descontoINSS, dependentes);

  const totalDescontos = descontoINSS + descontoIRRF + outrosDescontos;
  const salarioLiquido = round2(salario - totalDescontos);
  const aliquotaEfetiva = round2((totalDescontos / salario) * 100);

  return {
    salarioBruto: salario,
    descontoINSS,
    baseIRRF,
    descontoIRRF,
    descontoDependentes,
    salarioLiquido,
    aliquotaEfetiva,
  };
}

// ─────────────────────────────────────────────
// UTILITÁRIOS
// ─────────────────────────────────────────────

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
