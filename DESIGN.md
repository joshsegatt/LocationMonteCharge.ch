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
| `accent-blue` | `text-[#0052A3]` | `#0052A3` | Marca BatiMove, foco de teclado, hover de perguntas. Em fundo escuro o destaque é branco com sublinhado, nunca ciano. |
| `accent-red` | `bg-[#E10600]` / `hover:bg-[#C80500]` | `#E10600` / `#C80500` | Botões primários de ação (CTA), telefone e selos de urgência |

---

## 3. Tipografia Ultra-HD

- **Display (Títulos)**: `Plus Jakarta Sans`, peso 600, `tracking-[-0.03em]` (H1 `-0.035em`), `text-wrap: balance`.
  - H1: `text-[38px] sm:text-[56px] xl:text-[62px] leading-[1.04]`
  - Marca no menu e no rodapé: "Monte Charge" em caixa normal, peso 600, `text-[18px] lg:text-[19px] tracking-[-0.025em]`, com "BatiMove Genève" em Inter 12px logo abaixo. O pictograma (`MCLogo`) é o caminhão monte-meuble em volume (projeção de um modelo 3D, três tons por face), com a escada aberta e a carga vermelha no alto: azul sobre fundo claro, branco com `onDark` sobre foto ou fundo escuro. Os tons de azul e de cinza do caminhão vêm dos azuis do logo oficial da BatiMove e valem só para o pictograma, não são tokens de interface. O arquivo é gerado, não editar a geometria à mão. Favicon: o caminhão branco numa pastilha navy `#0A192F`.
  - H2 de seção: `text-[34px] sm:text-[48px] leading-[1.05] tracking-[-0.035em]`. H2 de seção discreta (galeria de fotos, FAQ): `text-[32px] sm:text-[40px] leading-[1.08]` (variante menor `text-[28px] sm:text-[34px]`)
  - Título de cartão grande: `text-[28px] sm:text-[40px] leading-[1.06]`. Título de cartão de etapa: `text-[26px] sm:text-[34px] leading-[1.08]`. Limite de tracking: `-0.04em`.
- **Corpo (Interface & Parágrafos)**: `Inter`, -apple-system, sans-serif (`font-feature-settings: "cv02", "cv03", "cv04", "cv11", "ss01"`).
- **Números**: `tabular-nums` na própria fonte do texto. Não usar fonte monoespaçada na interface.
- **Tamanho mínimo**: texto de leitura em `text-base` (16px). 13–14px só para legendas, ajuda de campo e rodapé.
- **Regras de texto**: frase em caixa normal (sem MAIÚSCULAS com tracking), sem rótulo acima de título, sem palavra colorida dentro de título, sem travessão, sem "•" separando informações, sem emoji.

---

## 4. Botões & Ações (`Button Contract`)

- **Botão Primário (CTA vermelho)**:
  - `press inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full bg-[#E10600] hover:bg-[#C80500] text-white text-[16px] font-semibold`
  - Sem sombra colorida, sem maiúsculas, sem seta. O texto diz exatamente o que acontece ("Devis gratuit sur WhatsApp", "Envoyer la demande").
- **Botão Secundário / Telefone**:
  - Em fundo claro: `press h-14 px-7 rounded-full border border-slate-300 hover:border-[#0A192F] text-[#0A192F] font-semibold`
  - Em fundo escuro ou sobre foto: `press h-14 px-7 rounded-full border border-white/40 hover:border-white text-white`
- **Forma**: botões de ação são pílulas (`rounded-full`). Campos de formulário e botões de ícone pequenos continuam `rounded-lg`.
- **Link de texto**: `underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors`. Navegação é sempre `<a href>`, nunca `<button>` nem `<div onClick>`.
- **Campos de formulário**: rótulo visível acima (`text-sm font-medium`), campo `h-12 rounded-lg border border-slate-300`, foco `focus:border-[#0A192F] focus:ring-2 focus:ring-[#0052A3]/25`.

## 5. Layout

- Seções alternam `bg-white` e `bg-[#F1F5F8]`, sem linha entre seções.
- Dois pontos de CTA por página: hero e faixa final (`CtaBand`).
- Listas e especificações em linhas com `border-b border-slate-200`, não em cartões.
- O fundo da página é branco (`theme-color` `#FFFFFF`).
- Elevação declarada uma única vez: borda OU sombra, nunca as duas. Sem `backdrop-blur`, sem cartão dentro de cartão.
- **Raios**: 28px em cartões (`rounded-[28px]`), 40px em painéis grandes no desktop (`md:rounded-[40px]`), 16px em miniaturas (`rounded-2xl`). A foto dentro de um cartão colorido usa um raio 10px menor que o do cartão.
- **Cor dos cartões**: só tons da paleta (`#F1F5F8`, `#0F2440`, `#0052A3`, `#0A192F`, branco). Em cartão escuro o título leva `text-white` explícito (a regra global pinta todo título de navy) e o texto secundário usa `text-white/80`, nunca cinza.
- **Fotos**: só fotos reais de intervenção (`public/assets/work/`). As imagens com aparência de IA (`hero-bg`, `hero-luxury`, `step-01/02/03`, `features/*`) não entram em seções novas.

### Padrões de seção (home)

