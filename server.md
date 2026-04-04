# 🌐 NexusBot — Complete Discord Server Blueprint

Welcome to the **NexusBot Support Server Blueprint**. Use this comprehensive guide as a checklist to build and structure your Discord server perfectly from scratch. Avoid skipping steps—**especially role hierarchy positioning**—to ensure that tickets, verification, and moderation systems function correctly.

---

## 📖 How to read this guide

| Syntax          | Meaning                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| **Take Action** | Concrete action to perform in your server settings.                      |
| **Pick one**    | Choose option A _or_ B — don’t mix unless you have a specific use case.  |
| `@everyone`     | The default Discord base role — not a custom role.                       |
| `⚙️`            | Settings navigation, e.g. `Server name (top left) → Server Settings → …` |

---

## 🏗️ TL;DR — Quick Build Order

1. **Initialize Server:** Create the server and set `Server Settings → Community` (optional) / verification level.
2. **Setup Roles:** Create roles in `Server Settings → Roles`. **Exact order is critical** (see Section 2). Drag powerful roles like **Architect** to the top.
3. **Draft Categories:** Create empty categories first, then populate them with channels (see Section 3).
4. **Configure Category Permissions:** Set **permissions directly on the categories** (see Section 4). Then click "Sync Permissions" on channels inside them.
5. **Invite Bots:** Invite **Nexus bot** and any other utility bots. Ensure their roles are dragged above the users they interact with.
6. **Screening & Welcome:** Configure **Welcome** / **Membership Screening** features (see Section 5).
7. **Populate Content:** Paste the **start-here** and **rules** text (see Sections 6 & 7). Run setup commands like `/ticket-setup` and `/verify-setup` (see Section 8).

---

## 1. ⚙️ Server Basics — First 10 Minutes

Navigate to **Server Settings** (click the gear icon or server name drop-down).

| Step | Navigation      | Action Requirements                                                                   |
| ---- | --------------- | ------------------------------------------------------------------------------------- |
| 1    | `Overview`      | **Server name:** Choose a clean name, e.g., `Nexus Protocol` or `NexusBot · Support`. |
| 2    | `Overview`      | **Icon:** Upload a high-quality icon matching your branding.                          |
| 3    | `Overview`      | **Description:** Summarize your server.                                               |
| 4    | `Safety Setup`  | **Verification level:** Set to **Medium** or **High** to stop spammers.               |
| 5    | `Notifications` | **Default Setting:** Set to **Only @mentions** so new members aren't spammed.         |
| 6    | `Privacy`       | **Moderation:** Enforce **2FA** on moderation actions for extra security.             |

---

## 2. 🎭 Role Hierarchy & Global Permissions

### ⚠️ Why order is crucial

- Users **only receive permissions** depending on their position in the role hierarchy. A role cannot moderate or assign a role higher than its own.
- **Bots** can only interact with or assign roles **below their own highest role**. Put **Bots above** levels, verified flags, and regular members.

### 🗂️ Create Roles (Top to Bottom)

**Path:** `Server Settings → Roles → Create Role`

Create **one by one** and drag to match this exact order (Row 1 is highest priority). This includes staff ranks, integrations, fun roles, and leveling roles:

| #   | Role Name              | Hex Color      | Who gets it                                    |
| --- | ---------------------- | -------------- | ---------------------------------------------- |
| 1   | `👑 Nexus Architect`   | `#FF4444`      | Server Owner & Founders                        |
| 2   | `📈 Administrator`     | `#FF0055`      | Senior Staff / Co-Owners                       |
| 3   | `⚙️ Core Team`         | `#9D00FF`      | Lead Devs & Management                         |
| 4   | `🛡️ Moderator`         | `#00FFEA`      | Moderation & Enforcement Staff                 |
| 5   | `🔨 Trial Mod`         | `#20B2AA`      | Mods in training                               |
| 6   | `💠 Support Staff`     | `#5CE1E6`      | Help desk agents & Ticket handlers             |
| 7   | `🤝 Partner`           | `#00FF00`      | Partnered Server Representatives               |
| 8   | `🎥 Content Creator`   | `#FF33CC`      | YouTubers / Streamers                          |
| 9   | `💎 Donator / VIP`     | `#FFD700`      | Financial supporters or premium users          |
| 10  | `👾 Beta Tester`       | `#FF9900`      | Users designated for alpha/beta testing        |
| 11  | `🤖 Nexus Bot`         | _(bot preset)_ | **Main Bot Application**                       |
| 12  | `🛠️ Utility Bots`      | _(bot preset)_ | Other bots (Music bots, Logging bots, Economy) |
| 13  | `👑 Level 50 · Legend` | `#E6E6FA`      | Max active chatter rank                        |
| 14  | `🏆 Level 30 · Master` | `#DDA0DD`      | High active chatter rank                       |
| 15  | `🌟 Level 10 · Adept`  | `#BA55D3`      | Mid active chatter rank                        |
| 16  | `✨ Level 5 · Novice`  | `#8A2BE2`      | Base active chatter rank                       |
| 17  | `📡 Server Booster`    | _(auto)_       | Discord Nitro Boosters                         |
| 18  | `✅ Verified`          | `#57F287`      | Users who passed the rule-screening            |
| 19  | `👤 Member`            | _(default)_    | General authenticated members                  |
| 20  | `🔊 Muted`             | `#111111`      | For custom manual muting (Deny Send Msgs)      |

