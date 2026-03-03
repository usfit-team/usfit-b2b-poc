# Backlog — USFIT B2B
> Organizado por Épico. Cada ticket inclui tipo, prioridade e sprint sugerida.
> **Tipos:** Feature · Melhoria · Tech · Design
> **Prioridades:** 🔴 Alta · 🟡 Média · 🟢 Baixa

---

## ÉPICO 1 — Fundação e Infraestrutura

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-001 | Setup do projeto back-end (API REST, banco de dados, estrutura de módulos) | Tech | 🔴 | 1 |
| USF-002 | Autenticação com JWT — login, logout, refresh token e controle de sessão | Tech | 🔴 | 1 |
| USF-003 | Modelo de permissões e perfis (Personal Trainer, Nutricionista, Ambos, Gerente, Admin) | Tech | 🔴 | 1 |
| USF-004 | Design System — tokens de cor, tipografia, componentes base (botões, inputs, badges, modais, toasts) | Design | 🔴 | 1 |
| USF-005 | Infraestrutura de storage — upload de imagens e documentos | Tech | 🟡 | 2 |
| USF-006 | Sistema de notificações in-app e por e-mail | Tech | 🟡 | 4 |
| USF-007 | FitBot — widget de chat de suporte integrado à plataforma | Feature | 🟢 | 8 |

---

## ÉPICO 2 — Autenticação e Onboarding

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-010 | Tela de Login — e-mail e senha com validação e feedback de erro | Feature | 🔴 | 1 |
| USF-011 | Tela de Cadastro — seleção de tipo de conta (Profissional / Consultoria) | Feature | 🔴 | 1 |
| USF-012 | Onboarding — Setup de Perfil (especialidade, registro CRN/CREF, cidade, estado) | Feature | 🔴 | 1 |
| USF-013 | Recuperação de senha por e-mail — fluxo de reset | Feature | 🟡 | 2 |
| USF-014 | Tela de boas-vindas pós-cadastro com tour guiado da plataforma | Feature | 🟢 | 8 |

---

## ÉPICO 3 — Dashboard Principal

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-020 | Dashboard — KPIs em tempo real: MRR, Alunos Ativos, Adesão Global, Ações Pendentes | Feature | 🔴 | 2 |
| USF-021 | Dashboard — Feed de atividades recentes (novos alunos, contratos, sessões) | Feature | 🟡 | 3 |
| USF-022 | Dashboard — Contratos próximos do vencimento com contagem regressiva | Feature | 🟡 | 7 |
| USF-023 | Dashboard — Gráfico de crescimento (Chart.js integrado a dados reais) | Feature | 🟡 | 7 |

---

## ÉPICO 4 — Gestão de Alunos

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-030 | Lista de Alunos — busca por nome, filtros por status (Ativo, Pendente, Arquivado) e paginação | Feature | 🔴 | 2 |
| USF-031 | Cadastro de Aluno — dados pessoais, foto, contato e endereço | Feature | 🔴 | 2 |
| USF-032 | Edição de perfil do aluno com histórico de alterações | Melhoria | 🟡 | 3 |
| USF-033 | Dashboard do Aluno — Visão Geral: métricas de adesão, peso atual, objetivo e histórico de acesso | Feature | 🔴 | 3 |
| USF-034 | Dashboard do Aluno — Tab Nutrição: ingestão calórica, macros e hidratação | Feature | 🟡 | 4 |
| USF-035 | Dashboard do Aluno — Tab Treino: volume semanal, tempo ativo, recordes e progressão de carga | Feature | 🟡 | 6 |
| USF-036 | Dashboard do Aluno — Tab Biometria: comparação antes/depois, composição corporal, histórico | Feature | 🟡 | 5 |
| USF-037 | Geração e compartilhamento de link único de Anamnese por aluno | Feature | 🟡 | 2 |
| USF-038 | Formulário público de Anamnese — rotina, alimentação, histórico clínico, intestinal | Feature | 🟡 | 2 |
| USF-039 | Atribuição de profissional responsável ao aluno (modo Consultoria) | Feature | 🟡 | 8 |
| USF-040 | Arquivamento e reativação de alunos | Melhoria | 🟢 | 8 |

---

