# 🍽️ Sistema de Gerenciamento de Restaurant

Um sistema para o gerenciamento de restaurante,: Banco de Dados, Back-end (API) e Front-end (UI). 

O projeto implementa um CRUD (Create, Read, Update, Delete) com exclusão lógica (Soft Delete) para 7 entidades fundamentais: **Clientes, Categorias, Formas de Pagamento, Garçons, Cardápio, Pedidos e Itens do Pedido**.

---

## 🎥 Apresentação do Projeto

**[👉 apresentação do sistema (Google Drive)](https://drive.google.com/file/d/1R6tuE_wXZNMggB2_Xbx1-xoz5NqLo9-L/view?usp=sharing)**

---

## 🏗️ Arquitetura e Repositórios


* 🗄️ **[BD-RESTAURANTE](https://github.com/GuiFrancini/BD-RESTAURANTE)**
  Contém toda a modelagem de dados, incluindo o Modelo Entidade-Relacionamento (MER), scripts de criação das tabelas, inserção de dados iniciais e as **Stored Procedures** .

* ⚙️ **[Restaurante-api](https://github.com/GuiFrancini/Restaurante-api)**
  Back-end RESTful desenvolvido em **Node.js, Express e TypeScript**. Organizado no padrão MVC/Service, consome o banco de dados executando as Procedures e devolve respostas padronizadas via JSON.

* 💻 **[Restaurante-front](https://github.com/GuiFrancini/Restaurante-front)**
  Aplicação cliente desenvolvida em **React, TypeScript e Vite**. Consome a API através do Axios e possui uma interface minimalista

---

## 🚀 Tecnologias Utilizadas

**Front-end:**
* React + TypeScript + Vite
* React Router DOM 
* Axios (Requisições HTTP)
* Lucide React 

**Back-end:**
* Node.js + Express
* TypeScript
* MySQL2 
* CORS

**Banco de Dados & Infraestrutura:**
* MySQL (via Docker)
* Stored Procedures SQL

---

## 🛠️ Como rodar o projeto localmente


### Pré-requisitos
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (versão 18+)
* [Docker](https://www.docker.com/)

### Passo 1: Subindo o Banco de Dados (Docker + MySQL)

1. Clone o repositório do banco de dados:
   ```bash
   git clone [https://github.com/GuiFrancini/BD-RESTAURANTE.git](https://github.com/GuiFrancini/BD-RESTAURANTE.git)
   cd BD-RESTAURANTE
   Inicie um contêiner MySQL mapeando para a porta 3307 (para evitar conflitos com instalações locais):

Bash

# 2. Configuração do Banco de Dados (MySQL)

## 2.1 Iniciar o Contêiner MySQL

Execute o comando abaixo para criar e iniciar um contêiner MySQL utilizando a porta **3307**, evitando conflitos com instalações locais:

```bash
docker run --name mysql-restaurante -e MYSQL_ROOT_PASSWORD=root -p 3307:3306 -d mysql:latest
```

## 2.2 Conectar ao Banco de Dados via (terminal)

| Parâmetro | Valor |
|------------|--------|
| Host | localhost |
| Porta | 3307 |
| Usuário | root |
| Senha | root |


## 2.3 Executar os Scripts SQL

Após estabelecer a conexão, execute os scripts na seguinte ordem:

### 2.3.1 Criação da Estrutura do Banco

```sql
01_create.sql
```

### 2.3.2 Inserção dos Dados Iniciais

```sql
02_insert.sql
```

### 2.3.3 Criação das Procedures

```sql
03_procedures.sql
```
---

# 3. Executando o Back-end (API)

## 3.1 Clonar o Repositório

Abra um novo terminal e execute:

```bash
git clone https://github.com/GuiFrancini/Restaurante-api.git
cd Restaurante-api
```

## 3.2 Instalar as Dependências

```bash
npm install
```

## 3.3 Iniciar o Servidor

```bash
npm run dev
```

## 3.4 Acessar a API Em:


```text
http://localhost:3001
```

---

# 4. Executando o Front-end 

## 4.1 Clonar o Repositório


```bash
git clone https://github.com/GuiFrancini/Restaurante-front.git
cd Restaurante-front
```

## 4.2 Instalar as Dependências

```bash
npm install
```

## 4.3 Iniciar a Aplicação React

```bash
npm run dev
```

## 4.4 Acessar o Sistema Em:

```text
http://localhost:5173
```

---
