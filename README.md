# 🛡️ Sprint 4 (Entrega Final) - Metaindústria: Monitoramento Preventivo de Riscos Industriais

Sistema completo desenvolvido para o desafio de Indústria 4.0, integrando um aplicativo mobile em React Native (Expo) com uma API REST em Spring Boot e banco de dados H2. O objetivo é monitorar em tempo real alertas de segurança e ausência de EPIs no ambiente fabril.

---

## 👥 Integrantes da Equipe & RMs (FIAP)
* **Mateus de Souza Santos** - RM559118
* **Arthur Bergamaço Alves** - RM556207
* **Breno Barbosa Pereira** - RM555348
* **Leonardo Medeiros da Silva** - RM559220
* **Renan Melo Rosemberg** - RM558535
* **Pietro Rodriguez Medeiros** - RM555899

---

## 🔗 Repositórios do Projeto
* **Repositório Backend (Spring Boot):** [https://github.com/DevMateusDs/Sprint-Java---FIAP](https://github.com/DevMateusDs/Sprint-Java---FIAP)
* **Repositório Frontend (React Native):** [https://github.com/DevMateusDs/Sprint2-ReactNative](https://github.com/DevMateusDs/Sprint2-ReactNative)

---

## 🎥 Vídeo de Demonstração (YouTube)
* **Link da Apresentação:** 

---

## ⚙️ Pré-requisitos
Antes de executar o projeto, certifique-se de ter instalado em sua máquina:
* **Java Development Kit (JDK 17)** ou superior
* **Maven** (para gerenciar as dependências do Spring Boot)
* **Node.js** e npm
* **Expo CLI** (`npm install -g expo-cli`)

---

## 🚀 Como Executar o Projeto

### 1. Inicializando o Backend (Spring Boot)
1. Clone o repositório do backend e abra o projeto em sua IDE (IntelliJ, Eclipse, VS Code).
2. Certifique-se de que o controller possui a anotação `@CrossOrigin(origins = "*")`.
3. Execute a classe principal da aplicação Spring Boot.
4. O servidor iniciará na porta **`8080`** utilizando o banco H2 em arquivo (`/data/metaindustria.mv.db`).
5. Você pode conferir os dados em JSON acessando `http://localhost:8080/alertas` no navegador.

### 2. Configurando a `BASE_URL` no Frontend
No projeto mobile, abra o arquivo **`src/services/api.ts`** e configure a URL base conforme o seu ambiente de testes:
* **Navegador Web / iOS:** `http://localhost:8080`
* **Emulador Android:** `http://10.0.2.2:8080`
* **Celular Físico (Expo Go):** O endereço IP local da sua máquina na rede (ex: `http://192.168.1.15:8080`)

### 3. Executando o Frontend (React Native / Expo)
Abra o terminal na pasta do projeto frontend e execute os comandos:
```bash
npm install
npx expo start -c

Pressione `w` para abrir no navegador, `a` para emulador Android, ou escaneie o QR Code com o aplicativo *Expo Go* no celular.

---

## 🔌 Endpoints da API REST Utilizados pelo App
* `GET /alertas` - Lista todos os registros cadastrados.
* `GET /alertas/{id}` - Busca os detalhes de um registro específico.
* `POST /alertas` - Cria um novo alerta de segurança.
* `PUT /alertas/{id}` - Atualiza os dados de um alerta existente.
* `DELETE /alertas/{id}` - Remove o registro do sistema.

---

## 🔄 Fluxo de Dados (Arquitetura)
O sistema desacopla a interface da infraestrutura de rede:
$$\text{Tela (React Native)} \longrightarrow \text{Serviço (\texttt{alertaService.ts})} \longrightarrow \text{Cliente HTTP (\texttt{api.ts})} \longrightarrow \text{API REST (Spring Boot :8080)}$$

1. A tela aciona o método no serviço (ex: `alertaService.listar()`).
2. O serviço utiliza o Axios para disparar a requisição HTTP para a rota correspondente.
3. O Spring Boot processa a requisição, interage com o banco H2 via Spring Data JPA e devolve um JSON.
4. A tela recebe os dados, controla os estados de carregamento (`ActivityIndicator`) e renderiza os componentes.

---

## 🧪 Como Testar a Integração e a Resiliência

1. **Cadastrar e Conferir:** Abra o aplicativo, clique em cadastrar um novo alerta (preenchendo tipo, local, descrição e nível de perigo). Volte para a lista e veja o item renderizado. Acesse o endpoint no navegador (`http://localhost:8080/alertas`) para comprovar que o dado foi gravado no banco do backend.
2. **Testar com o Backend Parado (Resiliência):** 
   * Encerre a execução da aplicação Spring Boot na sua IDE.
   * No aplicativo mobile, recarregue a tela ou tente atualizar a listagem.
   * O app lidará com a exceção através de blocos `try/catch`, exibindo o erro de indisponibilidade de forma amigável e **sem utilizar dados mockados (falsos)**.