## ÉPICO 5 — Avaliação

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-050 | Avaliação Física — dados biométricos: peso, altura, idade, sexo biológico | Feature | 🔴 | 5 |
| USF-051 | Avaliação Física — composição corporal por Pollock 3 e 7 dobras, com cálculo automático | Feature | 🔴 | 5 |
| USF-052 | Avaliação Física — perimetria corporal (braço, cintura, quadril, coxas, etc.) | Feature | 🟡 | 5 |
| USF-053 | Avaliação Física — registro fotográfico nos 4 ângulos (Frente, Costas, Perfil E/D) | Feature | 🔴 | 5 |
| USF-054 | Avaliação Física — campo de doenças e comorbidades | Feature | 🟡 | 5 |
| USF-055 | Histórico de avaliações com comparativo entre datas | Feature | 🟡 | 6 |
| USF-056 | Avaliação Nutricional — dados de ingestão atual, preferências e restrições alimentares | Feature | 🟡 | 4 |

---

## ÉPICO 6 — Nutrição: Criação de Plano

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-060 | Calculadora metabólica — fórmulas Cunningham, Tinsley, Harris-Benedict e Mifflin com seleção de fator de atividade | Feature | 🔴 | 3 |
| USF-061 | Distribuição de macros — sliders de proteína, carboidrato e gordura (g/kg) com barra de progresso vs. meta calórica | Feature | 🔴 | 3 |
| USF-062 | Montagem de Refeições — adicionar, remover e reordenar refeições com nome e horário | Feature | 🔴 | 3 |
| USF-063 | Adição de ingredientes com busca no banco de alimentos, quantidade e unidade de medida | Feature | 🔴 | 3 |
| USF-064 | Cálculo automático de macros por refeição e total do plano em tempo real | Feature | 🔴 | 3 |
| USF-065 | Substituições por ingrediente — até N opções, com score de similaridade nutricional | Feature | 🔴 | 4 |
| USF-066 | Promoção de substituto a ingrediente principal (swap sem perda de dados) | Melhoria | 🟡 | 4 |
| USF-067 | Salvar e carregar grupos de substituições com nome personalizado | Feature | 🟡 | 4 |
| USF-068 | Duplicar refeição — cópia completa com ingredientes e substituições | Melhoria | 🟡 | 4 |
| USF-069 | Templates de Refeição — salvar qualquer refeição como modelo reutilizável | Feature | 🟡 | 4 |
| USF-070 | Carregar Refeição Pronta — lista pesquisável de modelos salvos | Feature | 🟡 | 4 |
| USF-071 | Controle por refeição de inclusão no cálculo total (checkbox "Incluir no cálculo") | Melhoria | 🟡 | 3 |
| USF-072 | Seção de Suplementação — nome, dose e posologia por suplemento | Feature | 🟡 | 4 |
| USF-073 | Seção de Metas — ingestão de água, refeições livres e cárdio semanal | Feature | 🟡 | 4 |
| USF-074 | Campo de Observações Gerais do plano | Feature | 🟡 | 3 |
| USF-075 | Impressão e exportação do plano em PDF | Feature | 🟡 | 7 |
| USF-076 | Publicação e rascunho do plano nutricional | Feature | 🔴 | 3 |
| USF-077 | Duplicar plano nutricional | Melhoria | 🟡 | 4 |

---

## ÉPICO 7 — Nutrição: Banco de Alimentos e Templates

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-080 | Banco de Alimentos — lista com busca, filtro por categoria e origem (TACO / Personalizados) | Feature | 🔴 | 3 |
| USF-081 | Cadastro de Alimento Personalizado — nome, categoria, porção, unidade e tabela nutricional | Feature | 🔴 | 3 |
| USF-082 | Seed da tabela TACO completa no banco de dados | Tech | 🔴 | 3 |
| USF-083 | Lista de Planos Nutricionais — busca, filtros por status e paginação | Feature | 🔴 | 3 |
| USF-084 | Templates de Dieta — biblioteca de modelos com filtros por objetivo e calorias | Feature | 🟡 | 5 |
| USF-085 | Atribuição de Template de Dieta — seleção de aluno, data de início e fim | Feature | 🟡 | 5 |

---

