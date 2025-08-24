# 🎬 Fullstack Movie App

Fullstack project dengan **React (client)** + **Node.js Express (server)** dalam satu repo.

---

## 📂 Project Structure

```bash
my-app/
│── client/              # React frontend
│   ├── src/
│   └── package.json
│
│── server/              # Express backend
│   ├── src/
│   └── package.json
│
│── .vscode/             # VS Code config (launch.json, tasks.json)
│── package.json         # root config (scripts + concurrently)
│── README.md
```

---

## 🚀 Setup & Run

### 1. Install Dependencies

Dari root jalankan:

```bash
npm install
npm run install:all   # kalau tidak pakai npm workspaces
```

### 2. Start Development

```bash
npm run dev
```

Akan menjalankan:

- **Server** → http://localhost:8000
- **Client** → http://localhost:3000

---

## 🐞 Debugging in VS Code

### 1. Pastikan dependencies ada

Install `concurrently` dan `nodemon`:

```bash
npm install --save-dev concurrently nodemon
```

### 2. Tambahkan script di `server/package.json`

```json
"scripts": {
  "dev": "nodemon --inspect=9229 src/index.js"
}
```

### 3. File konfigurasi VS Code

Buat folder `.vscode/` di root, lalu tambahkan:

#### `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "compounds": [
    {
      "name": "Debug Fullstack (Auto Start)",
      "configurations": ["Attach Server", "Debug Client"],
      "preLaunchTask": "Start Fullstack Dev"
    }
  ],
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach Server",
      "port": 9229,
      "restart": true,
      "skipFiles": ["<node_internals>/**"],
      "cwd": "${workspaceFolder}/server"
    },
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Debug Client",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/client/src"
    }
  ]
}
```

#### `.vscode/tasks.json`

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Fullstack Dev",
      "type": "shell",
      "command": "npm run dev",
      "isBackground": true,
      "problemMatcher": {
        "pattern": [
          {
            "regexp": ".",
            "file": 1,
            "location": 2,
            "message": 3
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Compiled successfully"
        }
      }
    }
  ]
}
```

### 4. Jalankan Debug

- Buka **Run and Debug** (Ctrl+Shift+D).
- Pilih **Debug Fullstack (Auto Start)**.
- Tekan **F5**.

👉 VS Code akan otomatis:

- Start server (`nodemon` dengan debugger port 9229).
- Start client React.
- Attach debugger ke **backend** + **frontend**.

---

## ✅ Features

- React frontend + Context API
- Express backend + REST API
- Fullstack debugging in VS Code
