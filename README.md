# NEXUS PROTOCOL // v11.1.0 — APEX

<div align="center">

```
  ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
  ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
  ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
  ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
  ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

**The Apex-tier Discord framework for elite community orchestration.**

[![Discord.js](https://img.shields.io/badge/discord.js-v14-5865F2?logo=discord&logoColor=white)](https://discord.js.org)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-BSL--Attribution-D4A040)](LICENSE)

[**Website**](https://watispro5212.github.io/NexusBot/index.html) · [**Commands**](https://watispro5212.github.io/NexusBot/commands.html) · [**Support**](https://discord.com/invite/DYXBEd2G8M) · [**Invite Bot**](https://discord.com/api/oauth2/authorize?client_id=1480725340753101031&permissions=8&scope=bot+applications.commands)

</div>

---

## ⚡ Overview

Nexus Protocol is a production-grade Discord bot engineered for horizontal scalability and near-zero latency. Built for communities that demand surgical precision and premium aesthetics — 74 commands, XP/leveling, reputation, auto-moderation, ticket engine, giveaways, server blueprint deployment, and a full-featured web portal.

## 🆕 What's New in v11.1.0

- **Expanded `/config` Command** — Level Channel, Suggestions Channel, Starboard Channel & Threshold settings
- **`/reload all` Fully Operational** — Hot-reload every command without restart
- **`/setup-server` v2** — Full wipe + rebuild, role hierarchy (highest→lowest), permission overrides on every category, auto-posts rules/overview/links, manual setup guide
- **Ephemeral Deprecation Fix** — Migrated 47 files to `MessageFlags.Ephemeral`
- **GuildConfig Schema Expansion** — Added `levelChannel` field

## 🏗️ Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js 18+ LTS | Event-driven async engine |
| **Framework** | Discord.js v14 | Gateway, REST, slash commands |
| **Database** | MongoDB Atlas (Mongoose) | Economy, XP, config, warnings |
| **Sharding** | Worker Thread Mode | Horizontal scaling, auto-shard |
| **Caching** | In-Memory TTL Cache | GuildConfig optimization |
| **Portal** | Static HTML/CSS/JS | GitHub Pages deployment |

## 📊 Command Suite (74 Commands)

| Category | Count | Highlights |
|---|---|---|
| ⚔️ **Moderation** | 16 | ban, kick, timeout, automod, lockdown, slowall, massban, announce |
| 💰 **Economy** | 13 | balance, daily, work, crime, rob, gamble, slots, leaderboard |
| 🛠️ **Utility** | 22 | help, ping, ticket, giveaway, profile, suggest, starboard, config |
| 🎮 **Fun** | 10 | 8ball, trivia, tictactoe, meme, hack, wordle, connect4 |
| 🔬 **Advanced** | 5 | status, audit, decode, config, botinfo |
| 👑 **Owner** | 4 | eval, reload, shutdown, setup-server |
| 💎 **Special** | 4 | rep, afk, banner, snipe |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas cluster
- Discord Bot Token ([Developer Portal](https://discord.com/developers/applications))

### Installation

```bash
# Clone the repository
git clone https://github.com/watispro5212/shiny-giigles.git
cd shiny-giigles

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
TOKEN=your_discord_bot_token
CLIENT_ID=your_client_id
MONGODB_URI=your_mongodb_connection_string
OWNER_IDS=your_user_id
```

### Deployment

```bash
# Register slash commands with Discord
npm run deploy

# Start in development mode (auto-restart on changes)
npm run dev

# Start in production mode
npm start
```

## 🛡️ Security

- **Owner Lock** — Founder commands gated by `OWNER_IDS` + `ownerOnly` flag
- **Permission Hierarchy** — `setDefaultMemberPermissions(0)` for sensitive commands
- **Auto-Moderation** — Anti-spam, anti-link, word filter pipeline per guild
- **Global Blacklist** — MongoDB-backed with TTL auto-expiration
- **Audit Trail** — Configurable log channel for all mod actions
- **Error Isolation** — Unique error IDs, graceful failure handling

See [SECURITY.md](SECURITY.md) for vulnerability disclosure procedures.

## 📁 Project Structure

```
shiny-giigles/
├── src/
│   ├── index.js              # Shard manager
│   ├── bot.js                # Client initialization
│   ├── commands/
│   │   ├── economy/          # Balance, daily, work, etc.
│   │   ├── fun/              # Games and entertainment
│   │   ├── moderation/       # Ban, kick, timeout, etc.
│   │   ├── owner/            # Eval, reload, setup-server
│   │   ├── utility/          # Help, ping, ticket, etc.
│   │   └── advanced/         # Config, audit, decode
│   ├── events/               # Discord event handlers
│   ├── handlers/             # Command/event loaders
│   ├── models/               # Mongoose schemas
│   └── utils/                # Logger, cache, embeds
├── index.html                # Web portal home
├── commands.html             # Command documentation
├── changelog.html            # Version history
├── server.md                 # Support server blueprint
├── deploy-commands.js        # Slash command registration
└── package.json
```

## 🌐 Links

| Resource | URL |
|---|---|
| 🤖 Bot Invite | [Add Nexus to your server](https://discord.com/api/oauth2/authorize?client_id=1480725340753101031&permissions=8&scope=bot+applications.commands) |
| 🌐 Web Portal | [watispro5212.github.io/NexusBot](https://watispro5212.github.io/NexusBot/index.html) |
| 💬 Support | [discord.com/invite/DYXBEd2G8M](https://discord.com/invite/DYXBEd2G8M) |
| 📦 GitHub | [watispro5212/shiny-giigles](https://github.com/watispro5212/shiny-giigles) |

## 📜 License

This project is licensed under the **BSL-Attribution** license. See [LICENSE](LICENSE) for details.

Attribution to **Nexus Protocol — Created by watispro5212 and watispro1** must be retained in all copies and derivative works.

---

<div align="center">

**NEXUS PROTOCOL © 2026 // ALL SYSTEMS APEX**

</div>
