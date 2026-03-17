const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Initiates a meme-packet retrieval from the dankest sectors of the Grid.'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [createEmbed({
                title: '🖼️ Accessing Dank Core...',
                description: '`[RETRIEVING]` high-occupancy humor files...',
                color: '#D800FF'
            })]
        });

        try {
            const res = await fetch('https://meme-api.com/gimme');
            if (!res.ok) throw new Error('API failed');
            
            const data = await res.json();

            if (data.nsfw) {
                return interaction.editReply({ content: '`[FILTERED]` Data packet contains NSFW content. Safety protocols engaged.', embeds: [] });
            }

            const embed = createEmbed({
                title: `✨ ${data.title}`,
                url: data.postLink,
                color: '#D800FF'
            }).setImage(data.url)
              .setFooter({ text: `👍 ${data.ups} | Sector: r/${data.subreddit}` });

            setTimeout(async () => {
                await interaction.editReply({ embeds: [embed] });
            }, 1000);

        } catch (error) {
            await interaction.editReply({ content: '`[ERROR]` Link to the meme-vault timed out. Try again later.', embeds: [] });
        }
    },
};
