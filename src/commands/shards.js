const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shards')
        .setDescription('Displays the active shard HUD and latency metrics.'),
    async execute(interaction) {
        const shardInfo = await interaction.client.shard.broadcastEval(c => ({
            id: c.shard.ids[0],
            guilds: c.guilds.cache.size,
            ping: c.ws.ping,
            uptime: c.uptime
        }));

        const description = shardInfo.map(s => {
            const status = s.ping < 250 ? '🟢 STABLE' : (s.ping < 500 ? '🟡 DEGRADED' : '🔴 CRITICAL');
            return `**Shard ${s.id}** [${status}]\n\`Latency: ${s.ping}ms | Nodes: ${s.guilds} | Uptime: ${(s.uptime / 3600000).toFixed(2)}h\``;
        }).join('\n\n');

        const embed = createEmbed({
            title: '📡 Network Shard HUD',
            description: `\`[SCANNING ACTIVE SHARDS...]\` \n\n${description}`,
            color: '#00FFCC',
            footer: 'Nexus Shard Monitoring // Real-time Telemetry'
        });

        await interaction.reply({ embeds: [embed] });
    },
};
