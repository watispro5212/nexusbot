const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');

const JOKES = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call a fake noodle? An impasta!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't skeletons fight each other? They don't have the guts.",
    "What do you call a belt made out of watches? A waist of time!",
    "How does a penguin build its house? Igloos it together!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the math book look sad? Because it had too many problems.",
    "What do you get when you cross a snowman and a vampire? Frostbite!",
    "I'm on a whiskey diet. I've lost three days already.",
    "Parallel lines have so much in common. It’s a shame they’ll never meet."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Requests a humor packet from the Nexus database.'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [createEmbed({
                title: '🔄 Accessing Humour Core...',
                description: '`[DATABASE]` Searching for optimized punchlines...',
                color: '#FFCC00'
            })]
        });

        const joke = JOKES[Math.floor(Math.random() * JOKES.length)];
        
        const embed = createEmbed({
            title: '😂 Decrypted Humor Packet',
            description: `\`\`\`\n${joke}\n\`\`\``,
            color: '#FFCC00',
            footer: 'Nexus Entertainment Module v1.2'
        });

        setTimeout(async () => {
            await interaction.editReply({ embeds: [embed] });
        }, 1200);
    },
};