## ÉPICO 8 — Treinos: Criação de Ficha

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-090 | Gestão de divisões de treino em abas (A, B, C…) com scroll horizontal e navegação por setas | Feature | 🔴 | 5 |
| USF-091 | Nome editável da divisão de treino com notificação de alteração | Melhoria | 🟡 | 5 |
| USF-092 | Adição de exercício de musculação com seleção do banco de exercícios | Feature | 🔴 | 5 |
| USF-093 | Configuração por série: Observação (obrigatória), Repetições, Carga e Descanso (opcionais) | Feature | 🔴 | 5 |
| USF-094 | Método de execução por exercício: Repetições, Tempo ou Falha | Feature | 🔴 | 5 |
| USF-095 | Marcação de série como Válida/Inválida com contabilização por grupo muscular | Feature | 🔴 | 5 |
| USF-096 | Replicação de séries de um exercício para outro | Feature | 🟡 | 6 |
| USF-097 | Observações em três níveis: por Série, por Exercício e por Treino | Feature | 🟡 | 5 |
| USF-098 | Adição de exercício de Cárdio com duração por Tempo ou Distância | Feature | 🟡 | 5 |
| USF-099 | Ponderação muscular inteligente: 1 ponto para músculo primário, 0,5 para secundário | Feature | 🟡 | 5 |
| USF-100 | Painel lateral de Resumo do Treino — exercícios, séries válidas, volume, tempo e foco muscular | Feature | 🟡 | 5 |
| USF-101 | Barra de totais do rodapé — métricas de toda a ficha com top 6 grupos musculares | Melhoria | 🟡 | 5 |
| USF-102 | Duplicar ficha de treino completa | Melhoria | 🟡 | 6 |
| USF-103 | Salvar e carregar Templates de Treino (biblioteca pesquisável) | Feature | 🟡 | 6 |
| USF-104 | Templates de Treino embutidos (ex.: Treino A – Peito/Tríceps/Ombros) | Feature | 🟡 | 6 |
| USF-105 | Criar Treino do Zero ou a partir de Treino Salvo | Feature | 🔴 | 5 |
| USF-106 | Publicação e rascunho da ficha de treino | Feature | 🔴 | 5 |

---

## ÉPICO 9 — Treinos: Banco de Exercícios e Templates

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-110 | Banco de Exercícios — lista com busca, filtro por grupo muscular e origem | Feature | 🔴 | 5 |
| USF-111 | Cadastro de Exercício — nome, tipo (Musculação/Cárdio), grupo muscular principal e secundários (até 2) | Feature | 🔴 | 5 |
| USF-112 | Seed do banco global de exercícios (catálogo base) | Tech | 🟡 | 5 |
| USF-113 | Link ou embed de vídeo demonstrativo por exercício | Melhoria | 🟢 | 7 |
| USF-114 | Lista de Fichas de Treino — busca, filtros por status e divisão, paginação | Feature | 🔴 | 5 |
| USF-115 | Templates de Treino — biblioteca com filtros por objetivo, nível e divisão | Feature | 🟡 | 6 |
| USF-116 | Atribuição de Template de Treino — nome da ficha, objetivo, aluno, data inicial e final | Feature | 🟡 | 6 |

---

## ÉPICO 10 — Contratos

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-120 | Dashboard de Contratos — KPIs (MRR, contratos ativos, vencimentos, ticket médio) | Feature | 🔴 | 7 |
| USF-121 | Lista de contratos com filtros por status (Ativo, Vencendo, Encerrado) | Feature | 🔴 | 7 |
| USF-122 | Criar Contrato — seleção de aluno, plano (Mensal/Trimestral/Semestral) e datas | Feature | 🔴 | 7 |
| USF-123 | Cálculo automático da data de encerramento com base no plano selecionado | Feature | 🔴 | 7 |
| USF-124 | Renovar Contrato — novo período, desconto e sumário de valores | Feature | 🔴 | 7 |
| USF-125 | Detalhes do Contrato — histórico de pagamentos, linha do tempo e status | Feature | 🟡 | 7 |
| USF-126 | Alertas automáticos de vencimento (7, 3 e 1 dia antes) | Feature | 🟡 | 7 |
| USF-127 | Impressão e exportação do contrato | Melhoria | 🟢 | 8 |

---

