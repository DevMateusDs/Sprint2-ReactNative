# 🛡️ Sprint 2 - Frontend Mobile: Monitoramento Preventivo de Riscos Industriais

Este aplicativo é o frontend mobile desenvolvido para a **Sprint 2**, integrando o desafio de criar soluções baseadas em **Visão Computacional e Indústria 4.0**. O objetivo do sistema é monitorar ambientes industriais em tempo real para identificar riscos ergonômicos (via *pose estimation*), ausência de Equipamentos de Proteção Individual (EPIs como capacetes, luvas e coletes) e invasão de áreas perigosas, emitindo alertas proativos para garantir a segurança dos operadores.

Nesta etapa, o foco está na estruturação arquitetural do projeto, experiência do usuário (UX) e preparação das interfaces para o consumo futuro da API de Visão Computacional.

---

## 🚀 Tecnologias e Dependências Utilizadas
* **React Native + Expo** (Template Blank com TypeScript)
* **TypeScript** para modelagem estrita das entidades de domínio
* **React Navigation (Native Stack)** para o fluxo de navegação entre telas
* **Expo Vector Icons (Ionicons)** para elementos visuais de sinalização de risco
* **React Native Web / React DOM** para suporte a execução em ambiente de testes no navegador

---

## 📁 Estrutura Exigida do Projeto
O código foi rigidamente organizado seguindo o padrão arquitetural solicitado:

```text
src/
├── components/   # Componentes visuais reutilizáveis (ex: AlertaCard)
├── data/         # Simulação de base de dados (Mocks)
├── screens/      # Telas principais do MVP (Lista, Detalhes, Cadastro)
└── types/        # Definições de tipos e interfaces do TypeScript
```

---

## 💻 Fluxo e Funcionalidades do MVP (Foco em UX)
1. **Painel de Riscos (Lista de Registros):** Exibe as ocorrências ativas detectadas. Possui uma lógica de cores dinâmica baseada no nível de gravidade (`critico` = vermelho, `alerta` = laranja, `observacao` = verde), permitindo ao supervisor triar a urgência visualmente.
2. **Detalhes do Incidente:** Demonstra informações detalhadas do risco. Conta com um *placeholder* estratégico na interface projetado para receber o frame (imagem com a *bounding box*) capturado pela IA.
3. **Relato Manual de Riscos (Cadastro):** Interface que permite ao supervisor registrar manualmente um incidente ou ponto cego visualizado no chão de fábrica, salvando as informações diretamente no estado local do aplicativo.

---

## 💾 Modelagem TypeScript e Dados Mockados
Os dados simulam o envio em tempo real pela IA e são validados de forma estrita pelo tipo `AlertaSeguranca`:

```typescript
export type CategoriaRisco = "Falta de EPI" | "Postura Incorreta" | "Invasão de Área de Risco" | "Outros";
export type NivelGravidade = "observacao" | "alerta" | "critico";

export type AlertaSeguranca = {
  id: string;
  categoria: CategoriaRisco;
  descricao: string;
  equipamentoFaltante?: string;
  gravidade: NivelGravidade;
  setorCamera: string;
  dataHora: string;
  resolvido: boolean;
};
```
*Em conformidade com as diretrizes da sprint, o aplicativo opera sem persistência externa ou APIs de terceiros. Os dados iniciais estão centralizados em `src/data/mock.ts` e manipulados via memória RAM no estado local do React (`useState`).*

---

## 🔧 Como Executar o Aplicativo

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalação de Dependências
Clone o repositório, navegue até a pasta do projeto pelo terminal e execute:
```bash
npm install
```

### 3. Inicialização do Servidor
Para iniciar o servidor de desenvolvimento do Expo, rode o comando correspondente ao ambiente de teste desejado:

* **Para rodar no Smartphone (Recomendado para avaliação de UX Mobile):**
  ```bash
  npx expo start
  ```
  Instale o aplicativo **Expo Go** (disponível na App Store ou Google Play Store) no seu celular e escaneie o QR Code gerado no terminal.

* **Para rodar no Navegador Web (Computador):**
  ```bash
  npx expo start -w
  ```
  O Expo compilará o bundle e abrirá uma aba automaticamente no seu navegador padrão executando o layout do painel.

---

## 👥 Integrantes
* **Mateus de Souza Santos**     - RM: 559118
* **Arthur Bergamaço Alves**     - RM: 556207
* **Breno Barbosa Pereira**      - RM: 555348
* **Leonardo Medeiros da Silva** - RM: 559220
* **Renan Melo Rosemberg**       - RM: 558535
* **Pietro Rodriguez**           - RM: 555899