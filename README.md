# Fullstack App (React + Express)

This repository contains both a **React frontend** (`client/`) and an **Express backend** (`server/`).

---

## 📂 Project Structure

my-app/
├── client/ # React frontend (Vite/CRA)
├── server/ # Express backend
└── README.md

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone https://github.com/your-username/my-app.git
cd my-app
```

### 2. Install Dependencies

##### Install both client & server using concurently

```bash
npm install
```

#### Install client deps (\*Optional)

```bash
cd client
npm install
cd ..
```

#### Install server deps (\*Optional)

```bash
cd server
npm install
cd ..
```

### 3. Copy environtment file

```bash
cp client/.env.example client/.env && cp server/.env.example server/.env
```

### 3. Run App

#### Run Both using concurrently

```bash
npm run dev

```

#### Run Frontend only (\*Optional)

```bash
cd client
npm run start
```

#### Run Backend only (\*Optional)

```bash
cd server
npm run start
```
