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
                description: 'A stability-critical update resolving portal inconsistencies and expanding the command registry.',
                fields: [
                    { 
                        name: '🐛 Portal Stabilization', 
                        value: 'Resolved duplicated nav entries and broken HTML structure across the Wiki and Changelog sectors.' 
                    },
                    { 
                        name: '⚡ New Protocols', 
                        value: '`/snipe` `/afk` `/banner` `/announce` — 4 new commands added to the registry.' 
                    },
                    { 
                        name: '🔐 Permission Engine', 
                        value: 'Expanded server blueprint with granular permissions for all 11 operational roles.' 
                    },
                    { 
                        name: '🌌 Visual Overhaul', 
                        value: 'Animated starfield, glowing dividers, tech stack showcase, and expanded content across all 9 portal sectors.' 
                    },
                    {
                        name: '📜 Full Archive',
                        value: '[View the complete changelog →](https://shiny-giigles.pages.dev/changelog.html)'
                    }
                ],
                footer: 'Nexus Protocol • Infinitum Archive'
            })]
        });
    },
};