| Seção | Componente | Padrão |
| :--- | :--- | :--- |
| Menu | `NavV2` | Cápsula flutuante (`h-14`, `lg:h-16`, `rounded-full`) a 8px do topo (12px no desktop), alinhada à coluna de conteúdo. Transparente sobre a foto do hero; branca com sombra (sem borda, sem blur) ao rolar e nas outras páginas. Links em pílula (`h-10 rounded-full`, fundo só no hover e no item ativo); na home o item ativo acompanha a seção visível. "Services" abre um painel branco com as cinco páginas de serviço (lista em `src/lib/serviceNav.ts`, a mesma do seletor do hero): ícone num quadrado `#F1F5F8`, nome, uma linha de objetos e, no fim, um atalho para o WhatsApp. Telefone em pílula: branca sobre a foto, vermelha no resto. No celular o menu abre num cartão branco arredondado sob a cápsula, com véu navy sobre a página, lista de serviços recolhível e os dois CTAs. |
| Hero | `HeroV2` | Foto de fachada em tela cheia com véu navy `#0A192F` (a cor da marca, não preto): uniforme no celular e, no desktop, um degradê preso à coluna de texto que some antes da escada, para deixar a fachada e o monte-meuble ao natural. Um cartão branco "Que faut-il monter ?" sobrepõe a base da foto e leva às páginas de serviço. |
| Etapas | `HowItWorks` | Cabeçalho em duas colunas (H2 e uma frase de contexto). Cartões empilhados de altura contida (`lg:min-h-[27rem]`): cada `li` é `sticky` e o seguinte pousa por cima, deixando uma faixa do anterior visível. Um tom da paleta por cartão, número, título, uma frase e três linhas de fatos (`dl` com fios finos: rótulo discreto, valor em peso 500), foto real à direita. Só fatos já validados (`ads/brand/brand.md` e FAQ). Fecha com um link de texto para o WhatsApp. O `sticky` desliga abaixo de 700px de altura no desktop e de 780px no celular. |
| Fotos | `WorkShowcase` | Grade simples de miniaturas com lugar e operação. Sem cartão, sem efeito. |
| Empresa | `AboutOverviewV2` | Bento: vídeo real ocupando duas linhas e quatro cartões de tamanhos e cores diferentes, um por compromisso. Sem ícone decorativo. |
| Zonas | `LocalSeoZones` | Carrossel horizontal (scroll nativo com `snap`, setas no desktop) de cartões-foto 3:4 com o nome da comuna sobre a foto. Só comunas com foto própria ganham cartão; as outras ficam na lista por cantão logo abaixo. |
| CTA final | `CtaBand` | Faixa navy de largura total, sem cartão, que continua no rodapé. Foto real do operador (`work/19`) dissolvida no navy (para baixo no celular, para o texto no desktop), título, os dois botões em pílula e uma linha fina de três fatos. |

Páginas de serviço e regionais mantêm o `PageHero` branco com foto à direita e reutilizam `HowItWorks` e `CtaBand`.

## 6. Interação & Movimento

Definidos em `src/index.css`.

- **Curvas**: `--ease-ui: cubic-bezier(0.23, 1, 0.32, 1)` para a interface (é também a curva padrão das transições Tailwind); `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` para a gaveta de orçamento.
- **Durações**: 160ms para resposta ao toque, 200ms para mudança de estado (FAQ, menu, janelas), 300ms no máximo para painéis. A saída é sempre mais rápida que a entrada.
- **Entrada de conteúdo**: é a única exceção ao teto de 300ms. O hero entra uma vez no carregamento (700ms, `y: 22`, escalonado). Blocos abaixo da dobra usam `Reveal` (`src/components/Reveal.tsx`): `opacity` + `y: 20`, 550ms, `--ease-ui`, uma única vez, com atraso de no máximo 0,18s entre vizinhos. Não animar texto letra a letra nem repetir a entrada ao rolar de volta.
- **Movimento ligado ao scroll**: só nos cartões de etapas, que encolhem até 3,5% por nível ao serem cobertos (`useScroll` + `useTransform`). Nada de parallax em outras seções.
- **Hover em foto**: `scale: 1.03–1.04` dentro de um quadro com `overflow-hidden`, 300–500ms. O cartão em si não se move.
- **Carrossel**: scroll nativo; as setas chamam `scrollBy` com `behavior: smooth`. Não usar `data-lenis-prevent` nem biblioteca de slider.
- **Utilitário `press`**: transição de cor, fundo e borda, mais `scale: 0.97` em `:active`. Usar em todo botão de ação. Substitui `transition-colors`.
- **Proibido**: `transition: all`, hover que levanta o elemento, animação a partir de `scale(0)`, bounce, pontos pulsando.
- **Foco**: `:focus-visible` com contorno de 2px `#0052A3`. Alvos de toque com 40px ou mais; botões de ação com 56px.
- **Janelas e gavetas**: fecham com Échap, usam `overscroll-contain`, e o botão de fechar tem `aria-label`.
- `prefers-reduced-motion` é respeitado: `Reveal` vira um `div` comum, os cartões de etapas não encolhem e o carrossel rola sem suavização.

## 7. Tipografia francesa

- Apóstrofo tipográfico `’`, nunca `'`, inclusive no separador de milhar suíço (`5’000’000`).
- Espaço fino insecável antes de `? ! ;`, espaço insecável antes de `:`, entre número e unidade (`500 kg`, `CHF 5’000’000`) e dentro do `0800 825 925`.
- Textos vindos de `src/data/` e listas de componentes passam por `frTypo` / `frTypoText` (`src/lib/typo.ts`), que aplica essas regras na renderização. Em JSX escrito à mão, usar `’`, `&nbsp;` e `&#8239;`.
- Ficam de fora: metas de SEO, slugs e mensagens pré-preenchidas do WhatsApp.
- Ordinais em título: `<sup>e</sup>` (o `ᵉ` não existe em Plus Jakarta Sans).
