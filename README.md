# NEXUS PROTOCOL // OMEGA CORE v10.0.0
> A high-fidelity, hand-crafted neural framework for elite Discord orchestration.

Nexus Protocol v10.0.0 "Omega" is a production-grade Discord bot engineered for horizontal scalability and near-zero latency. Built for communities that demand surgical precision and premium aesthetics, the Omega Core represents a complete ecosystem overhaul — 65+ commands, XP/leveling, reputation system, auto-moderation pipeline, ticket engine, giveaway system, and a redesigned 9-page informational portal.

---

## ⚡ What's New in v10.0.0
- **10 New Commands**: `ticket`, `giveaway`, `profile`, `rep`, `trivia`, `tictactoe`, `automod`, `massban`, `config`, `botinfo`
- **XP & Leveling System**: Message-based XP with level-up announcements
- **Reputation System**: Daily rep giving with profile integration
- **Auto-Moderation Pipeline**: Anti-spam, anti-link, word filter per guild
- **Ticket System**: Zero-config support channels with close button
- **Giveaway Engine**: Button-based entry, timed duration, multi-winner
- **Per-Guild Configuration**: Welcome channel, log channel, auto-role, leveling toggle
- **Welcome/Leave Messages**: Configurable welcome and farewell with auto-role
- **Complete Portal Redesign**: Particle system, glassmorphism, scroll reveals, accordion FAQ

## 🏗️ Architectural Foundations
- **Neural Engine**: Event-driven architecture utilizing Node.js 18+ LTS and Discord.js v14.
- **Economic Persistence**: Global sectoral balances managed via a secured MongoDB Atlas cluster.
- **Shard Orchestration**: Worker thread sharding with lifecycle telemetry and 60s spawn timeout.
- **Artisanal Interface**: Custom embeds and a 9-page static portal with "Deep Space" glassmorphism aesthetic.
- **Models**: User (economy, XP, rep), Warning, BlacklistEntry, GuildConfig.

## 🚀 Deployment Directives
1. **Initialize Environment**:
   ```bash
   npm install
   ```
2. **Configure Environment** (`.env`):
   ```
   TOKEN=your_discord_bot_token
   CLIENT_ID=your_client_id
   MONGODB_URI=your_mongodb_connection_string
   OWNER_IDS=your_user_id
   ```
3. **Synchronize Registry**:
   ```bash
   npm run deploy
   ```
4. **Establish Uplink**:
   ```bash
   npm run dev
   ```

## 🛡️ Security Protocol
- **Owner Dominion**: Restricted Founder commands verified via OWNER_IDS environment variable.
- **Global Blacklist**: Persistent blacklist with MongoDB-backed TTL auto-expiration.
- **Auto-Moderation**: Anti-spam, anti-link, and word filter pipeline enforced at the message level.
- **Audit Logging**: Immutable event archiving in configurable log channels.
- **Error Tracking**: Unique error IDs for all execution failures.

## 📡 Portal Network
The framework is supplemented by a 9-page artisanal informational suite:
- [Home Portal](https://shiny-giigles.pages.dev/)
- [Protocol Index](https://shiny-giigles.pages.dev/commands.html)
- [Neural Database](https://shiny-giigles.pages.dev/wiki.html)
- [Knowledge Base](https://shiny-giigles.pages.dev/faq.html)
- [Development Archive](https://shiny-giigles.pages.dev/changelog.html)

## 📊 Command Categories
| Category    | Count | Examples                                       |
|-------------|-------|------------------------------------------------|
| Security    | 15    | ban, kick, timeout, automod, massban           |
| Economy     | 13    | balance, daily, work, crime, rob, leaderboard  |
| Utility     | 20    | help, ping, ticket, giveaway, profile, botinfo |
| Fun         | 8     | 8ball, trivia, tictactoe, meme, hack           |
| Advanced    | 4     | status, audit, decode, config                  |
| Founder     | 3     | eval, reload, shutdown                         |

---
*NEXUS PROTOCOL © 2026 // ALL SYSTEMS OMEGA*
