const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const GuildConfig = require('../models/GuildConfig');
const { createEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log-setup')
        .setDescription('Configure the advanced server audit logging system.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(opt => 
            opt.setName('channel')
                .setDescription('The channel where audit logs should be sent.')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),

    async execute(interaction) {
        let config = await GuildConfig.findOne({ guildId: interaction.guild.id });
        if (!config) config = await GuildConfig.create({ guildId: interaction.guild.id });

        const channel = interaction.options.getChannel('channel');

        config.logChannelId = channel.id;
        await config.save();
        
        const embed = createEmbed({
            title: 'Telemetry Node Synchronized',
            description: `> 🟢 **STATUS: ONLINE**\n> 📡 **DESTINATION:** <#${channel.id}>\n\nAll real-time network traffic and anomaly detections will now be successfully transmitted to the designated output channel. System oversight is active.`,
            color: '#00FFEA',
            type: 'success',
            footer: 'Nexus Security | EVENT-LOGS'
        });
        return interaction.reply({ embeds: [embed] });
    }
};
