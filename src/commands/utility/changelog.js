const { SlashCommandBuilder } = require('discord.js');
const embedBuilder = require('../../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('View the latest development milestones and protocol updates.'),
    cooldown: 5,
    async execute(interaction, client) {
        await interaction.reply({
            embeds: [embedBuilder({
                title: 'Nexus v8.7.0 // Singularity Ascension',
                description: 'A major stabilization and infrastructural expansion of the neural framework.',
                fields: [
                    { 
                        name: '🛡️ Shard Stabilization', 
                        value: 'Rebuilt sharding orchestration with advanced lifecycle telemetry and worker thread mode for 100% uptime.' 
                    },
                    { 
                        name: '📜 Grand Directive', 
                        value: 'Authored an elite 10k-entity scaling blueprint in `server.md` for high-prestige community growth.' 
                    },
                    { 
                        name: '🔍 Neural Retrieval', 
                        value: 'Implemented a real-time command search protocol on the web portal for immediate directive access.' 
                    },
                    { 
                        name: '✨ Portal Refinement', 
                        value: 'Ascended the visual design system across all 9 informational sectors with glassmorphism and animations.' 
                    }
                ],
                footer: 'Nexus Protocol • Singularity Ascension Archive'
            })]
        });
    },
};
