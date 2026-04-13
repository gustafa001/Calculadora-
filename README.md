# 🧮 CalcTrabalhista — Next.js 14

Site de calculadoras trabalhistas brasileiras com AdSense, SEO e conformidade LGPD.

---

## 🚀 Instalação

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produção
npm start          # servidor produção
```

**Deploy recomendado:** Vercel (gratuito para projetos Next.js)

---

## ✅ Checklist pré-lançamento

### 1. Configurar URL do site
Substitua `https://calculadortrabalhista.com.br` pela sua URL real em:
- `app/layout.tsx` → `metadataBase`
- `app/sitemap.ts` → `BASE_URL`
- `app/robots.ts` → `sitemap`

### 2. Configurar AdSense
1. Acesse [Google AdSense](https://adsense.google.com) e crie uma conta
2. Adicione seu site e aguarde aprovação (1–14 dias)
3. Após aprovação, substitua `ca-pub-XXXXXXXXXXXXXXXXXX` pelo seu Publisher ID em:
   - `app/layout.tsx`
   - `app/components/AdSenseSlot.tsx`
4. Crie os **Ad Units** no painel AdSense e substitua os `slotId` nos componentes:
   - `SLOT_HORIZONTAL_TOPO` → ID do slot do topo da homepage
   - `SLOT_RESCISAO_TOPO`, `SLOT_RESCISAO_MEIO` → slots da página de rescisão
   - (e assim por diante para cada calculadora)

### 3. Termos de Uso
- Em `app/termos/page.tsx`, substitua `[sua cidade]` pelo foro correto.

### 4. Privacidade
- Em `app/privacidade/page.tsx`, substitua o e-mail de contato pelo seu.

### 5. Adicionar ao Google Search Console
1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione seu domínio e verifique a propriedade
3. Envie o sitemap: `https://seusite.com.br/sitemap.xml`

---

## 📊 Estrutura de Calculadoras

| Calculadora | Rota | Conteúdo |
|---|---|---|
| Rescisão s/ Justa Causa | `/calculadoras/rescisao` | Saldo, 13º, férias, aviso, FGTS+multa |
| 13º Salário | `/calculadoras/decimo-terceiro` | Bruto, INSS, IRRF, 1ª e 2ª parcelas |
| Férias + ⅓ | `/calculadoras/ferias` | Férias, terço, abono pecuniário |
| Hora Extra | `/calculadoras/hora-extra` | 50%, 100%, noturna |
| FGTS | `/calculadoras/fgts` | Acumulado, multa 40% |
| Aviso Prévio | `/calculadoras/aviso-previo` | Lei 12.506/2011 |
| Salário Líquido | `/calculadoras/salario-liquido` | INSS + IRRF 2024 |

---

## 🗓️ Manutenção Anual (janeiro)

Toda virada de ano, atualize as tabelas em `app/lib/calculos-clt.ts`:

```typescript
// Tabela INSS — atualizar faixas e alíquotas
export const TABELA_INSS_2025 = [ ... ]

// Tabela IRRF — atualizar faixas e deduções
export const TABELA_IRRF_2025 = [ ... ]

// Dedução por dependente
export const DEDUCAO_DEPENDENTE_IRRF = 189.59 // verificar valor
```

Fontes oficiais:
- INSS: [previdencia.gov.br](https://www.gov.br/previdencia)
- IRRF: [receita.fazenda.gov.br](https://receita.fazenda.gov.br)

---

## ⚖️ Legal

Todo o conteúdo é informativo. Os disclaimers em cada calculadora protegem você de responsabilidade legal. Não remova ou altere os disclaimers.

---

## 💡 Ideias para crescer

- Adicionar calculadora de **Insalubridade/Periculosidade**
- Adicionar calculadora de **Participação nos Lucros (PLR)**
- Blog com artigos SEO: "Como calcular rescisão passo a passo", etc.
- Versão mobile (PWA) com `manifest.json`
- Google Analytics para acompanhar crescimento de tráfego
