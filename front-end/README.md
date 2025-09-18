# ﻿⚛️ CareConnect 

O CareConnect  é a interface web desenvolvida em **React** para gerenciar pacientes, profissionais de saúde, usuários e consultas médicas.  
Ele se integra à **CareConnect API** para fornecer uma experiência completa de gerenciamento clínico, com autenticação e navegação intuitiva.

---

## 🌐 Visão Geral

A aplicação fornece:

- Login, cadastro e recuperação de senha de usuários  
- Dashboard com resumo de pacientes, profissionais e consultas  
- Cadastro, listagem e edição de pacientes e profissionais  
- Visualização e gerenciamento de consultas médicas  
- Navegação com barra inferior (`BottomNav`) e botão de voltar (`BackButton`)  
- Rotas públicas e privadas com proteção via estado de autenticação  

---

## 🚀 Funcionalidades

### 👤 Usuários

- Login e logout  
- Cadastro de novos usuários  
- Recuperação de senha  
- Rotas privadas protegidas  

### 🧑‍⚕️ Profissionais

- Cadastro de profissionais de saúde  
- Listagem de todos os profissionais  
- Atualização de dados de profissionais  

### 😊 Pacientes

- Cadastro de pacientes  
- Listagem de pacientes  
- Edição de informações de pacientes  

### 🗓️ Consultas

- Criação de consultas vinculadas a pacientes e profissionais  
- Listagem de todas as consultas  
- Atualização de agendamento (data, status, paciente, profissional)  

### 🧭 Navegação

- **BottomNav**: barra inferior fixa para acessar páginas principais  
- **BackButton**: botão de voltar fixo, não exibido nas telas de login e recuperação de senha  

---

## 🔗 Rotas Principais

### 🔓 Rotas Públicas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/login` | `LoginPage` | Tela de login do usuário |
| `/register` | `Register` | Tela de cadastro de novos usuários |
| `/forgot-password` | `ForgotPasswordPage` | Tela de recuperação de senha |

### 🔒 Rotas Privadas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/home` | `Home` + `BottomNav` | Página inicial com cards de resumo |
| `/dashboard` | `Dashboard` | Resumo de pacientes, médicos e consultas |
| `/patient/create` | `RegisterPatient` + `BottomNav` | Cadastro de pacientes |
| `/patient/listAll` | `ListPatients` + `BottomNav` | Listagem de pacientes |
| `/edit-patient/:id` | `RegisterPatient` | Edição de informações do paciente |
| `/professional/listAll` | `HeaderProfessional` + `ProfessionalList` + `BottomNav` | Listagem de profissionais |
| `/professional/create` | `HeaderProfessional` + `AppCreate` + `BottomNav` | Cadastro de profissionais |
| `/appointments` | `AppointmentsScreen` + `BottomNav` | Gerenciamento de consultas |

---

## 📌 Componentes Principais

| Componente | Descrição |
|------------|-----------|
| `LoginPage` | Tela de login |
| `Register` | Tela de cadastro |
| `ForgotPasswordPage` | Recuperação de senha |
| `Home` | Página inicial com cards e barra de navegação |
| `Dashboard` | Resumo do sistema


## 🛠 Tecnologias Utilizadas

- ⚛️ **React** (hooks)  
- 🌐 **React Router DOM** (navegação)  
- 🎨 **CSS / SCSS** (estilização)  
- 🖼 **React Icons** (ícones)  
- 📦 **Axios** (integração com backend)

---

## ▶️ Como executar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/alaenepereira/careconnect-client
cd careconnect-client

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

👨‍🏫 Projeto Educacional
Desenvolvido durante o Bootcamp de Desenvolvimento Fullstack – Capacita Brasil.

👩‍💻 Desenvolvido por:

Alaene Silva

Larissa Victória

Samuel Albuquerque

Romário Paixão

Julianny Albuquerque

✨ Projeto frontend para gestão de clínica médica, integrado com CareConnect API.