## ÉPICO 11 — Financeiro

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-130 | Dashboard Financeiro (modo Autônomo) — recebido, a receber, inadimplência e projeção | Feature | 🔴 | 7 |
| USF-131 | Dashboard Financeiro (modo Consultoria) — métricas por profissional da equipe | Feature | 🟡 | 8 |
| USF-132 | Lista de contas a receber com filtro por status e período | Feature | 🔴 | 7 |
| USF-133 | Registro manual de pagamento | Feature | 🔴 | 7 |
| USF-134 | Gráfico de receita mensal e projeção de caixa (Chart.js integrado) | Feature | 🟡 | 7 |
| USF-135 | Relatório de inadimplência com alerta por aluno | Melhoria | 🟡 | 8 |

---

## ÉPICO 12 — Equipe (Modo Consultoria)

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-140 | Lista de Profissionais — busca, filtro por especialização e status | Feature | 🟡 | 8 |
| USF-141 | Cadastro de Profissional — dados, especialização e nível de acesso | Feature | 🟡 | 8 |
| USF-142 | Envio de convite por e-mail para novo profissional | Feature | 🟡 | 8 |
| USF-143 | Detalhes do Profissional — portfolio de alunos, métricas e edição de perfil | Feature | 🟡 | 8 |
| USF-144 | Ativação e desativação de profissional | Melhoria | 🟢 | 8 |
| USF-145 | KPIs de equipe no dashboard — total de profissionais, alunos atendidos e receita gerada | Feature | 🟡 | 8 |

---

## ÉPICO 13 — Configurações

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-150 | Perfil Profissional — nome, registro, bio, foto e redes sociais | Feature | 🟡 | 2 |
| USF-151 | Preferências do Sistema — idioma, fuso horário, notificações e tema | Feature | 🟢 | 8 |
| USF-152 | Assinatura e Planos — plano atual, ciclo, método de pagamento e histórico de faturas | Feature | 🟡 | 8 |
| USF-153 | Segurança — alteração de senha, autenticação em dois fatores e sessões ativas | Feature | 🟡 | 8 |

---

## ÉPICO 14 — Público e Aquisição (SaaS)

| ID | Título | Tipo | Prio | Sprint |
|----|--------|------|------|--------|
| USF-160 | Landing Page — apresentação da plataforma com hero, features, depoimentos e CTA | Design | 🟡 | 8 |
| USF-161 | Checkout SaaS — seleção de plano, pagamento por cartão ou Pix e confirmação | Feature | 🟡 | 8 |
| USF-162 | Checkout Alunos — formulário de conta e pagamento de assinatura pelo aluno | Feature | 🟢 | 9 |
| USF-163 | Formulário público de Anamnese — acesso via link único por aluno | Feature | 🟡 | 2 |

---

## Resumo por Sprint (sugestão)

| Sprint | Foco principal | Tickets |
|--------|---------------|---------|
| **Sprint 1** | Fundação, infraestrutura, design system e autenticação | USF-001 a 014 |
| **Sprint 2** | Dashboard, alunos, anamnese e configurações básicas | USF-020, 030–038, 150, 163 |
| **Sprint 3** | Nutrição: calculadora, refeições, banco de alimentos | USF-060–065, 071, 074, 076, 080–083 |
| **Sprint 4** | Nutrição: substituições, templates, suplementação, metas | USF-066–070, 072–073, 077, 084–085 |
| **Sprint 5** | Assessment + Treinos: banco, exercícios, ficha base | USF-050–056, 090–100, 105–106, 110–112, 114 |
| **Sprint 6** | Treinos: avançado, templates, duplicar, dashboard aluno | USF-034–036, 096, 101–104, 115–116 |
| **Sprint 7** | Contratos, Financeiro e PDF/impressão | USF-120–127, 130–135, 075 |
| **Sprint 8** | Equipe, settings, SaaS, FitBot e refinamentos | USF-006, 021–023, 039–040, 131, 140–153, 160–161 |
| **Backlog** | Funcionalidades de menor prioridade e melhorias contínuas | USF-007, 113, 127, 135, 144, 151, 162 |

---

> **Total de tickets mapeados:** 106
> **Por prioridade:** 🔴 Alta — 42 · 🟡 Média — 51 · 🟢 Baixa — 13
> **Por tipo:** Feature — 78 · Melhoria — 18 · Tech — 7 · Design — 3