### 🔐 Global Permissions per Role

_(Configure these toggles via `Server Settings → Roles`. For global roles, if a permission is not listed below, leave its toggle **OFF**. Also ensure `Send Messages` and `View Channels` are ON for everyone except the Muted role!)_

#### 👑 Owners & Senior Staff

- **`👑 Nexus Architect` & `📈 Administrator`**
  - **ON**: `Administrator` (This automatically grants all other permissions).
- **`⚙️ Core Team`**
  - **ON**: `Manage Server`, `Manage Roles`, `Manage Channels`, `Kick Members`, `Ban Members`, `Moderate Members` (Timeout), `Manage Messages`, `Manage Webhooks`.

#### 🛡️ Moderation Team

- **`🛡️ Moderator`**
  - **ON**: `Kick Members`, `Ban Members`, `Moderate Members` (Timeout), `Manage Messages`.
- **`🔨 Trial Mod`**
  - **ON**: `Moderate Members` (Timeout), `Manage Messages`.
- **`💠 Support Staff`**
  - All moderation/admin toggles stay **OFF**. (They will get special access specifically in the Tickets category).

#### 🤖 Bots

- **`🤖 Nexus Bot`**
  - **ON**: `Administrator` (Strongly recommended so it can freely create/manage private ticket channels and moderate users).
- **`🛠️ Utility Bots`**
  - **ON**: `Manage Channels` (if voice bot), `Manage Messages` (if automod bot), `Manage Webhooks` (if logging bot).

#### 👤 Community & Vanity Roles (Levels, VIPs, Members)

- **`🤝 Partner`, `🎥 Content Creator`, `💎 Donator / VIP`, `👾 Beta Tester`**
- **All `Level` Roles & `📡 Server Booster`**
- **`✅ Verified` & `👤 Member`**
  - All moderation/admin toggles stay **OFF**. These are purely cosmetic, cosmetic-perk, or gatekeeping roles.

#### 🔊 The Muted Role

- **`🔊 Muted`**
  - Clear ALL permissions. Ensure that `Send Messages`, `Send Messages in Threads`, `Add Reactions`, and `Speak` (Voice) are explicitly **OFF** globally.

---

## 3. 📂 Categories & Channels Structure

**Path:** Right-click server layout → `Create Category`. Then `Create Channel` inside. Use the vertical bar **`┃`** separator.

**Do NOT set individual channel permissions unless specifically instructed. Let them "Sync" automatically from the category.**

