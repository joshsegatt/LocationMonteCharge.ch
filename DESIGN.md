# DESIGN.md: Sistema de Design BatiMove • Monte-Charge Suisse

> Identidade visual oficial alinhada a batimove.ch: Paleta BatiMove Azul & Vermelho Suíço, tipografia de alta precisão (Plus Jakarta Sans + Inter) e acabamento Apple HIG / Linear.

---

## 1. Identidade & Conceito
- **Nome do Projeto**: Monte-Charge Synergy Hub (BatiMove Sàrl)
- **Tom & Atmosfera**: Engenharia e logística vertical de elite, precisão mecânica suíça, credibilidade institucional.
- **Referência Visual Principal**: Apple HIG + Stripe + batimove.ch (Swiss Modernism).
- **Modo**: Arquitetura híbrida (Light canvas de leitura com seções cinematográficas em Deep Navy BatiMove).

---

## 2. Paleta de Cores (8 Tokens Funcionais BatiMove)

| Token Semântico | Variável / Classe | Valor Hex | Finalidade de Uso |
| :--- | :--- | :--- | :--- |
| `background` | `bg-white` / `bg-[#0A192F]` | `#FFFFFF` / `#0A192F` | Fundo principal (branco diurno / deep navy BatiMove) |
| `surface` | `bg-slate-50` / `bg-[#0F2440]` | `#F8FAFC` / `#0F2440` | Fundo de cartões, formulários e painéis |
| `surface-hover` | `hover:bg-slate-100` / `hover:bg-[#163258]` | `#F1F5F9` / `#163258` | Realce interativo em hover e cards |
| `border` | `border-slate-200` / `border-white/10` | `#E2E8F0` / `rgba(255,255,255,0.1)` | Bordas estruturais de 1px hairline |
| `text-primary` | `text-slate-900` / `text-white` | `#0A192F` / `#FFFFFF` | Títulos e leitura com contraste máximo WCAG AAA |
| `text-muted` | `text-slate-600` / `text-slate-300` | `#475569` / `#CBD5E1` | Subtítulos, metadados e legendas |
| `accent-blue` | `text-[#0052A3]` / `text-[#38BDF8]` | `#0052A3` / `#0066CC` | Marca BatiMove, links, ícones, detalhes de destaque |
| `accent-red` | `bg-[#E10600]` / `hover:bg-[#C80500]` | `#E10600` / `#C80500` | Botões primários de ação (CTA), telefone e selos de urgência |

---

## 3. Tipografia Ultra-HD

- **Display (Títulos & Destaques)**: `Plus Jakarta Sans`, sans-serif (pesos 700/800, `tracking-tight`, `text-wrap: balance`).
- **Corpo (Interface & Parágrafos)**: `Inter`, -apple-system, sans-serif (`font-feature-settings: "cv02", "cv03", "cv04", "cv11", "ss01", "tnum"`).
- **Métricas & Dados**: `font-mono` / `tabular-nums` (`IBM Plex Mono`).

---

## 4. Botões & Ações (`Button Contract`)

- **Botão Primário (CTA BatiMove Vermelho)**:
  - Fundo: `bg-[#E10600] hover:bg-[#C80500]`
  - Sombra: `shadow-[0_4px_18px_rgba(225,6,0,0.35)] hover:shadow-[0_8px_25px_rgba(225,6,0,0.5)]`
  - Texto: `text-white font-bold uppercase tracking-wider`
  - Estados: `active:scale-[0.98] transition-all duration-200`
- **Botão Secundário / Telefone (BatiMove Azul ou Glass)**:
  - Fundo: `bg-[#0052A3] hover:bg-[#004080]` ou `bg-white/10 hover:bg-white/15`
  - Borda: `border border-white/20`
  - Texto: `text-white font-semibold`
