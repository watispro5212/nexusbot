const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('network-stats')
        .setDescription('Retrieves a global cloud map of the Nexus network.'),
    async execute(interaction) {
        const totalGuilds = await interaction.client.shard.fetchClientValues('guilds.cache.size');
        const totalUsers = await interaction.client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0));
        
        const sumGuilds = totalGuilds.reduce((acc, count) => acc + count, 0);
        const sumUsers = totalUsers.reduce((acc, count) => acc + count, 0);

        const embed = createEmbed({
            title: '🌐 Global Cloud Map',
            description: `\`[RETRIEVING NETWORK METRICS...]\` \n\n` +
                         `**Total Active Nodes:** \`${sumGuilds}\`\n` +
                         `**Total Registered Operatives:** \`${sumUsers}\`\n` +
                         `**Sharding Protocol:** \`${interaction.client.shard.count} active shards\``,
            color: '#BC13FE',
            footer: 'Nexus Intelligence Hub // Global Analytics'
        });

        await interaction.reply({ embeds: [embed] });
    },
};
