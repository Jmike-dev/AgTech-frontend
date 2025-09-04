# AgTechFrontend

**AgTechFrontend** is a web-based administrative dashboard built with [Angular](https://angular.io/). This guide will help you set up and run the application locally.

---

## 🚀 Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Angular CLI](https://angular.io/cli)
- [pnpm](https://pnpm.io) _(optional — alternative to npm)_

---

## 🛠️ Setup

1. **Clone the repository** and navigate into the project directory:
    ```bash
    git clone <repository-url>
    cd AgTech-Frontend
    ```
2. Install Angular CLI globally (if not already installed):

```
npm install -g @angular/cli
```

3. Install dependencies using your preferred package manager:

```
npm install
# or
pnpm install
```

## ▶️ Running the Application

Choose an environment to run the app:

### ✅ Production

This will use the live [API url](https://agtech-erp-production.up.railway.app/api)

```bash
npm run start:prod
# or
pnpm run start:prod
```

### ✅ local

this will use [localurl](http://localhost:4000/api)

```bash
npm run start:develop
# or
pnpm run start:develop
```

```

```
