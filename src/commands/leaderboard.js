const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');
const economy = require('../utils/EconomyManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Visualizes the elite high-worth entities of the Nexus.'),
    async execute(interaction) {
        await interaction.deferReply();
        const lb = await economy.getLeaderboard(interaction.guild.id);

        if (lb.length === 0) {
            return interaction.editReply({ 
                embeds: [createEmbed({
                    title: '🏆 Economy Leaderboard',
                    description: 'No validated financial data found for this sector.',
                    color: '#00FFCC'
                })]
            });
        }

        const promises = lb.map(async (entry, index) => {
            let tag = 'Unknown Entity';
            try {
                const user = interaction.client.users.cache.get(entry.id) || await interaction.client.users.fetch(entry.id);
                tag = user.username;
            } catch (err) {}
            
            let prefix = `\`#${index + 1}\``;
            if (index === 0) prefix = '🥇';
            if (index === 1) prefix = '🥈';
            if (index === 2) prefix = '🥉';

            return `${prefix} **${tag}**\n╚══ \`${entry.net.toLocaleString()}\` **CR**`;
        });

        const lines = await Promise.all(promises);

        const embed = createEmbed({
            title: '🏆 Nexus High-Worth Index',
            description: lines.join('\n\n'),
            color: '#F1C40F',
            footer: `Top ${lb.length} Shareholders | SEC-ID: nexus-idx-1`
        });

        await interaction.editReply({ embeds: [embed] });
    },
};
