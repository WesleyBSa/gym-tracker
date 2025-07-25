# Sistema de Gestão de Treinos - *Em Desenvolvimento*

Este é um sistema de gestão de treinos para academias, com o objetivo de facilitar o controle de exercícios, séries, repetições e organização diária dos treinos.

> ⚠️ **Aviso**: Este projeto ainda está em desenvolvimento e novas funcionalidades estão sendo adicionadas constantemente.

---

## Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)  
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Estrutura do Projeto

```

public/
├── gymIcon.svg               # Ícone personalizado do sistema

src/
├── assets/                   # Imagens e ícones utilizados no app
│   └── react.svg
├── components/               # Componentes reutilizáveis
│   ├── ExerciseFormModal.tsx
│   ├── Header.tsx
│   └── Navigation.tsx
├── pages/                    # Páginas principais da aplicação
│   ├── Dashboard.tsx
│   ├── Exercises.tsx
│   ├── Schedule.tsx
│   └── Today.tsx
├── types/                    # Tipagens TypeScript
│   └── index.ts
├── utils/                    # Arquivos utilitários
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── vite-env.d.ts             # Configuração do ambiente Vite

````

---

## Funcionalidades em Desenvolvimento

- [x] Definição base da UI  
- [x] Cadastro de exercícios com série, repetições e peso  
- [x] Modal para adicionar exercícios  
- [x] Filtro por categoria de treino  
- [ ] Painel de visualização diária  
- [ ] Gestão da evolução de cargas  
- [ ] Tela de agendamento de treinos  
- [ ] Autenticação de usuários  
- [ ] Integração com banco de dados

---

## Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/WesleyBSa/gyn-tracker.git
````

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse no navegador:

   ```
   http://localhost:5173
   ```

---

## Acessar via Celular na Mesma Rede

* Certifique-se de que o computador e celular estão na mesma rede Wi-Fi.
* Rode o Vite com:

  ```bash
  npm run dev -- --host
  ```
* Use o IP local do seu computador no navegador do celular (ex: `http://192.168.0.100:5173`).

---

## Observações

* O projeto ainda está em fase inicial.
* A interface e os fluxos de navegação estão sendo refinados.
* Ainda sem backend e sem autenticação.

---

## Autor

* [Wesley B. Santana](https://github.com/WesleyBSa)


```
