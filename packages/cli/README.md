<div align="center">

# shopcn CLI

A command-line interface for managing shadcn component registries on the shopcn marketplace. This CLI tool allows component creators to easily upload and manage their shadcn components for sale on the platform.

[![npm version](https://img.shields.io/npm/v/shopcn.svg)](https://www.npmjs.com/package/shopcn)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)

</div>

---

## Overview

shopcn is an open-source marketplace where creators can monetize their shadcn UI components and templates. The CLI provides a streamlined workflow for component authors to publish their work to the registry.

## Installation

```bash
npx shopcn@latest
```

## Authentication

Before using the CLI, you need to authenticate with your shopcn server:

```bash
npx shopcn login
```

This command will:

1. Prompt you to enter your server URL (defaults to `http://localhost:8080`)
2. Open your browser to the authentication page
3. Ask you to paste the generated API key from the browser

Your credentials are securely stored locally using the [conf](https://github.com/sindresorhus/conf) library.

## Commands

<details>
<summary><strong>login</strong> - Authenticate with your shopcn server</summary>

```bash
npx shopcn login
```

**Interactive prompts:**
- Server URL (with validation)
- API key (generated through browser authentication)

</details>

<details>
<summary><strong>add</strong> - Create a draft from your registry JSON file</summary>

```bash
npx shopcn add <registry.json>
```

**Arguments:**
- `<registry.json>` - Path to your component registry file

**What it does:**
1. Validates the JSON file format
2. Creates a draft on your shopcn server
3. Opens the draft URL in your browser for further editing
4. Returns a draft ID for reference

**Example:**
```bash
npx shopcn add ./my-component/registry.json
```

</details>

<details>
<summary><strong>help</strong> - Display available commands and usage information</summary>

```bash
npx shopcn help
```

</details>

## Configuration

Configuration is stored in your system's standard config directory using the `conf` library:

| Platform | Path |
|----------|------|
| **macOS** | `~/Library/Preferences/shopcn-cli/` |
| **Linux** | `~/.config/shopcn-cli/` |
| **Windows** | `%APPDATA%\shopcn-cli\` |

**Stored data includes:**
- Server URL
- API key

## Development

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type safety |
| **Commander.js** | Command parsing |
| **Inquirer.js** | Interactive prompts |
| **tRPC** | Type-safe API communication |
| **Chalk** | Colored terminal output |
| **Ora** | Loading spinners |
| **tsup** | Bundling |

### Build

```bash
bun run build
```

### Development Mode

```bash
bun run dev
```

---

## Support

For issues and feature requests, visit the [shopcn repository](https://github.com/atharvadeosthale/shopcn).

<div align="center">

Made with ❤️ for the shadcn community

</div>
