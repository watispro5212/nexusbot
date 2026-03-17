const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');

const FACTS = [
    "Honey never spoils. You can eat 3,000-year-old honey!",
    "Octopuses have three hearts.",
    "A day on Venus is longer than a year on Venus.",
    "Bananas are berries, but strawberries aren't.",
    "There are more trees on Earth than stars in the Milky Way.",
    "A cloud can weigh more than a million pounds.",
    "Dead people can get goosebumps.",
    "The inventor of the Pringles can is now buried in one.",
    "Wombat poop is cube-shaped.",
    "The total weight of all the ants on Earth is about the same as all the humans.",
    "A single bolt of lightning contains enough energy to toast 100,000 slices of bread."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fact')
        .setDescription('Fetches a rare data point from the planetary mainframe.'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [createEmbed({
                title: '💡 Querying Mainframe...',
                description: '`[SCANNING]` physical reality for statistical anomalies...',
                color: '#10b981'
            })]
        });

        const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
        
        const embed = createEmbed({
            title: '💎 Validated Data Point',
            description: `\`\`\`\n${fact}\n\`\`\``,
            color: '#10b981',
            footer: 'Nexus Knowledge Base v4.1'
        });

        setTimeout(async () => {
            await interaction.editReply({ embeds: [embed] });
        }, 1300);
    },
};
