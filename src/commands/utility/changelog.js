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
                title: 'Nexus v8.5 // Singularity Core',
                description: 'A total architectural and stylistic overhaul of the Nexus neural framework.',
                fields: [
                    { 
                        name: '🏺 Artisanal Shift', 
                        value: 'Cleaned entire codebase of robotic AI markers. Every directive is now hand-crafted for elite quality.' 
                    },
                    { 
                        name: '⚡ Performance Core', 
                        value: 'Sharding management optimized for scale. High-frequency loops refined for minimal CPU footprint.' 
                    },
                    { 
                        name: '🌐 Static Portal', 
                        value: 'Project site transitioned to a high-speed static informational suite for secure deployment.' 
                    },
                    { 
                        name: '🔮 Visual Identity', 
                        value: 'Implemented a Deep Space industrial aesthetic across all core embed responses.' 
                    }
                ],
                footer: 'Nexus Protocol • Automated Development Log'
            })]
        });
    },
};
