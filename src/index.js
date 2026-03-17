const { ShardingManager } = require('discord.js');
const path = require('path');
require('dotenv').config();

const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: process.env.TOKEN,
    totalShards: 'auto', // Or a specific number like 2 for manual testing
});

manager.on('shardCreate', shard => {
    console.log(`[SHARD] Launched shard ${shard.id}`);
});

manager.spawn().catch(err => {
    console.error('[SHARD] Failed to spawn shards:', err);
});