| Category         | Channel Name       | Type      | Notes                                     |
| ---------------- | ------------------ | --------- | ----------------------------------------- |
| `📌 INFORMATION` | `📢┃announcements` | Text (📢) | Staff-only posts.                         |
| `📌 INFORMATION` | `📰┃updates`       | Text      | Minor bot, server, or codebase updates.   |
| `📌 INFORMATION` | `📜┃rules`         | Text      | Hard rules, guidelines.                   |
| `📌 INFORMATION` | `🚀┃start-here`    | Text      | **Onboarding flow.**                      |
| `📌 INFORMATION` | `🔗┃links`         | Text      | Invites, Github, Socials, Status URLs.    |
| `💬 COMMUNITY`   | `💬┃general`       | 5s        | The main hub for conversation.            |
| `💬 COMMUNITY`   | `🤖┃bot-commands`  | 15s       | Spam zone for `/commands` and levels.     |
| `💬 COMMUNITY`   | `🎨┃showcase`      | 30s       | Sharing projects, setups, or artwork.     |
| `💬 COMMUNITY`   | `💡┃suggestions`   | Forum     | Dedicated community feedback forum.       |
| `🆘 SUPPORT`     | `❓┃faq`           | Text      | Read-only frequently asked questions.     |
| `🆘 SUPPORT`     | `🧰┃help`          | Forum     | Community support space.                  |
| `🆘 SUPPORT`     | `🐛┃bug-reports`   | Forum     | Structured bug tracking zone.             |
| `🆘 SUPPORT`     | `🔧┃self-hosting`  | Text      | Developer deployment assistance channel.  |
| `🎫 TICKETS`     | `📩┃open-a-ticket` | Text      | Read-only. Houses your bot ticket button. |
| `📚 DOCS & DEV`  | `📖┃wiki`          | Text      | Links to external documentation.          |
| `📚 DOCS & DEV`  | `🔌┃api-updates`   | Text      | Specific API/Webhook changelogs.          |
| `📚 DOCS & DEV`  | `🧪┃sandbox`       | Text      | Test zone for beta stuff.                 |
| `🔒 STAFF AREA`  | `📋┃staff-chat`    | Text      | General administrative chat.              |
| `🔒 STAFF AREA`  | `📌┃staff-notes`   | Text      | To-do lists, architecture planning.       |
| `🔒 STAFF AREA`  | `⚠️┃mod-log`       | Text      | Auto-logged events.                       |

---

## 4. 🔏 Category-Level Permissions (Sync Strategy)

To make everything cleaner, **set your permissions on the Categories themselves**. The channels inside will automatically sync.

**Path:** Right-click Category → `Edit Category` → `Permissions`. Add the specific roles listed under each category below.

### `📌 INFORMATION` Category

These are your global read-only info channels.

- **`@everyone`**: View Channel (**✓**), Send Messages (**✗**), Read Message History (**✓**)
- **`Administrators` / `Core Team`**: Send Messages (**✓**)
- **`🤖 Nexus Bot`**: Send Messages (**✓**)

### `💬 COMMUNITY` Category

Gated chatting zone for people who accepted the rules.

- **`@everyone`**: View Channel (**✗**) _(Hides chat from random unverified users)_
- **`✅ Verified`**: View Channel (**✓**), Send Messages (**✓**), Read Message History (**✓**), Attach Files (**✓**), Embed Links (**✓**)
- **`🔊 Muted`**: Send Messages (**✗**), Add Reactions (**✗**), Create Threads (**✗**), Speak in Voice (**✗**)

### `🆘 SUPPORT` Category

Gated support area.

- **`@everyone`**: View Channel (**✗**)
- **`✅ Verified`**: View Channel (**✓**), Send Messages (**✓**)
- **`🔊 Muted`**: Send Messages (**✗**)

### `🎫 TICKETS` Category

Should be mostly invisible except for the open ticket channel.

- **`@everyone`**: View Channel (**✗**)
- **`✅ Verified`**: View Channel (**✓**), Send Messages (**✗**) _(Allows them to click the ticket button without chatting)_
- **`💠 Support Staff` / `🛡️ Moderator`**: View Channel (**✓**), Send Messages (**✓**)
- **`🤖 Nexus Bot`**: View Channel (**✓**), Send Messages (**✓**), Manage Channels (**✓**) _(Allows bot to create private ticket sub-channels)_

### `📚 DOCS & DEV` Category

Gated read-only developer resources.

- **`@everyone`**: View Channel (**✗**)
- **`✅ Verified`**: View Channel (**✓**), Send Messages (**✗**)
- **`Administrators` / `Core Team`**: Send Messages (**✓**)

### `🔒 STAFF AREA` Category

Highly restricted.

- **`@everyone`**: View Channel (**✗**)
- **`🔨 Trial Mod`**, **`💠 Support Staff`**: View Channel (**✓**)
- **`🛡️ Moderator`**, **`⚙️ Core Team`**, **`Administrator`**: View Channel (**✓**), Send Messages (**✓**)
- **`🤖 Nexus Bot`**, **`🛠️ Utility Bots`**: View Channel (**✓**), Send Messages (**✓**) _(For mod-logging and alerts)_

