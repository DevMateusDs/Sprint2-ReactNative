# 🛡️ Sprint 3 - Frontend Mobile: Monitoramento Preventivo de Riscos Industriais (Metaindústria)

Este aplicativo é o frontend mobile, integrando o desafio de criar soluções baseadas em **Visão Computacional e Indústria 4.0**. O objetivo do sistema é monitorar ambientes industriais em tempo real para identificar riscos ergonômicos e ausência de Equipamentos de Proteção Individual (EPIs).

Nesta Sprint 3, o aplicativo abandonou o uso de dados locais (mocks) e foi totalmente integrado ao backend em Spring Boot.

---

## 🚀 Tecnologias e Dependências Utilizadas
* **React Native + Expo** (Template Blank com TypeScript)
* **Axios** para consumo da API REST (`npx expo install axios`)
* **React Navigation (Native Stack)** para o fluxo de navegação
* **Expo Vector Icons (Ionicons)** para elementos visuais

---

## 🔌 Integração e Endpoints (Sprint 3)
Toda a comunicação REST está abstraída na pasta `src/services/`, garantindo que a interface gráfica não lide com as requisições diretamente.

**Endpoints Consumidos da API Spring Boot:**
* `GET /alertas` - Lista todos os riscos ativos.
* `GET /alertas/{id}` - Busca os detalhes de uma ocorrência específica.
* `POST /alertas` - Registra um novo alerta no banco de dados H2.
* `PUT /alertas/{id}` - Atualiza um registro existente.
* `DELETE /alertas/{id}` - Remove um alerta do sistema.

**Resiliência (Backend Offline):**
Se a API estiver desligada, a `ListaScreen` captura a falha e renderiza um estado de erro visual informando que o backend está indisponível, acompanhado de blocos `try/catch/finally` para evitar crashes abruptos.

---

## 📂 Estrutura da Pasta de Serviços (`src/services/`)
* **`api.ts`** - Configuração global do Axios (baseURL, timeout e cabeçalhos JSON).
* **`alertaService.ts`** - Camada isolada contendo as funções de comunicação (`listar`, `buscarPorId`, `criar`, `atualizar` e `deletar`).

---

## 🔧 Como Executar e Testar a Integração

### 1. Inicialização do Backend (Spring Boot)
Para o aplicativo funcionar, o backend da equipe deve estar rodando localmente na máquina:
1. Abra a API Java na sua IDE.
2. Certifique-se de que os Controllers possuem a anotação `@CrossOrigin(origins = "*")`.
3. Inicie o servidor, que responderá na porta `8080` utilizando o banco H2 em arquivo.

### 2. Configuração da BASE_URL no App
Abra o arquivo `src/services/api.ts` e altere a URL base conforme o seu ambiente de teste:
* **Navegador Web / iOS:** `http://localhost:8080`
* **Emulador Android no PC:** `http://10.0.2.2:8080`
* **Celular Físico (Expo Go):** O IP local da sua máquina (ex: `http://192.168.X.X:8080`)

### 3. Rodando o Frontend
Com o backend ativo, abra o terminal na pasta do projeto mobile e execute:
```bash
npm install
npx expo start -c