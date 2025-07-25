---

````markdown
# Sistema de Gestão de Treinos - *Em Desenvolvimento*

Este é um sistema de gestão de treinos voltado para quem faz musculação, com o objetivo de facilitar o controle e organização de exercícios, séries, repetições e a rotina semanal de treinos dos usuários.

> Este projeto está em constante desenvolvimento e novas funcionalidades estão sendo implementadas progressivamente.

---

## Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Estrutura do Projeto

```bash
public/
├── gymIcon.svg                

src/
├── assets/                     
│
├── components/                 
│   ├── CategoryHeader.tsx
│   ├── CategorySection.tsx
│   ├── CompletionButton.tsx
│   ├── DayCard.tsx
│   ├── EmptyExerciseList.tsx
│   ├── EmptyState.tsx
│   ├── ExerciseCard.tsx
│   ├── ExerciseFilters.tsx
│   ├── ExerciseFormModal.tsx
│   ├── ExerciseHeader.tsx
│   ├── ExerciseItem.tsx
│   ├── ExerciseList.tsx
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── RestDayCard.tsx
│   ├── ScheduleHeader.tsx
│   ├── StatsCards.tsx
│   ├── TodayWorkout.tsx
│   ├── WeeklyOverview.tsx
│   ├── WeeklySummary.tsx
│   ├── WelcomeHeader.tsx
│   └── WorkoutHeader.tsx
│
├── pages/                      
│   ├── Dashboard.tsx
│   ├── Exercises.tsx
│   ├── Schedule.tsx
│   └── Today.tsx
│
├── types/                      
│   └── index.ts
│
├── utils/                      
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── vite-env.d.ts               
````

---

## Funcionalidades em Desenvolvimento

* [x] Interface base com navegação entre páginas
* [x] Cadastro de exercícios com série, repetições e peso
* [x] Modal para adição de exercícios
* [x] Filtro por categoria de treino
* [x] Visualização semanal e resumo dos treinos
* [ ] Painel de treino do dia
* [ ] Evolução de carga e progresso
* [ ] Agendamento de treinos
* [ ] Autenticação e login de usuários
* [ ] Integração com banco de dados

---

## Como Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/WesleyBSa/gym-tracker.git
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse em seu navegador:

```
http://localhost:5173
```

---

## Acessar via Celular na Mesma Rede

1. Certifique-se de que o computador e o celular estão conectados à mesma rede Wi-Fi.
2. Inicie o projeto com o seguinte comando:

```bash
npm run dev -- --host
```

3. Descubra o IP local do seu computador (por exemplo: `192.168.0.100`) e acesse via navegador do celular:

```
http://192.168.0.100:5173
```

---

## Observações

* Projeto em fase inicial de desenvolvimento.
* Layout e navegação ainda estão sendo ajustados.
* Ainda sem backend nem persistência de dados.
* Futuramente será implementada autenticação e integração com banco de dados.

---

## Autor

* [Wesley B. Santana](https://github.com/WesleyBSa)