---

## 5. 👋 Welcome & Member Screening

1. **System Welcome:** Go to `Server Settings → System Messages Channel`. Set it to `🚀┃start-here` or a dedicated `👋┃welcome`.
2. **Screening:** Enable standard built-in rules screening via the **Community Settings** tab to force users to click "I Agree" before interacting.
3. **Optional Log:** Send automated welcome logs into your `⚠️┃mod-log` channel to easily catch suspicious account creation dates.

---

## 6. 📝 Onboarding Message Template (Paste in `🚀┃start-here`)

```markdown
# 🌐 SIGNAL ACQUIRED: Welcome to the Nexus.

You have successfully connected to the **Nexus Protocol Central Hub**. Before you access the full grid, please initialize your session by reviewing the directory below:

> 🛡️ **[01] SECURITY PROTOCOLS:** Review the system laws in **#rules** to maintain your connection stability.
> 🧬 **[02] NEURAL SYNC:** Complete the Discord screening verification to bypass the firewall and unlock all public channels.
> 🤖 **[03] INTEGRATION:** Want to deploy Nexus into your own sector? Extract the invite node located in **#links**.
> 🆘 **[04] TRANSMIT DISTRESS:** Require architect assistance? Pinging staff is restricted; instead, initiate a private link in **#open-a-ticket**.
> 🐛 **[05] ANOMALY DETECTION:** Log any system glitches or bot errors in the **#bug-reports** array.

Stay vigilant and enjoy the network.
— **The Nexus Architects**
```

---

## 7. ⚖️ System Security Guidelines (Paste in `📜┃rules`)

```markdown
**[ NEXUS_ENFORCEMENT_PROTOCOL: ACTIVE ]**
Failure to comply with network standards will result in immediate connection termination (Ban) or temporary isolation (Timeout). 

🔸 **01. NO TOXIC OVERFLOW:** Hostile interactions, harassment, hate speech, and NSFW data packets are strictly prohibited. Maintain a clean signal.
🔸 **02. SECURE YOUR TOKENS:** NEVER transmit raw bot tokens, MongoDB URIs, or passwords in public arrays. Staff will NEVER request your `.env` credentials in a DM.
🔸 **03. ERROR REPORTING STANDARDS:** When filing a support request, do not just send "it's broken". Transmit your exact Node.js version, steps to reproduce the error, and console screenshots.
🔸 **04. CHANNEL DISCIPLINE:** Execute bot strings strictly within **#bot-commands**. Keep general chat channels clear of bot-spam.
🔸 **05. NETWORK TOS:** All subjects must rigidly adhere to standard [Discord Terms of Service](https://discord.com/terms).
🔸 **06. ARCHITECT JURISDICTION:** The Moderation Team holds ultimate discretion over rule interpretation. Their directives are final.
```

---

## 7.5. 🗣️ Forum Channel Setup (Tags & First Posts)

For your forum channels (`💡┃suggestions`, `🧰┃help`, `🐛┃bug-reports`), you should configure structured Tags and create a pinned "First Post" to guide users on how to use the channel properly.

### 🐛┃bug-reports (Tags)
Configure these inside the forum channel settings:
- `🔴 Critical` (Red)
- `🟠 High Priority` (Orange)
- `🟡 Minor UI` (Yellow)
- `🟢 Resolved` (Green)
- `🔵 Needs Info` (Blue)

### 🧰┃help (Tags)
- `🔧 Self-Hosting`
- `💻 Code Error`
- `⚙️ Configuration`
- `✅ Solved`

### 💡┃suggestions (Tags)
- `✨ New Feature`
- `🛠️ Enhancement`
- `🎨 UI/UX`
- `✅ Approved`
- `❌ Declined`

### 📌 Pinned "First Post" Template (For Suggestions Forum)
Create a new post in the forum, name it **"READ BEFORE POSTING: How to Suggest"**, pin it, and lock it:

```markdown
**💡 Welcome to the Nexus Suggestions Board!**

We value your ideas for improving the Nexus Protocol. To ensure your suggestion gets reviewed properly, please follow this format:

**1. Keep it Clear and Concise:** 
Title your post with exactly what you are suggesting (e.g., "Add level-up role rewards" instead of "I have a cool idea").

**2. Explain the 'Why':**
Don't just tell us *what* to add; explain *why* it would benefit the community or improve the bot.

**3. Search First:**
Please quickly scroll through recent posts to make sure your idea hasn't already been suggested. Duplicate suggestions will be closed.

Upvote suggestions you agree with to help the Architects prioritize their roadmap!
```

