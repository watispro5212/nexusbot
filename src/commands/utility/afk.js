const { SlashCommandBuilder } = require('discord.js');
const embedBuilder = require('../../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set your AFK status with an optional reason.')
        .addStringOption(opt =>
            opt.setName('reason')
                .setDescription('Why are you going AFK?')
                .setRequired(false)),
    cooldown: 10,
    async execute(interaction, client) {
        const reason = interaction.options.getString('reason') || 'No reason provided.';

        if (!client.afkUsers) client.afkUsers = new Map();
        client.afkUsers.set(interaction.user.id, {
            reason,
            timestamp: Date.now()
        });

        await interaction.reply({
            embeds: [embedBuilder({
                title: '💤 AFK Status Set',
                description: `You are now AFK.\n**Reason:** ${reason}`,
                color: '#FFBD2E'
            })]
        });
    },
};
