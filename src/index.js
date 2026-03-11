const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();

// Load Commands dynamically
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Load Events dynamically
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Global Error Handlers
process.on('unhandledRejection', (error) => {
    console.error('[Unhandled Rejection]', error);
    fs.appendFileSync('error.log', `[Unhandled Rejection] ${new Date().toISOString()}\n${error.stack || error}\n\n`);
});

process.on('uncaughtException', (error) => {
    console.error('[Uncaught Exception]', error);
    fs.appendFileSync('error.log', `[Uncaught Exception] ${new Date().toISOString()}\n${error.stack || error}\n\n`);
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Discord Webhook Verification Endpoint
app.post('/webhook', (req, res) => {
    console.log('[WEBHOOK] Received payload:', JSON.stringify(req.body, null, 2));

    // Discord Event Webhook verification (PING)
    // Discord sends type: 0 for Event Webhooks and expects a 204 No Content
    if (req.body && (req.body.type === 0 || req.body.type === '0')) {
        console.log('[WEBHOOK] Responding to PING (type 0) with 204');
        return res.status(204).send();
    }

    // Interactions Endpoint verification (PING) 
    // Discord sends type: 1 for Interactions and expects { type: 1 }
    if (req.body && req.body.type === 1) {
        console.log('[WEBHOOK] Responding to PING (type 1) with type 1');
        return res.send({ type: 1 });
    }

    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.send('NexusBot Backend is running!');
});

const ngrok = require('@ngrok/ngrok');

app.listen(port, async () => {
    console.log(`[SERVER] Web server listening at http://localhost:${port}`);
    
    if (process.env.NGROK_AUTHTOKEN) {
        try {
            const session = await new ngrok.SessionBuilder()
                .authtoken(process.env.NGROK_AUTHTOKEN)
                .connect();
            const tunnel = await session.httpEndpoint()
                .listen();
            
            console.log(`[NGROK] Tunnel established! Public URL: ${tunnel.url()}`);
            console.log(`[NGROK] Use this URL in Discord: ${tunnel.url()}/webhook`);
            fs.writeFileSync('ngrok_url.txt', tunnel.url());
        } catch (err) {
            console.error('[NGROK] Failed to establish tunnel:', err.message);
        }
    } else {
        console.log('[NGROK] No NGROK_AUTHTOKEN found in .env. Skipping automated tunnel.');
    }
});

client.login(process.env.TOKEN);
