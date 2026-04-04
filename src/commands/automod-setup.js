const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const GuildConfig = require('../models/GuildConfig');
const { createEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod-setup')
        .setDescription('Configure the advanced Auto-Mod system.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcmd => 
            subcmd.setName('anti-spam')
                .setDescription('Toggle the anti-spam protection.')
                .addBooleanOption(opt => opt.setName('enabled').setDescription('Enable or disable').setRequired(true))
        )
        .addSubcommand(subcmd => 
            subcmd.setName('anti-links')
                .setDescription('Toggle the anti-link protection (blocks http/https links).')
                .addBooleanOption(opt => opt.setName('enabled').setDescription('Enable or disable').setRequired(true))
        ),

    async execute(interaction) {
        let config = await GuildConfig.findOne({ guildId: interaction.guild.id });
        if (!config) config = await GuildConfig.create({ guildId: interaction.guild.id });

        const subcmd = interaction.options.getSubcommand();
        const enabled = interaction.options.getBoolean('enabled');

        const statusText = enabled ? '🟢 **ONLINE**' : '🔴 **OFFLINE**';
        const colorHex = enabled ? '#00FFEA' : '#FF0055';

        if (subcmd === 'anti-spam') {
            config.antiSpam = enabled;
            await config.save();
            
            const embed = createEmbed({
                title: 'Auto-Mod: Heuristic Anti-Spam',
                description: `> 🛡️ **FIREWALL STATUS:** ${statusText}\n\nThe Nexus flood-control protocol has been updated. Spam matrices and rapid-transmission filters are adjusted accordingly.`,
                color: colorHex,
                type: enabled ? 'success' : 'error',
                footer: 'Nexus Security | FLOOD-DEFENSE'
            });
            return interaction.reply({ embeds: [embed] });
        }

        if (subcmd === 'anti-links') {
            config.antiLinks = enabled;
            await config.save();
            
            const embed = createEmbed({
                title: 'Auto-Mod: External Link Filter',
                description: `> 🔗 **FIREWALL STATUS:** ${statusText}\n\nExternal URL transmission filtering has been updated. Unverified hyperlink packets will be processed accordingly.`,
                color: colorHex,
                type: enabled ? 'success' : 'error',
                footer: 'Nexus Security | LINK-FIREWALL'
            });
            return interaction.reply({ embeds: [embed] });
        }
    }
};
