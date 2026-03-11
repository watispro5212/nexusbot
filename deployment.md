# NexusBot Deployment & Webhook Setup

We have now automated the webhook verification using the **ngrok Node.js SDK**. You no longer need to download or run the ngrok CLI manually.

Follow these simple steps:

## 1. Get an ngrok Authtoken
1. Sign up/Login at [ngrok.com](https://dashboard.ngrok.com/get-started/your-authtoken).
2. Copy your **Your Authtoken**.

## 2. Update your .env
Add your authtoken to the `.env` file in your bot's folder:
```env
NGROK_AUTHTOKEN=your_authtoken_here
```

## 3. Start the Bot
Run your bot as usual:
```bash
npm run dev
```

## 4. Verification
On startup, the bot will log its public URL:
`[NGROK] Tunnel established! Public URL: https://abcd-1234.ngrok-free.app`

1. Copy that URL and add `/webhook` to the end.
   - Example: `https://abcd-1234.ngrok-free.app/webhook`
2. Paste this into the **Interactions Endpoint URL** (or Webhook URL field) in the Discord Developer Portal.
3. Click **Save Changes**. Success!

---
> [!TIP]
> **Static Dashboard**: Your GitHub Pages dashboard remains the face of your bot, while this backend handles the "behind the scenes" communication with Discord.
