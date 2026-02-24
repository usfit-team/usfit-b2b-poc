# USFIT B2B — Documentação de Funcionalidades

> Plataforma B2B para Nutricionistas e Personal Trainers gerenciarem alunos, planos nutricionais, treinos, contratos e finanças em um sistema unificado.

---

## Índice

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Estrutura de Arquivos](#3-estrutura-de-arquivos)
4. [Arquitetura de Navegação](#4-arquitetura-de-navegação)
5. [Módulos e Telas](#5-módulos-e-telas)
   - [5.1 Autenticação e Onboarding](#51-autenticação-e-onboarding)
   - [5.2 Dashboard Principal](#52-dashboard-principal)
   - [5.3 Módulo de Alunos](#53-módulo-de-alunos)
   - [5.4 Módulo de Nutrição](#54-módulo-de-nutrição)
   - [5.5 Módulo de Treinos](#55-módulo-de-treinos)
   - [5.6 Módulo de Avaliações](#56-módulo-de-avaliações)
   - [5.7 Módulo de Contratos](#57-módulo-de-contratos)
   - [5.8 Módulo Financeiro](#58-módulo-financeiro)
   - [5.9 Módulo de Equipe](#59-módulo-de-equipe)
   - [5.10 Configurações](#510-configurações)
   - [5.11 Landing Page e Páginas Públicas](#511-landing-page-e-páginas-públicas)
6. [Lógica JavaScript](#6-lógica-javascript)
7. [Design System](#7-design-system)
8. [Fluxos de Usuário](#8-fluxos-de-usuário)

---

## 1. Visão Geral do Projeto

**USFIT B2B** é uma aplicação web voltada para profissionais de saúde e fitness — Nutricionistas e Personal Trainers — que precisam gerenciar sua base de alunos, criar planos personalizados e controlar aspectos financeiros e contratuais do seu negócio.

### Perfis de usuário suportados
| Perfil | Descrição |
|--------|-----------|
| Personal Trainer | Cria e gerencia fichas de treino, avalia composição corporal |
| Nutricionista | Cria planos alimentares, realiza avaliações nutricionais |
| Ambos | Acesso completo a todos os módulos |
| Consultoria | Modo com gestão de equipe de profissionais |

### Status do Projeto
- Aplicação estática (HTML + CSS + JS)
- Sem integração com backend ou banco de dados
- Dados são simulados para demonstração (POC — Proof of Concept)
- Idioma: Português Brasileiro (pt-BR)

---

## 2. Stack Tecnológica

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| HTML5 | — | Estrutura de todas as telas |
| Tailwind CSS | v3 (CDN) | Estilização utilitária |
| JavaScript | Vanilla ES6+ | Lógica de cálculos e interações |
| Chart.js | CDN | Gráficos e visualizações de dados |
| Lucide Icons | CDN | Biblioteca de ícones SVG |
| Google Fonts (Inter) | CDN | Tipografia principal |

### Arquivos de assets
- `assets/js/functions.js` — Funções JavaScript compartilhadas
- `assets/js/tailwind-config.js` — Configuração do tema Tailwind
- `assets/css/style.css` — Estilos globais customizados
- `assets/images/` — Logo, avatares

---

## 3. Estrutura de Arquivos

```
usfit-b2b-poc/
│
├── index.html                          # Login
├── sign-up.html                        # Cadastro
├── setup-profile.html                  # Configuração inicial do perfil
├── dashboard.html                      # Dashboard principal
│
├── students-list.html                  # Lista de alunos
├── student-create.html                 # Criar/editar aluno
├── student-dashboard.html              # Dashboard do aluno (visão geral)
├── student-dashboard-biometrics.html   # Tab: Biometria do aluno
├── student-dashboard-nutrition.html    # Tab: Nutrição do aluno
├── student-dashboard-workout.html      # Tab: Treino do aluno
│
├── diets-list.html                     # Lista de planos nutricionais
├── diet-create.html                    # Criar plano nutricional avançado
├── diet-template-assign.html           # Atribuir template de dieta
├── diet-templates-list.html            # Biblioteca de templates de dieta
├── foods-list.html                     # Banco de alimentos
├── food-create.html                    # Cadastrar alimento
├── nutrition-assessment.html           # Avaliação nutricional
│
├── workouts-list.html                  # Lista de fichas de treino
├── workout-create.html                 # Criar ficha de treino
├── workout-template-assign.html        # Atribuir template de treino
├── workout-templates-list.html         # Biblioteca de templates de treino
├── exercises-list.html                 # Banco de exercícios
├── exercise-create.html                # Cadastrar exercício
├── physical-assessment.html            # Avaliação física / composição corporal
│
├── contracts-dashboard.html            # Dashboard de contratos
├── contract-create.html                # Criar contrato
├── contract-details.html               # Detalhes do contrato
├── contract-renewal.html               # Renovação de contrato
├── contract-success.html               # Confirmação de contrato criado
│
├── financial-dashboard.html            # Dashboard financeiro
│
├── team-list.html                      # Lista de profissionais
├── team-create.html                    # Adicionar profissional
├── team-details.html                   # Detalhes do profissional
├── team-create-success.html            # Confirmação de cadastro
│
├── settings.html                       # Configurações do perfil
├── settings-preferences.html          # Preferências do sistema
├── settings-billing.html              # Assinatura e faturamento
├── settings-security.html             # Segurança
│
├── lp/
│   ├── home.html                       # Landing page de marketing
│   └── checkout.html                   # Checkout de planos
│
├── public/
│   ├── anamnesis.html                  # Formulário público de anamnese
│   └── checkout.html                   # Checkout de contrato do aluno
│
└── assets/
    ├── css/style.css
    ├── js/functions.js
    ├── js/tailwind-config.js
    └── images/
        ├── logo.png
        ├── avatar.png
        └── avatar-chat.png
```

> **Arquivos legados** (mantidos para referência, não utilizados na navegação principal):
> - `diet-create-old.html`, `diet-create-old2.html`
> - `physical-assessment-old.html`

---

## 4. Arquitetura de Navegação

### Menu lateral principal (sidebar)

```
┌─────────────────────────────┐
│  Logo USFIT B2B             │
├─────────────────────────────┤
│  ▸ Visão Geral              │ → dashboard.html
│  ▸ Alunos                  │ → students-list.html
│  ▸ Nutrição                │ → diets-list.html
│  ▸ Treinos                 │ → workouts-list.html
│  ▸ Contratos               │ → contracts-dashboard.html
│  ▸ Profissionais           │ → team-list.html
│  ▸ Financeiro              │ → financial-dashboard.html
├─────────────────────────────┤
│  FitBot AI (Chat Widget)   │
├─────────────────────────────┤
│  Avatar + Nome do Usuário  │
│  ▸ Configurações           │ → settings.html
│  ▸ Sair                   │ → index.html
└─────────────────────────────┘
```

### Submenus por módulo

**Nutrição:**
```
Fichas dos Alunos → diets-list.html
Meus Modelos      → diet-templates-list.html
Banco de Alimentos → foods-list.html
```

**Treinos:**
```
Fichas dos Alunos → workouts-list.html
Meus Modelos      → workout-templates-list.html
Banco de Exercícios → exercises-list.html
```

---

## 5. Módulos e Telas

---

### 5.1 Autenticação e Onboarding

#### 5.1.1 Login — `index.html`

**Propósito:** Porta de entrada da plataforma para profissionais cadastrados.

**Layout:** Tela dividida — lado esquerdo com branding (visível apenas em desktop), lado direito com formulário.

**Campos do formulário:**
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Email profissional | `input[type=email]` | Sim |
| Senha | `input[type=password]` | Sim |

**Ações:**
- **Entrar** — acessa o dashboard principal (`dashboard.html`)
- **Esqueci minha senha** — link de recuperação de acesso
- **Criar conta** — redireciona para `sign-up.html`

---

#### 5.1.2 Cadastro — `sign-up.html`

**Propósito:** Criação de nova conta de profissional ou consultoria.

**Campos do formulário:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| Tipo de conta | Radio buttons | Profissional individual / Consultoria |
| Nome completo | `input[type=text]` | — |
| Email profissional | `input[type=email]` | — |
| Senha | `input[type=password]` | — |
| Aceite dos termos | Checkbox | Obrigatório |

**Ações:**
- **Continuar para Setup** — avança para `setup-profile.html`
- **Já tenho conta** — volta para `index.html`

---

#### 5.1.3 Configuração de Perfil — `setup-profile.html`

**Propósito:** Passo 2 do onboarding — complementar informações profissionais.

**Indicador de progresso:** "Passo 2 de 2"

**Campos do formulário:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| Função | Botões de seleção | Personal Trainer / Nutricionista / Ambos |
| Especialidade/Foco | `select` ou `input` | Área de atuação |
| Registro profissional | `input[type=text]` | CREF ou CRN |
| Cidade/Estado | `input[type=text]` | Localização |

**Ações:**
- **Finalizar e Acessar** — conclui o cadastro e acessa o dashboard

---

### 5.2 Dashboard Principal

**Arquivo:** `dashboard.html`

**Propósito:** Visão consolidada das métricas do negócio e atividade recente dos alunos.

#### Indicadores (KPI Cards)
| Indicador | Valor exemplo | Descrição |
|-----------|--------------|-----------|
| Recorrência Mensal | R$ 14.250 | Receita mensal recorrente |
| Alunos Ativos | 85 | Total de alunos com contrato ativo |
| Adesão Global | 78% | Taxa média de adesão aos planos |
| Ações Pendentes | 8 | Tarefas aguardando ação do profissional |

#### Seções do dashboard
1. **Gráfico de crescimento** — Novos alunos por mês (6 meses), renderizado com Chart.js
2. **Feed de atividades recentes** — Ações dos alunos em tempo real (conclusão de treino, registro de refeição, atualização de peso). Paginação disponível.
3. **Contratos vencendo** — Lista de contratos com vencimento próximo com ação rápida de renovação

#### Funcionalidades especiais
- **FitBot AI Chat Widget** — Assistente de IA acessível pela sidebar. Abre/fecha com animação de escala e opacidade (`toggleChat()`). Disponível em todas as telas.
- **Notificações** — Ícone de sino no cabeçalho
- **Botão de atualização do feed** — Recarrega atividades recentes

---

### 5.3 Módulo de Alunos

#### 5.3.1 Lista de Alunos — `students-list.html`

**Propósito:** Visualizar e gerenciar todos os alunos cadastrados.

**Filtros disponíveis:** Todos | Ativos | Pendentes | Arquivados

**Busca:** Por nome do aluno

**Colunas da tabela:**
| Coluna | Descrição |
|--------|-----------|
| Nome | Foto + nome completo |
| Email | Endereço de e-mail |
| Status | Badge colorido (Ativo/Pendente/Arquivado) |
| Serviços | Serviços contratados (Treino, Nutrição) |
| Último acesso | Data do último login/sincronização |
| Ações | Menu de ações rápidas |

**Ações por aluno:**
- Compartilhar link de Anamnese (`copyAnamnesisLink()` — copia URL única)
- Avaliação Física → `physical-assessment.html`
- Avaliação Nutricional → `nutrition-assessment.html`
- Editar dados → `student-create.html`

**Ações gerais:**
- **Novo Aluno** → `student-create.html`
- Paginação (exibe 1–3 de 12 alunos)

---

#### 5.3.2 Criar/Editar Aluno — `student-create.html`

**Propósito:** Formulário para cadastro ou edição de um aluno.

**Seções do formulário:**

**Dados Pessoais:**
| Campo | Tipo |
|-------|------|
| Foto de perfil | Upload de imagem |
| Nome completo | `input[type=text]` |
| Email | `input[type=email]` |
| Telefone | `input[type=tel]` |
| Data de nascimento | `input[type=date]` |
| Sexo biológico | Radio buttons (Masculino/Feminino) |

**Endereço (seção opcional/expansível):**
- CEP, Logradouro, Número, Complemento, Bairro, Cidade, Estado

**Configurações do contrato:**
| Campo | Tipo |
|-------|------|
| Status da conta | Toggle (Ativo/Inativo) |
| Data de início | `input[type=date]` |
| Data de vencimento | `input[type=date]` |
| Recorrência automática | Checkbox |
| Enviar convite por e-mail | Checkbox |

**Foco principal (seleção múltipla):**
- Hipertrofia | Emagrecimento | Saúde | Performance

**Ações:**
- **Cancelar** — retorna sem salvar
- **Salvar Aluno** — persiste o cadastro

---

#### 5.3.3 Dashboard do Aluno — `student-dashboard.html`

**Propósito:** Visão completa do histórico e progresso individual de um aluno.

**Cabeçalho do aluno:**
- Foto, nome, status online, última sincronização
- Botão de contato via WhatsApp

**Tabs de navegação:**
| Tab | Arquivo |
|-----|---------|
| Visão Geral | `student-dashboard.html` |
| Nutrição | `student-dashboard-nutrition.html` |
| Treino | `student-dashboard-workout.html` |
| Biometria | `student-dashboard-biometrics.html` |

**KPI Cards (Visão Geral):**
| Indicador | Valor exemplo | Descrição |
|-----------|--------------|-----------|
| Adesão Dieta | 92% | Taxa de conformidade com o plano alimentar |
| Adesão Treino | 75% | Taxa de presença nos treinos |
| Variação de Peso | -2,5 kg | Mudança de peso no período |
| Volume Total | 48,5 ton | Volume de carga levantado no período |

**Calendários de adesão:**
- Grid mensal com cores indicando dias completos, parciais, ausências e dias futuros

---

#### 5.3.4 Tab Biometria — `student-dashboard-biometrics.html`

**Propósito:** Acompanhamento de composição corporal e medidas antropométricas.

**Dados de Composição Corporal:**
| Medida | Variação |
|--------|----------|
| Peso | % vs. mês anterior |
| % de Gordura | % vs. mês anterior |
| Massa Muscular | % vs. mês anterior |

**Perimetria (medidas em cm):**
- Ombros, Peitoral, Cintura, Quadril, Coxas, Braços, Panturrilhas

**Indicadores visuais de tendência:**
- Verde (melhora), Amarelo (estável), Vermelho (piora)

**Fotos de evolução:**
- Upload e comparação Antes/Depois (frente, costas, perfil)

**Gráfico:** Composição corporal ao longo do tempo (linha de massa muscular vs. gordura)

---

#### 5.3.5 Tab Nutrição do Aluno — `student-dashboard-nutrition.html`

**Propósito:** Acompanhamento da adesão alimentar e registro de macros.

**KPI Cards:**
| Indicador | Valor exemplo |
|-----------|--------------|
| Hidratação | 2,1 L / 2,5 L meta |
| Calorias | 1.450 kcal / 1.800 meta |
| Proteína | Barra de progresso |
| Carboidratos | Barra de progresso |
| Gorduras | Barra de progresso |

**Diário alimentar do dia:**
- Café da manhã: 350 kcal
- Almoço: 520 kcal (com alertas de desvio)
- Lanche: Não registrado

**Gráficos:**
- Ingestão calórica diária (barras — últimos 7 dias)
- Evolução de peso com linha de meta (misto: linha + pontos)

**Calendário de adesão:** Grid mensal colorido

---

#### 5.3.6 Tab Treino do Aluno — `student-dashboard-workout.html`

**Propósito:** Acompanhamento de desempenho e presença nos treinos.

**KPI Cards:**
| Indicador | Valor exemplo |
|-----------|--------------|
| Volume Semanal | 12,5 ton |
| Tempo Ativo | 4h 15min |
| Recordes Pessoais | +3 PRs no período |
| Frequência Semanal | X de Y treinos |

**Gráficos:**
- Progressão de carga (6 meses) — linha de tendência
- Evolução de peso (correlação com treinos)

**Calendário de treinos:**
- Grid mensal: Concluído (verde), Folga (cinza), Faltou (vermelho)

**Histórico de treinos:**
- Lista com: nome do treino, data, horário, duração, status

**Filtros:** Por período (semana, mês, trimestre)

---

### 5.4 Módulo de Nutrição

#### 5.4.1 Lista de Planos Nutricionais — `diets-list.html`

**Propósito:** Visualizar e gerenciar todos os planos alimentares criados.

**Submenu:** Fichas dos Alunos | Meus Modelos | Banco de Alimentos

**Filtros:** Todas | Ativas | Rascunhos | Arquivadas

**Busca:** Por nome da dieta ou nome do aluno

**Colunas da tabela:**
| Coluna | Descrição |
|--------|-----------|
| Nome | Nome do plano |
| Aluno | Aluno vinculado |
| Status | Ativa / Rascunho / Arquivada |
| Meta calórica | Kcal/dia prescritas |
| Última edição | Data de modificação |
| Ações | Editar |

**Paginação:** 1–3 de 45 planos

---

#### 5.4.2 Criar Plano Nutricional — `diet-create.html`

**Propósito:** Criação de plano alimentar personalizado com calculadora metabólica integrada.

**Estrutura em etapas:**

##### Etapa 1 — Planejamento Energético

**Antropometria:**
| Campo | Tipo |
|-------|------|
| Peso (kg) | `input[type=number]` |
| Altura (cm) | `input[type=number]` |
| Idade (anos) | `input[type=number]` |
| % Gordura Corporal | `input[type=number]` |

**Seleção de fórmula metabólica:**
| Fórmula | Indicação |
|---------|-----------|
| Cunningham | Atletas / Alta MM |
| Tinsley | Praticantes de musculação |
| Harris-Benedict | Uso geral clássico |
| Mifflin-St Jeor | Recomendação ACSM |

**Fator de atividade:** Select com multiplicadores (Sedentário 1.2 → Atleta 1.9+)

**Estratégia de objetivo:**
| Opção | Comportamento |
|-------|--------------|
| Manutenção | VET = GET |
| Déficit | VET = GET − X kcal (campo vermelho) |
| Superávit | VET = GET + X kcal (campo verde) |

**Resultados calculados em tempo real:**
| KPI | Descrição |
|-----|-----------|
| LBM (Massa Magra) | `peso × (1 − %gordura/100)` |
| TMB | Taxa Metabólica Basal (pela fórmula selecionada) |
| GET | Gasto Energético Total = TMB × fator atividade |
| VET Final | Meta calórica ajustada pelo objetivo |

**Distribuição de macros (sliders g/kg):**
| Macro | Slider | Cálculo |
|-------|--------|---------|
| Proteína | g por kg de peso | `g × peso = total; total × 4 = kcal` |
| Carboidratos | g por kg de peso | `g × peso = total; total × 4 = kcal` |
| Gorduras | g por kg de peso | `g × peso = total; total × 9 = kcal` |

**Barra de progresso de kcal:** Indica se os macros batem com o VET
- Verde: diferença < 50 kcal
- Vermelho: excede o VET
- Degradê cyan→azul: dentro do alvo (déficit)

##### Etapa 2 — Elaboração do Cardápio

**Por refeição:**
- Horário da refeição
- Nome da refeição (Ex: Café da manhã, Almoço)
- Itens alimentares: Alimento, Quantidade (g/ml), macros calculados
- **Substituições:** Até 2 substituições por alimento (painel recolhível, animação CSS)
- Botão para adicionar nova refeição

**Rodapé fixo (sticky footer):**
- Total de Proteína / Carboidratos / Gorduras em gramas
- Barra de progresso vs. VET em tempo real

##### Etapa 3 — Suplementação

**Campos para adicionar suplemento:**
| Campo | Tipo |
|-------|------|
| Nome do suplemento | `input[type=text]` |
| Dose | `input[type=text]` (ex: "2 cápsulas") |
| Frequência | `input[type=text]` (ex: "Pós-treino") |

**Ação:** Botão "Adicionar" insere o suplemento na lista com botão de remoção individual

**Ações gerais:**
- **Salvar Rascunho** — salva sem publicar
- **Publicar Plano** — finaliza e disponibiliza ao aluno

---

#### 5.4.3 Templates de Dieta — `diet-templates-list.html`

**Propósito:** Biblioteca de modelos de planos alimentares reutilizáveis.

**Funcionalidades:**
- Listar templates criados pelo profissional
- Filtrar e buscar templates
- Atribuir template a um aluno → `diet-template-assign.html`

---

#### 5.4.4 Atribuir Template de Dieta — `diet-template-assign.html`

**Propósito:** Vincular um template de dieta pré-criado a um aluno específico.

**Fluxo:**
1. Selecionar o template desejado
2. Selecionar o aluno
3. Confirmar atribuição

---

#### 5.4.5 Banco de Alimentos — `foods-list.html`

**Propósito:** Biblioteca de alimentos com informações nutricionais para uso na criação de planos.

**Funcionalidades:**
- Buscar alimentos por nome
- Filtrar por categoria
- Visualizar macros por porção (proteína, carboidrato, gordura, kcal)
- Adicionar novo alimento → `food-create.html`

---

#### 5.4.6 Cadastrar Alimento — `food-create.html`

**Propósito:** Adicionar alimentos customizados ao banco de dados.

**Campos:**
| Campo | Descrição |
|-------|-----------|
| Nome do alimento | Ex: "Frango grelhado" |
| Porção padrão (g) | Quantidade de referência |
| Proteína (g) | Por porção |
| Carboidratos (g) | Por porção |
| Gorduras (g) | Por porção |
| Calorias (kcal) | Calculado automaticamente |
| Categoria | Ex: Proteína animal, Grão, Fruta |

---

### 5.5 Módulo de Treinos

#### 5.5.1 Lista de Fichas de Treino — `workouts-list.html`

**Propósito:** Visualizar e gerenciar todas as fichas de treino criadas.

**Submenu:** Fichas dos Alunos | Meus Modelos | Banco de Exercícios

**Filtros:** Todos | Ativos | Rascunhos | Arquivados

**Busca:** Por nome do treino ou do aluno

**Colunas da tabela:**
| Coluna | Descrição |
|--------|-----------|
| Nome | Nome da ficha |
| Aluno | Aluno vinculado |
| Status | Ativo / Rascunho |
| Divisão | Ex: ABC, ABCD |
| Última edição | Data |
| Ações | Editar |

**Paginação:** 1–3 de 28 fichas

---

#### 5.5.2 Criar Ficha de Treino — `workout-create.html`

**Propósito:** Montar plano de treino estruturado por divisão (A, B, C, D...).

**Configurações gerais:**
| Campo | Tipo |
|-------|------|
| Nome da ficha | `input[type=text]` |
| Objetivo | `select` (Ex: Hipertrofia, Emagrecimento) |
| Duração (semanas) | `input[type=number]` |

**Divisões de treino:**
- Tabs para Treino A, B, C (e mais)
- Botão "Adicionar nova divisão"

**Por exercício no treino:**
| Campo | Tipo |
|-------|------|
| Nome do exercício | Busca no banco |
| Séries | `input[type=number]` |
| Repetições | `input[type=text]` (Ex: "8-12") |
| Carga (kg) | `input[type=number]` |
| Descanso (seg) | `input[type=number]` |
| Observações | `textarea` |

**Funcionalidades:**
- **Reordenar exercícios** — drag handle para arrastar
- **Remover exercício** — botão de exclusão por exercício
- **Adicionar exercício** — abre seletor do banco de exercícios

**Painel de resumo (sidebar):**
| Dado | Descrição |
|------|-----------|
| Intensidade estimada | Classificação automática |
| Nº de exercícios | Contador |
| Total de séries | Soma de séries |
| Tempo estimado | Duração aproximada |
| Grupos musculares | Tags dos músculos trabalhados |

**Ações:**
- **Imprimir ficha** — versão de impressão
- **Cancelar** — sem salvar
- **Finalizar** — publica a ficha

---

#### 5.5.3 Templates de Treino — `workout-templates-list.html`

**Propósito:** Biblioteca de modelos de fichas reutilizáveis.

**Funcionalidades:**
- Listar templates criados
- Filtrar e buscar
- Atribuir template a aluno → `workout-template-assign.html`

---

#### 5.5.4 Atribuir Template de Treino — `workout-template-assign.html`

**Propósito:** Vincular um template de treino pré-criado a um aluno.

**Fluxo:**
1. Selecionar o template
2. Selecionar o aluno
3. Confirmar atribuição

---

#### 5.5.5 Banco de Exercícios — `exercises-list.html`

**Propósito:** Biblioteca de exercícios disponíveis para uso na criação de fichas.

**Funcionalidades:**
- Buscar por nome do exercício
- Filtrar por grupo muscular
- Visualizar instruções de execução
- Adicionar exercício customizado → `exercise-create.html`

---

#### 5.5.6 Cadastrar Exercício — `exercise-create.html`

**Propósito:** Adicionar exercício customizado ao banco.

**Campos:**
| Campo | Descrição |
|-------|-----------|
| Nome do exercício | Ex: "Rosca direta com barra" |
| Grupo muscular | Ex: Bíceps, Costas, Pernas |
| Equipamento | Ex: Barra, Halteres, Máquina |
| Instruções de execução | `textarea` |

---

### 5.6 Módulo de Avaliações

#### 5.6.1 Avaliação Física — `physical-assessment.html`

**Propósito:** Registro e cálculo de composição corporal com protocolos científicos validados.

**Seção 1 — Dados Biométricos Básicos:**
| Campo | Tipo |
|-------|------|
| Peso corporal (kg) | `input[type=number]` |
| Estatura (cm) | `input[type=number]` |
| Idade (anos) | `input[type=number]` |
| Sexo biológico | `select` (Masculino/Feminino) |
| Protocolo | `select` (Manual, Pollock 3, Pollock 7) |
| % Gordura Corporal | Campo resultado (preenchido auto ou manual) |

**Seção 2 — Medidas de Dobras Cutâneas:**

Campos habilitados/desabilitados automaticamente conforme o protocolo selecionado:

| Dobra | Pollock 3 Masc | Pollock 3 Fem | Pollock 7 |
|-------|:--------------:|:-------------:|:---------:|
| Peitoral | ✓ | — | ✓ |
| Abdominal | ✓ | — | ✓ |
| Coxa | ✓ | ✓ | ✓ |
| Tríceps | — | ✓ | ✓ |
| Supra-ilíaca | — | ✓ | ✓ |
| Subescapular | — | — | ✓ |
| Axilar média | — | — | ✓ |

**Seção 3 — Fotos de Avaliação:**
- Upload de fotos: Frente, Costas, Perfil

**Painel de Resultados (sidebar fixa):**
| Resultado | Cálculo |
|-----------|---------|
| Massa Gorda (kg) | `Peso × (%G / 100)` |
| Massa Magra (kg) | `Peso − Massa Gorda` |
| % de Gordura | Calculado pelo protocolo |
| Classificação | Ex: "Excelente", "Bom", "Acima da média" |

**Protocolos de cálculo implementados:**

*Pollock 3 dobras — Masculino:*
```
Soma = Peitoral + Abdominal + Coxa
Densidade = 1.10938 − (0.0008267 × Soma) + (0.0000016 × Soma²) − (0.0002574 × Idade)
%Gordura = (495 / Densidade) − 450
```

*Pollock 3 dobras — Feminino:*
```
Soma = Tríceps + Supra-ilíaca + Coxa
Densidade = 1.0994921 − (0.0009929 × Soma) + (0.0000023 × Soma²) − (0.0001392 × Idade)
%Gordura = (495 / Densidade) − 450
```

*Pollock 7 dobras — Masculino:*
```
Soma = 7 dobras
Densidade = 1.112 − (0.00043499 × Soma) + (0.00000055 × Soma²) − (0.00028826 × Idade)
```

*Pollock 7 dobras — Feminino:*
```
Soma = 7 dobras
Densidade = 1.097 − (0.00046971 × Soma) + (0.00000056 × Soma²) − (0.00012828 × Idade)
```

*Modo Manual:*
- Profissional digita diretamente o `%Gordura` calculado externamente

**Ações:**
- **Cancelar** — retorna sem salvar
- **Salvar Avaliação** — registra os dados na ficha do aluno

---

#### 5.6.2 Avaliação Nutricional — `nutrition-assessment.html`

**Propósito:** Registro de anamnese nutricional do aluno.

**Funcionalidades:**
- Formulário de histórico alimentar
- Hábitos e restrições alimentares
- Preferências e intolerâncias
- Histórico clínico nutricional
- Salvar na ficha do aluno

---

#### 5.6.3 Anamnese Pública — `public/anamnesis.html`

**Propósito:** Formulário de anamnese acessível publicamente via link único enviado ao aluno.

**Acesso:** Link gerado na lista de alunos (`copyAnamnesisLink()`) e compartilhado via WhatsApp, email etc.

**Funcionalidades:**
- Preenchimento pelo próprio aluno (sem login)
- Coleta de histórico de saúde, objetivos, histórico de lesões
- Após envio, dados ficam disponíveis para o profissional

---

### 5.7 Módulo de Contratos

#### 5.7.1 Dashboard de Contratos — `contracts-dashboard.html`

**Propósito:** Visão geral de todos os contratos ativos e controle de renovações.

**KPI Cards:**
| Indicador | Valor exemplo |
|-----------|--------------|
| Recorrência Mensal | R$ 14.250 |
| Contratos Ativos | 85 |
| Vencendo em 7 dias | 3 |
| Ticket Médio | R$ 167 |

**Filtros:** Todos | Ativos | Vencendo | Expirados

**Busca:** Por nome do aluno

**Colunas da tabela:**
| Coluna | Descrição |
|--------|-----------|
| Aluno | Nome + foto |
| Plano | Mensal / Trimestral / Semestral |
| Valor | R$ do contrato |
| Vencimento | Data de expiração |
| Status | Ativo (verde) / Vencendo (amarelo) / Expirado (vermelho) |
| Ações | Renovar / Ver detalhes |

**Paginação:** 1–3 de 85 contratos

---

#### 5.7.2 Criar Contrato — `contract-create.html`

**Propósito:** Gerar link de pagamento ou registrar pagamento manual de contrato.

**Campos do formulário:**
| Campo | Tipo |
|-------|------|
| Aluno | `select` (busca na lista) |
| CPF | `input` (preenchido automaticamente) |
| Tipo de plano | Radio: Mensal / Trimestral / Semestral |
| Data de início | `input[type=date]` |
| Valor total | Campo resultado (calculado automaticamente) |

**Métodos de pagamento:**
| Método | Descrição |
|--------|-----------|
| Checkout Online | Gera link de pagamento único para o aluno |
| Recibo Manual | Confirma pagamento recebido fisicamente |

**Fluxo de checkout online:**
1. Preencher dados e selecionar "Checkout Online"
2. Clicar em "Gerar Link" → vai para `contract-success.html`
3. Copiar link e enviar ao aluno
4. Aluno paga em `public/checkout.html`

**Fluxo manual:**
1. Preencher dados e selecionar "Recibo Manual"
2. Clicar em "Confirmar Recebimento"
3. Contrato é registrado como pago

---

#### 5.7.3 Detalhes do Contrato — `contract-details.html`

**Propósito:** Visualização completa das informações de um contrato específico.

**Informações exibidas:**
- Dados do aluno
- Tipo de plano e valor
- Datas de início e vencimento
- Histórico de pagamentos
- Status atual

---

#### 5.7.4 Renovação de Contrato — `contract-renewal.html`

**Propósito:** Renovar um contrato próximo do vencimento.

**Funcionalidades:**
- Exibir dados do contrato atual
- Selecionar novo período
- Manter ou alterar valor
- Confirmar renovação

---

#### 5.7.5 Sucesso de Contrato — `contract-success.html`

**Propósito:** Confirmação após geração de link de pagamento.

**Exibe:**
- Link de pagamento gerado
- Botão "Copiar Link"
- Botão "Simular pagamento do aluno" (para teste)
- Retornar ao dashboard financeiro

---

### 5.8 Módulo Financeiro

#### Dashboard Financeiro — `financial-dashboard.html`

**Propósito:** Controle de recebíveis, pagamentos e fluxo de caixa.

**Modos de visualização:**
- **Autônomo** — visão individual do profissional
- **Consultoria** — visão consolidada da empresa com múltiplos profissionais

**KPI Cards:**
| Indicador | Valor exemplo | Cor |
|-----------|--------------|-----|
| Recebido (mês) | R$ 12.450 | Verde |
| Pendente | R$ 3.200 | Amarelo |
| Atrasado | R$ 850 | Vermelho |
| Ticket Médio | R$ 259 | Azul |

**Gráfico de fluxo de caixa:** Receita mensal dos últimos 6 meses (linha — Chart.js)

**Próximos vencimentos:** Lista de pagamentos a vencer em breve

**Tabela de parcelas:**
| Coluna | Descrição |
|--------|-----------|
| Aluno | Nome do aluno |
| Vencimento | Data do pagamento |
| Valor | R$ da parcela |
| Status | Pago / Pendente / Atrasado |
| Ações | Registrar pagamento / Ver checkout |

**Status Badges:**
| Badge | Cor |
|-------|-----|
| Pago | Verde (`badge-paid`) |
| Pendente | Amarelo (`badge-pending`) |
| Atrasado | Vermelho (`badge-overdue`) |

**Ações gerais:**
- **Acessar Checkout** — link para pagamento online do aluno
- **Registrar Pagamento Manual** — abre modal

**Modal de pagamento manual:**
| Campo | Tipo |
|-------|------|
| Aluno | Exibido (read-only) |
| Método de pagamento | Radio: Pix / Dinheiro / Máquina de Cartão |
| Data de pagamento | `input[type=date]` |
| Observações | `textarea` |

---

### 5.9 Módulo de Equipe

#### 5.9.1 Lista de Profissionais — `team-list.html`

**Propósito:** Gerenciar equipe de profissionais (modo Consultoria).

**KPI Cards:**
| Indicador | Valor exemplo |
|-----------|--------------|
| Total da equipe | 12 profissionais |
| Alunos atendidos | 450 |
| Receita gerada | R$ 48.200 |

**Filtros:** Todos | Nutricionistas | Treinadores

**Busca:** Por nome do profissional

**Colunas da tabela:**
| Coluna | Descrição |
|--------|-----------|
| Nome | Foto + nome |
| Especialidade | Nutricionista / Treinador |
| Alunos | Quantidade + barra de progresso (capacidade) |
| Status | Ativo / Inativo |
| Ações | Editar / Menu de opções / Reativar |

**Badges de especialidade:**
- `Nutricionista` — verde
- `Treinador` — azul
- Pode ter ambas

---

#### 5.9.2 Adicionar Profissional — `team-create.html`

**Propósito:** Cadastrar novo profissional na equipe.

**Campos:**
| Campo | Tipo |
|-------|------|
| Nome completo | `input[type=text]` |
| Especialidade | `select` |
| Email profissional | `input[type=email]` |
| Status inicial | Toggle Ativo/Inativo |
| Alunos sob gestão | `input[type=number]` |

**Ações:**
- **Salvar** → vai para `team-create-success.html`
- **Cancelar**

---

#### 5.9.3 Detalhes do Profissional — `team-details.html`

**Propósito:** Visualizar perfil completo e métricas de um profissional.

**Informações:**
- Dados de contato e especialidade
- Alunos sob gestão
- Métricas de desempenho
- Histórico de atividades

**Ações:**
- Editar perfil
- Remover da equipe
- Ver analytics

---

#### 5.9.4 Sucesso de Cadastro — `team-create-success.html`

**Propósito:** Confirmação de que o profissional foi adicionado com sucesso.

---

### 5.10 Configurações

#### 5.10.1 Configurações Gerais — `settings.html`

**Propósito:** Gerenciamento do perfil e conta do profissional.

**Tabs de navegação:**
| Tab | Arquivo |
|-----|---------|
| Perfil Profissional | `settings.html` |
| Preferências do Sistema | `settings-preferences.html` |
| Assinatura e Planos | `settings-billing.html` |
| Segurança | `settings-security.html` |

**Campos do Perfil:**
| Campo | Tipo |
|-------|------|
| Foto de perfil | Upload de imagem |
| Nome de exibição | `input[type=text]` |
| Registro profissional (CREF/CRN) | `input[type=text]` |
| Email de contato | `input[type=email]` |
| Biografia profissional | `textarea` |

**Informações da assinatura:**
- Plano atual: ex. "Profissional Anual"
- Próxima renovação: ex. 25/12/2026

**Ações:**
- **Salvar alterações**
- **Gerenciar assinatura**

---

#### 5.10.2 Preferências — `settings-preferences.html`

**Propósito:** Configurações de comportamento e aparência da plataforma.

**Configurações:**
- Idioma da interface
- Formato de data e hora
- Notificações por email
- Configurações de privacidade

---

#### 5.10.3 Assinatura e Faturamento — `settings-billing.html`

**Propósito:** Gestão do plano de assinatura da plataforma.

**Informações:**
- Plano contratado e recursos incluídos
- Data de renovação e valor
- Método de pagamento cadastrado
- Histórico de faturas

---

#### 5.10.4 Segurança — `settings-security.html`

**Propósito:** Proteção e controle de acesso à conta.

**Funcionalidades:**
- Alteração de senha
- Autenticação em dois fatores (2FA)
- Dispositivos conectados (sessões ativas)
- Encerrar todas as sessões

---

### 5.11 Landing Page e Páginas Públicas

#### 5.11.1 Landing Page — `lp/home.html`

**Propósito:** Página de marketing para captação de novos clientes (profissionais de saúde).

**Seções:**
- Hero com proposta de valor
- Funcionalidades principais da plataforma
- Planos e preços
- Depoimentos / Prova social
- CTA (Call to Action) para cadastro
- Rodapé com links institucionais

---

#### 5.11.2 Checkout de Plano — `lp/checkout.html`

**Propósito:** Página de compra do plano da plataforma USFIT B2B pelo profissional.

---

#### 5.11.3 Checkout Público do Aluno — `public/checkout.html`

**Propósito:** Página onde o aluno realiza o pagamento do contrato de serviços.

**Acesso:** Via link único gerado na criação do contrato (`contract-create.html` → `contract-success.html`)

**Conteúdo:**
- Resumo do plano contratado
- Dados do profissional/consultoria
- Formulário de pagamento (cartão, Pix)
- Confirmação de pagamento

---

## 6. Lógica JavaScript

**Arquivo principal:** `assets/js/functions.js`

### 6.1 Inicialização

```javascript
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons(); // Renderiza todos os ícones SVG do Lucide
});
```

### 6.2 Cálculos de Composição Corporal

#### `updateProtocolInputs()`
Habilita/desabilita campos de dobras cutâneas conforme o protocolo selecionado.
- **Protocolo Manual:** habilita campo `%Gordura`, bloqueia dobras
- **Pollock 3:** habilita 3 dobras específicas por gênero, bloqueia `%Gordura`
- **Pollock 7:** habilita todas as 7 dobras, bloqueia `%Gordura`

#### `calculateBodyComp()`
Calcula composição corporal a partir das dobras ou input manual.
- Retorna: Massa Gorda (kg), Massa Magra (kg), % Gordura
- Limite de segurança: 0% ≤ %Gordura ≤ 60%

### 6.3 Calculadora Metabólica

#### `calculateMetabolism()`
Calcula TMB, GET e VET Final com base nos dados antropométricos.

| Fórmula | Equação TMB |
|---------|-------------|
| Cunningham | `500 + (22 × MM)` |
| Tinsley | `(25.9 × MM) + 284` |
| Harris-Benedict | `66.5 + (13.75 × P) + (5.003 × A) − (6.75 × I)` |
| Mifflin-St Jeor | `(10 × P) + (6.25 × A) − (5 × I) + 5` |

*MM = Massa Magra, P = Peso, A = Altura, I = Idade*

`GET = TMB × fator_atividade`

`VET_Final = GET ± variação_calórica`

#### `updateMacros()`
Distribui calorias entre macronutrientes com base nos sliders.
- Proteína: 4 kcal/g
- Carboidratos: 4 kcal/g
- Gorduras: 9 kcal/g
- Atualiza barra de progresso e rodapé fixo em tempo real

### 6.4 Funções de UI

#### `toggleSubs(btn)`
Abre/fecha painel de substituições de alimentos com animação CSS (max-height).

#### `addSupplement()`
Adiciona suplemento à lista dinâmica no plano nutricional. Valida nome obrigatório, cria elemento HTML e reinicializa ícones Lucide.

#### `toggleChat()`
Abre/fecha o widget de chat do FitBot AI com animação de opacidade e escala.

### 6.5 Utilitários de Formatação

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| `formatNumber(n)` | Número em pt-BR | `1000` → `"1.000"` |
| `formatCurrency(v)` | Moeda em BRL | `150` → `"R$ 150,00"` |
| `formatDate(d)` | Data em pt-BR | `"2025-01-15"` → `"15/01/2025"` |

### 6.6 Copiar Link de Anamnese

#### `copyAnamnesisLink()`
Copia link único de anamnese para a área de transferência e exibe alerta de confirmação.

---

## 7. Design System

### Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `usfit-dark` | `#111827` | Background da sidebar |
| `usfit-cyan` | `#22d3ee` | Cor primária, destaques |
| `usfit-blue` | `#3b82f6` | Cor secundária, links |
| `usfit-text` | `#374151` | Texto principal |
| `usfit-gray` | `#F3F4F6` | Background de conteúdo |
| Sidebar header | `#0f1523` | Topo da sidebar |

**Gradiente principal:** `linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)`

### Tipografia

- **Família:** Inter (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700

### Componentes Reutilizáveis (CSS)

| Classe | Descrição |
|--------|-----------|
| `.btn-primary` | Botão gradiente cyan→azul, arredondado |
| `.btn-secondary` | Botão branco com borda, hover cyan |
| `.btn-outline` | Botão outline com hover azul |
| `.usfit-input` | Input padrão com foco cyan |
| `.usfit-input-search` | Input de busca arredondado |
| `.badge-paid` | Badge verde "Pago" |
| `.badge-pending` | Badge amarelo "Pendente" |
| `.badge-overdue` | Badge vermelho "Atrasado" |
| `.input-disabled` | Input desabilitado (cinza, cursor bloqueado) |
| `.input-active` | Input habilitado (borda azul, fundo azul claro) |
| `.input-result` | Campo de resultado calculado (fundo cyan) |
| `.substitution-panel` | Painel recolhível com animação max-height |
| `.macro-footer` | Rodapé fixo de macros com sombra |
| `.heat-green` | `#10B981` — célula de heatmap (completo) |
| `.heat-yellow` | `#FBBF24` — célula de heatmap (parcial) |
| `.heat-red` | `#EF4444` — célula de heatmap (não realizado) |
| `.heat-gray` | `#E5E7EB` — célula de heatmap (futuro/vazio) |

### Animações

| Nome | Comportamento |
|------|--------------|
| `scale-in` | Escala 0→1 com fade, 0.5s ease-out |
| `fade-in` | Fade + translateY(10px→0), 0.5s com delay 0.3s |

### Layout

- **Sidebar:** Largura fixa 256px, visível apenas em `md+` (≥768px), oculta em mobile
- **Conteúdo:** Área restante com overflow scroll
- **Grid de KPIs:** 4 colunas em desktop, 2 em tablet, 1 em mobile

---

## 8. Fluxos de Usuário

### Fluxo de Onboarding

```
index.html (Login)
    ↓ [Não tem conta]
sign-up.html (Cadastro)
    ↓ [Continuar]
setup-profile.html (Completar perfil)
    ↓ [Finalizar]
dashboard.html (Dashboard)
```

### Fluxo de Criação de Plano Nutricional

```
diets-list.html
    ↓ [Nova Dieta]
diet-create.html → Etapa 1: Calculadora metabólica
    ↓ [Avançar]
diet-create.html → Etapa 2: Montar cardápio + substituições
    ↓ [Avançar]
diet-create.html → Etapa 3: Suplementação
    ↓ [Publicar]
diets-list.html (plano aparece como "Ativo")
```

### Fluxo de Avaliação Física

```
students-list.html
    ↓ [Avaliação Física]
physical-assessment.html
    → Selecionar protocolo (Manual / Pollock 3 / Pollock 7)
    → Preencher dados e dobras cutâneas
    → Visualizar resultados no painel lateral
    ↓ [Salvar]
student-dashboard-biometrics.html (dados atualizados)
```

### Fluxo de Criação de Contrato

```
contracts-dashboard.html
    ↓ [Novo Contrato]
contract-create.html
    → Selecionar aluno e plano
    → Escolher método de pagamento
    ↓ [Gerar Link de Pagamento]
contract-success.html
    → Copiar link
    ↓ [Aluno acessa o link]
public/checkout.html
    → Aluno realiza pagamento
    ↓ [Pagamento confirmado]
financial-dashboard.html (parcela aparece como "Pago")
```

### Fluxo de Anamnese do Aluno

```
students-list.html
    ↓ [Ação: Compartilhar link de anamnese]
copyAnamnesisLink() → Copia link para área de transferência
    ↓ [Profissional envia o link ao aluno]
public/anamnesis.html
    → Aluno preenche histórico de saúde
    ↓ [Enviar]
(Dados disponíveis na ficha do aluno)
```

### Fluxo de Acompanhamento de Aluno

```
students-list.html
    ↓ [Nome do aluno]
student-dashboard.html (Visão Geral)
    ↓ [Tab: Nutrição]
student-dashboard-nutrition.html
    ↓ [Tab: Treino]
student-dashboard-workout.html
    ↓ [Tab: Biometria]
student-dashboard-biometrics.html
```

---

*Documentação gerada em: Fevereiro de 2026*
*Versão da aplicação: POC (Proof of Concept)*
