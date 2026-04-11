# SECURITY PROTOCOL // NEXUS v11.1.0

> Maintaining the integrity of the Apex neural engine.

## 🛡️ Supported Versions

| Version | Status |
|---|---|
| 11.1.x | ✅ **Active support** — Security patches and bug fixes |
| 11.0.x | ⚠️ Maintenance only — Critical patches only |
| 10.x.x | ❌ End of life — No longer supported |
| < 10.0 | ❌ End of life — Upgrade immediately |

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in the Nexus Protocol, **do NOT open a public issue**. Instead, use one of these private channels:

1. **Support Hub** — Open a priority ticket in the [Official Support Server](https://discord.com/invite/DYXBEd2G8M) under `#📥-open-ticket`.
2. **Founder DM** — Contact `watispro1` or `watispro5212` directly on Discord.

### What to include in your report:
- A clear description of the vulnerability
- Steps to reproduce the issue
- The potential impact (data exposure, privilege escalation, etc.)
- Your Discord username (for follow-up)

### Response timeline:
- **Acknowledgment**: Within 24 hours
- **Assessment**: Within 72 hours
- **Patch (if confirmed)**: Within 7 days for critical issues

## 🔒 Security Architecture

### Authentication & Authorization
- **Owner Lock**: All administrative commands (`eval`, `reload`, `shutdown`, `setup-server`) are gated behind the `OWNER_IDS` environment variable and the `ownerOnly` flag in the interaction handler.
- **Permission Hierarchy**: Sensitive commands use `setDefaultMemberPermissions(0)` to hide them from all non-admin users by default.
- **Guild-Locked Commands**: `setup-server` is restricted to a single guild ID to prevent misuse.

### Data Protection
- **Transport Security**: All connections to Discord's API and MongoDB Atlas use TLS encryption.
- **Database**: MongoDB Atlas with at-rest encryption, network access lists, and authentication.
- **Environment Variables**: Secrets (`TOKEN`, `MONGODB_URI`) are never hardcoded — loaded from `.env` at runtime.
- **No PII Storage**: The bot stores Discord IDs, balances, and XP — no personal information is collected or retained.

### Runtime Security
- **Input Validation**: All slash command inputs are validated by Discord's API schema before reaching the bot.
- **Error Isolation**: Every command is wrapped in try/catch with unique error IDs — failures do not cascade.
- **Rate Limiting**: Built-in per-command cooldowns prevent abuse.
- **Auto-Moderation**: Configurable anti-spam, anti-link, and word filter pipeline at the message level.
- **Global Blacklist**: MongoDB-backed blacklist with TTL auto-expiration for banned users.

### Audit & Monitoring
- **Mod Log**: All moderation actions (ban, kick, timeout, warn) are logged to a configurable channel.
- **Security Feed**: Automated infraction logs and audit trail.
- **Shard Telemetry**: Connection state, reconnects, and errors are logged with timestamps.

## ⚠️ Known Security Boundaries

- **`/eval` command**: Executes arbitrary JavaScript. Only available to verified `OWNER_IDS`. Never expose your bot token or grant owner access to untrusted users.
- **Webhook URLs**: If using GitHub/UptimeRobot webhooks, keep URLs private — they can be used to post messages to your channels.
- **Database Access**: Protect your `MONGODB_URI` — it grants full read/write access to all bot data.

## 🧪 Security Practices

- Recursive code audits are performed before every major version release.
- Dependencies are monitored via `npm audit` and updated regularly.
- The bot follows the principle of least privilege — it only requests the permissions it needs.

---

*NEXUS PROTOCOL © 2026 // ALL SYSTEMS APEX*
