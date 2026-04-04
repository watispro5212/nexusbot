const { ShardingManager } = require('discord.js');
const path = require('path');
require('dotenv').config();

if (!process.env.TOKEN) {
    console.error('[FATAL] TOKEN is not set in the environment. Add it to your .env file.');
    process.exit(1);
}

const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: process.env.TOKEN,
    totalShards: 'auto',
    respawn: true,
});

manager.on('shardCreate', (shard) => {
    console.log(`[SHARD] Launched shard ${shard.id}`);
});

manager.on('shardError', (error, shardId) => {
    console.error(`[SHARD ${shardId}] Error:`, error);
});

manager.spawn().then(() => {
    console.log('[SHARD] All shards spawned successfully.');
}).catch(err => {
    console.error('[SHARD] Failed to spawn shards:', err);
});
