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
                title: 'Nexus v9.1.0 // Infinitum Patch',
                description: 'A stability-critical update that resolves portal inconsistencies and expands the command registry.',
                fields: [
                    { 
                        name: '🐛 Portal Stabilization', 
                        value: 'Resolved duplicated navigation entries and broken HTML structure across the Wiki and Changelog sectors.' 
                    },
                    { 
                        name: '⚡ New Commands', 
                        value: 'Added `/snipe`, `/afk`, `/banner`, and `/announce` to the protocol registry.' 
                    },
                    { 
                        name: '🔐 Permission Matrix', 
                        value: 'Expanded the server blueprint with a granular role-by-role permission directive for all 11 operational nodes.' 
                    },
                    { 
                        name: '🌌 Visual Engine', 
                        value: 'Implemented an animated deep-space starfield background across all 9 portal sectors.' 
                    }
                ],
                footer: 'Nexus Protocol • Infinitum Patch Archive'
            })]
        });
    },
};
