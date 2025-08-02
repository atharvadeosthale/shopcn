<div align="center">

# shopcn

**Self-hosted marketplace infrastructure for shadcn components**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-blueviolet.svg)](https://turbo.build/)

*Built for developers who want to monetize their UI work*

</div>

---

## 🏗️ Architecture

This monorepo contains the complete shopcn platform:

<table>
<tr>
<td width="50%">

### Applications
- **`apps/server`** — Hono + tRPC backend
- **`apps/app`** — TanStack Start marketplace  
- **`apps/web`** — Landing page
- **`apps/docs`** — Documentation site

</td>
<td width="50%">

### Packages
- **`packages/cli`** — Component publisher CLI
- **`packages/eslint-config`** — Shared linting
- **`packages/typescript-config`** — Shared TS config

</td>
</tr>
</table>

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/atharvadeosthale/shopcn.git
cd shopcn && bun install

# Setup environment
cp apps/server/.env.example apps/server/.env
cp apps/app/.env.example apps/app/.env

# Initialize database
cd apps/server && bunx drizzle-kit push

# Start everything
bun dev
```

<div align="center">

**Servers will be running at:**

| Service | URL | Purpose |
|---------|-----|---------|
| 🔧 **Server** | `localhost:8080` | API & Authentication |
| 🛍️ **App** | `localhost:3001` | Marketplace |
| 🌐 **Web** | `localhost:3000` | Landing Page |
| 📚 **Docs** | `localhost:3002` | Documentation |

</div>

## 💰 How It Works

<details>
<summary><strong>📦 For Component Creators</strong></summary>

```bash
# 1. Authenticate with your instance
npx shopcn login

# 2. Publish your component
npx shopcn add ./my-button/registry.json

# 3. Set pricing in web interface → profit 🎉
```

</details>

<details>
<summary><strong>🛒 For Buyers</strong></summary>

1. **Browse** components in the marketplace
2. **Purchase** with Stripe checkout  
3. **Install** with shadcn CLI:
   ```bash
   bunx shadcn@latest add https://your-shop.com/install/button?key=shopcn_xyz123
   ```

</details>

## 🔧 Tech Stack

<div align="center">

| Layer | Technology |
|-------|------------|
| **Backend** | Hono • tRPC • Drizzle ORM |
| **Frontend** | TanStack Start • React |
| **Database** | PostgreSQL |
| **Auth** | Better Auth |
| **Payments** | Stripe (BYO keys) |
| **CLI** | TypeScript • Commander.js |
| **Docs** | Fumadocs • Next.js |

</div>

## 🎯 Key Features

- ⏱️ **Time-based Access** — Keys expire after 5 minutes for security
- 🏠 **Self-Hosted** — Deploy on your infrastructure, keep 100% revenue
- 🔌 **CLI Integration** — Works seamlessly with standard shadcn CLI
- 📋 **Registry Compatible** — No modifications needed to existing components
- 💳 **BYO Stripe** — Use your own Stripe keys for payments

## 🛠️ Development

<table>
<tr>
<td>

**Start all services:**
```bash
bun dev
```

**Start specific service:**
```bash
bun dev --filter=server
bun dev --filter=app
bun dev --filter=docs
```

</td>
<td>

**Build everything:**
```bash
bun build
```

**Other commands:**
```bash
bun lint
bun typecheck
bun clean
```

</td>
</tr>
</table>

## 📋 Environment Variables

<details>
<summary><strong>Server Configuration</strong></summary>

```bash
# apps/server/.env
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

BETTER_AUTH_SECRET=

FRONTEND_URL=
```

</details>

<details>
<summary><strong>App Configuration</strong></summary>

```bash
# apps/app/.env
VITE_SERVER_URL=http://localhost:8080
```

</details>

## 🚀 Deployment

### Server
```bash
cd apps/server
bun run build
# Deploy dist/ folder with environment variables
```

### Frontend
```bash
cd apps/app
bun run build
# Deploy built files to static hosting
```

## 📝 CLI Usage

The `packages/cli` provides the `shopcn` command:

```bash
npm install -g shopcn
# or
npx shopcn@latest <command>
```

| Command | Description |
|---------|-------------|
| `shopcn login` | Authenticate with server |
| `shopcn add <file>` | Upload component registry |
| `shopcn help` | Show available commands |

---

<div align="center">

**Built with ❤️ for the shadcn community**

[Documentation](https://docs.shopcn.dev) • [Issues](https://github.com/atharvadeosthale/shopcn/issues) • [Discussions](https://github.com/atharvadeosthale/shopcn/discussions)

</div>