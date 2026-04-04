const { 
    SlashCommandBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
    PermissionFlagsBits 
} = require('discord.js');
const { createEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDescription('Deploys a Support Matrix Uplink panel for sector residents.')
        ,
    async execute(interaction) {
        
        await interaction.deferReply({ flags: 64 });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('create_ticket_btn')
                .setLabel('🎫 Initialize Uplink')
                .setStyle(ButtonStyle.Primary)
        );

        const embed = createEmbed({
            title: 'Support Matrix Uplink',
            description: `**[ ENCRYPTED SIGNAL ACQUIRED ]**\n\nRequire architect assistance within **${interaction.guild.name}**? \n\nExecute the \`Initialize Uplink\` terminal below to establish a private, high-security bridge directly to the server moderation layer. Do not transmit sensitive parameters prior to connection.`,
            color: '#BC13FE',
            thumbnail: interaction.guild.iconURL(),
            footer: 'Nexus Core | SECURE-TICKET-NODE'
        });

        await interaction.channel.send({ embeds: [embed], components: [row] });

        await interaction.editReply({ content: '\`[SUCCESS]\` High-Value Support Uplink successfully deployed.' });
    },
};
