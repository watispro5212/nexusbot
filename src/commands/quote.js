const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');

const QUOTES = [
    "The best way to predict the future is to invent it. – Alan Kay",
    "Life is what happens when you're busy making other plans. – John Lennon",
    "Whether you think you can or you think you can't, you're right. – Henry Ford",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Innovation distinguishes between a leader and a follower. – Steve Jobs",
    "Strive not to be a success, but rather to be of value. – Albert Einstein",
    "The mind is everything. What you think you become. – Buddha",
    "An unexamined life is not worth living. – Socrates",
    "Your time is limited, so don't waste it living someone else's life. – Steve Jobs",
    "Stay hungry, stay foolish. – Steve Jobs",
    "The grid is the limit of our imagination. – Nexus Core",
    "Information is the currency of the future. – anonymous"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Extracts a wisdom fragment from the great thinkers of the Grid.'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [createEmbed({
                title: '📜 Retreiving Wisdom...',
                description: '`[SEARCHING]` history archives for relevant data strings...',
                color: '#00FFCC'
            })]
        });

        const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        const [text, author] = quote.split(' – ');

        const embed = createEmbed({
            title: '✨ Wisdom Visualization',
            description: `*"${text}"*\n\n— **${author || 'The Grid'}**`,
            color: '#00FFCC',
            footer: 'Nexus Philosophical Engine v2.0'
        });

        setTimeout(async () => {
            await interaction.editReply({ embeds: [embed] });
        }, 1500);
    },
};