### 📌 Pinned "First Post" Template (For Bug Reports/Help Forums)
Create a new post in the forum, name it **"READ BEFORE POSTING: Formatting Guidelines"**, pin it, and lock it so no one else replies:

```markdown
**👋 Welcome to the Support/Bug Forum!**

To help our staff assist you efficiently, please ensure your posts contain the following structure:

**1. Title Your Post Accurately:** 
Don't use titles like "Pls help me" or "Bot doesn't work". 
Use specific titles like "Error when running /invite command" or "Missing permissions on starboard".

**2. Always Include:**
- What happened (the actual error vs. expected output).
- Detailed steps on how to reproduce the issue.
- The Node.js version and Discord.js version you are using.
- Relevant screenshots of terminal errors or Discord UI bugs.

**3. Remember:**
Never upload full `.env` files or paste your raw bot tokens. Posts that leak tokens will be immediately deleted for your own safety!
```

---

## 8. 🛠️ Protocol Deployment (Core Slash Commands)

Once the structural architecture of the server is established, it's time to physically deploy the Nexus modules via Discord's slash command interface. 

> **⚠️ CRITICAL:** Ensure the `🤖 Nexus Bot` role is positioned securely at the **very top** of your role hierarchy before running these commands, or the bot will lack the authorization to assign roles or isolate targets.

### 🎫 Module 1: `Ticket Infrastructure`
**Command:** Execute `/ticket-setup` inside your **#open-a-ticket** channel.
**Function:** Deploys the interactive "Open Ticket" UI panel.
**Architecture details:** 
- Generates a sleek embed with a futuristic button that users can click to request staff assistance.
- When clicked, Nexus dynamically spawns a hidden, private text channel (`ticket-[username]`) bridged only between the user generating the request and the `💠 Support Staff` role.
- Once the issue is resolved, staff can securely close and archive the logs.

### 🧬 Module 2: `Neural Verification`
**Command:** Execute `/verify-setup` inside your **#start-here** or welcome channel.
**Function:** Binds the `✅ Verified` role to the internal verification matrix.
**Architecture details:**
- Generates an interactive verification checkpoint interface.
- Prevents immediate chat-spam from bot-nets by ensuring newly joined accounts click through the verification firewall before unlocking access to `💬 COMMUNITY` channels.

### ⚠️ Module 3: `Action Telemetry`
**Command:** Execute `/log-setup` inside your hidden **#mod-log** channel.
**Function:** Synchronizes server telemetry to a dedicated observation channel.
**Architecture details:**
- Instructs Nexus to transmit all real-time security events to this channel.
- Automatically logs deleted messages, edited message diffs, kicked users, assigned timeouts, and banned targets to allow for complete staff oversight.

### 🛡️ Module 4: `Automod Firewall`
**Command:** Execute `/automod-setup` in any private staff channel.
**Function:** Engages the real-time heuristic spam and toxicity filters.
**Architecture details:**
- Synthesizes rulesets directly into Discord's native AutoMod interface to detect fast-posting spam floods.
- Isolates known bad actors and flags highly-toxic messages for manual staff review, effectively maintaining system integrity while you sleep.

### ⭐ Module 5: `Starboard System`
**Command:** Execute `/starboard-setup` in any channel.
**Function:** Allocates memory for a community hall-of-fame.
**Architecture details:**
- Creates a dedicated `#starboard` channel.
- When community messages reach a designated threshold of ⭐ reactions, Nexus automatically duplicates the message and embeds it into the starboard, creating a permanent archive of high-quality server interactions.

---

## 9. 🧽 Regular Maintenance (Monthly)

- [ ] Clear out or archive ancient, dead support tickets.
- [ ] Evaluate and update channel slowmode timings.
- [ ] Ensure **`📊┃status`** reflects the latest version numbers.
- [ ] Cull unused or empty permission roles.
- [ ] Re-test your **bot invite link** to make sure OAuth permissions are still optimal.

---

_Generated by the Nexus Team. Tailor specific channel names or moderation strictness strictly based on your personal community metrics._
