const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const embedBuilder = require('../../utils/embedBuilder');
const GuildConfig = require('../../models/GuildConfig');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configure guild-specific Nexus settings.')
        .addStringOption(opt => opt.setName('setting').setDescription('The setting to configure')
            .setRequired(true)
            .addChoices(
                { name: 'Welcome Channel', value: 'welcomeChannel' },
                { name: 'Log Channel', value: 'logChannel' },
                { name: 'Auto-Role', value: 'autoRole' },
                { name: 'Leveling', value: 'leveling' },
                { name: 'View All', value: 'view' }
            ))
        .addStringOption(opt => opt.setName('value').setDescription('Channel mention, role mention, or on/off').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    cooldown: 5,
    async execute(interaction) {
        const setting = interaction.options.getString('setting');
        const value = interaction.options.getString('value');

        try {
            let config = await GuildConfig.findOne({ guildId: interaction.guild.id });
            if (!config) {
                config = new GuildConfig({ guildId: interaction.guild.id });
            }

            if (setting === 'view') {
                return interaction.reply({
                    embeds: [embedBuilder({
                        title: '⚙️ Guild Configuration',
                        description: `Settings for **${interaction.guild.name}**`,
                        fields: [
                            { name: '👋 Welcome Channel', value: config.welcomeChannel ? `<#${config.welcomeChannel}>` : '`Not set`', inline: true },
                            { name: '📋 Log Channel', value: config.logChannel ? `<#${config.logChannel}>` : '`Not set`', inline: true },
                            { name: '🎭 Auto-Role', value: config.autoRole ? `<@&${config.autoRole}>` : '`Not set`', inline: true },
                            { name: '📊 Leveling', value: config.levelingEnabled ? '`✅ Enabled`' : '`❌ Disabled`', inline: true },
                        ],
                        color: '#00F5FF'
                    })]
                });
            }

            if (!value) {
                return interaction.reply({
                    embeds: [embedBuilder({ title: '⚠️ Missing Value', description: 'Please provide a value for this setting.', color: '#FF4444' })],
                    ephemeral: true
                });
            }

            switch (setting) {
                case 'welcomeChannel':
                case 'logChannel': {
                    const channelId = value.replace(/[<#>]/g, '');
                    const channel = interaction.guild.channels.cache.get(channelId);
                    if (!channel || channel.type !== ChannelType.GuildText) {
                        return interaction.reply({
                            embeds: [embedBuilder({ title: '⚠️ Invalid Channel', description: 'Please mention a valid text channel.', color: '#FF4444' })],
                            ephemeral: true
                        });
                    }
                    config[setting] = channelId;
                    break;
                }
                case 'autoRole': {
                    const roleId = value.replace(/[<@&>]/g, '');
                    const role = interaction.guild.roles.cache.get(roleId);
                    if (!role) {
                        return interaction.reply({
                            embeds: [embedBuilder({ title: '⚠️ Invalid Role', description: 'Please mention a valid role.', color: '#FF4444' })],
                            ephemeral: true
                        });
                    }
                    config.autoRole = roleId;
                    break;
                }
                case 'leveling': {
                    const enabled = ['on', 'true', 'enable', 'yes'].includes(value.toLowerCase());
                    config.levelingEnabled = enabled;
                    break;
                }
            }

            await config.save();

            const displayValue = setting === 'leveling'
                ? (config.levelingEnabled ? '`✅ Enabled`' : '`❌ Disabled`')
                : setting === 'autoRole'
                    ? `<@&${config.autoRole}>`
                    : `<#${config[setting]}>`;

            await interaction.reply({
                embeds: [embedBuilder({
                    title: '⚙️ Configuration Updated',
                    description: `**${setting}** has been set to ${displayValue}.`,
                    color: '#00FF88'
                })]
            });
        } catch (err) {
            await interaction.reply({
                embeds: [embedBuilder({ title: '⚠️ Error', description: 'Failed to update configuration.', color: '#FF4444' })],
                ephemeral: true
            });
        }
    }
};
