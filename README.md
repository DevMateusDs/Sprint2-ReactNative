# 🛡️ Sprint 3 - Frontend Mobile: Monitoramento Preventivo de Riscos Industriais (Metaindústria)

Este aplicativo é o frontend mobile, integrando o desafio de criar soluções baseadas em **Visão Computacional e Indústria 4.0**. O objetivo do sistema é monitorar ambientes industriais em tempo real para identificar riscos ergonômicos e ausência de Equipamentos de Proteção Individual (EPIs).

Nesta Sprint 3, o aplicativo abandonou o uso de dados locais (mocks) e foi totalmente integrado ao backend em Spring Boot.

---

## 🚀 Tecnologias e Dependências Utilizadas
* **React Native + Expo** (Template Blank com TypeScript)
* **Axios** para consumo da API REST
* **React Navigation (Native Stack)** para o fluxo de navegação
* **Expo Vector Icons (Ionicons)** para elementos visuais

---

## 🔌 Integração e Endpoints (Sprint 3)
Toda a comunicação REST está abstraída na pasta `src/services/`, garantindo que a interface gráfica não lide com as requisições diretamente.

**Endpoints Consumidos da API Spring Boot:**
* `GET /alertas` - Lista os riscos ativos.
* `GET /alertas/{id}` - Busca os detalhes de uma ocorrência.
* `POST /alertas` - Registra um novo alerta no banco de dados H2.

**Resiliência (Backend Offline):**
Se a API estiver desligada, a `ListaScreen` captura a falha e renderiza um estado de erro visual informando que o backend está indisponível, acompanhado de um botão para nova tentativa, impedindo que o aplicativo feche abruptamente (crash).

---

## 🔧 Como Executar e Testar a Integração

### 1. Inicialização do Backend (Spring Boot)
Para o aplicativo funcionar, o backend da equipe deve estar rodando localmente na máquina:
1. Abra a API Java na sua IDE.
2. Certifique-se de que os Controllers possuem a anotação `@CrossOrigin(origins = "*")`.
3. Inicie o servidor, que responderá na porta `8080`.

### 2. Configuração da BASE_URL no App
Abra o arquivo `src/services/api.ts` e altere a URL base conforme o seu ambiente de teste:
* **Emulador Android no PC:** Utilize `http://10.0.2.2:8080`
* **Celular Físico (Expo Go):** Utilize o IP da máquina na rede Wi-Fi (ex: `http://192.168.0.10:8080`)

### 3. Rodando o Frontend
Com o backend ativo, navegue até a pasta do projeto mobile pelo terminal e execute:
```bash
npm install
npx expo start