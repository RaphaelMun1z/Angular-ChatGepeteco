# ChatGepeteco

## 📋 Pré-requisitos

* **Docker Desktop** instalado e em execução.
* (Opcional) Git, caso vá clonar o repositório.

## 🚀 Como Rodar

1. **Baixe o projeto** (ou garanta que você tenha os arquivos `docker-compose.yml` e `.env` na mesma pasta).
2. **Configure as Senhas**:
* Crie um arquivo chamado `.env` na raiz do projeto (copie do `.env.example`).
* Defina as variáveis básicas:
```properties
POSTGRES_DB=chatgepeteco
POSTGRES_USER=postgres
POSTGRES_PASSWORD=...
JWT_SECRET=...

```

3. **Inicie o Sistema**:
Abra o terminal na pasta do projeto e execute:
```bash
docker-compose up -d

```

> **☕ Aguarde alguns minutos na primeira vez:** O Docker irá baixar as imagens do Front, Back, Banco de Dados e, automaticamente, fará o download do modelo de Inteligência Artificial (pode levar um tempo dependendo da internet).

## 🌐 Acessando a Aplicação

Após todos os containers iniciarem, acesse:

* **Frontend (Chat):** [http://localhost:4200](https://www.google.com/search?q=http://localhost:4200)
* **Backend (API):** [http://localhost:8080/api](https://www.google.com/search?q=http://localhost:8080/api)

## 🛑 Como Parar

Para desligar tudo e liberar memória:

```bash
docker-compose down

```

---

### 🛠 Solução de Problemas

* **Erro de Porta em uso:** Certifique-se de que não há outro Postgres (porta 5432) ou servidor rodando nas portas 8080/4200.
* **IA não responde:** Verifique se o container `IA-Ollama` e `ollama-pull-model` terminaram de rodar. Na primeira execução, o download do modelo pode demorar.