const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, MessageFlags } = require('discord.js');
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
                { name: 'Level Channel', value: 'levelChannel' },
                { name: 'Suggestions Channel', value: 'suggestionsChannel' },
                { name: 'Starboard Channel', value: 'starboardChannel' },
                { name: 'Starboard Threshold', value: 'starboardThreshold' },
                { name: 'View All', value: 'view' }
            ))
        .addStringOption(opt => opt.setName('value').setDescription('Channel mention, role mention, number, or on/off').setRequired(false))
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

            // ═══ VIEW ALL SETTINGS ═══
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
                            { name: '📈 Level Channel', value: config.levelChannel ? `<#${config.levelChannel}>` : '`Not set`', inline: true },
                            { name: '💡 Suggestions Channel', value: config.suggestionsChannel ? `<#${config.suggestionsChannel}>` : '`Not set`', inline: true },
                            { name: '⭐ Starboard Channel', value: config.starboardChannel ? `<#${config.starboardChannel}>` : '`Not set`', inline: true },
                            { name: '⭐ Starboard Threshold', value: `\`${config.starboardThreshold || 5} ⭐\``, inline: true },
                        ],
                        color: '#00F5FF'
                    })]
                });
            }

            // ═══ REQUIRE VALUE ═══
            if (!value) {
                return interaction.reply({
                    embeds: [embedBuilder({ title: '⚠️ Missing Value', description: 'Please provide a value for this setting.\n\n**Examples:**\n• Channel settings: Mention a channel (`#channel`)\n• Auto-Role: Mention a role (`@role`)\n• Leveling: `on` or `off`\n• Starboard Threshold: A number (e.g. `5`)', color: '#FF4444' })],
                    flags: [MessageFlags.Ephemeral]
                });
            }

            // ═══ HANDLE EACH SETTING ═══
            switch (setting) {
                case 'welcomeChannel':
                case 'logChannel':
                case 'levelChannel':
                case 'suggestionsChannel':
                case 'starboardChannel': {
                    const channelId = value.replace(/[<#>]/g, '');
                    const channel = interaction.guild.channels.cache.get(channelId);
                    if (!channel || channel.type !== ChannelType.GuildText) {
                        return interaction.reply({
                            embeds: [embedBuilder({ title: '⚠️ Invalid Channel', description: 'Please mention a valid text channel (e.g. `#channel-name`).', color: '#FF4444' })],
                            flags: [MessageFlags.Ephemeral]
                        });
                    }
                    config[setting] = channelId;
                    break;
                }
                case 'autoRole': {
                    if (value.toLowerCase() === 'off' || value.toLowerCase() === 'none' || value.toLowerCase() === 'disable') {
                        config.autoRole = null;
                        break;
                    }
                    const roleId = value.replace(/[<@&>]/g, '');
                    const role = interaction.guild.roles.cache.get(roleId);
                    if (!role) {
                        return interaction.reply({
                            embeds: [embedBuilder({ title: '⚠️ Invalid Role', description: 'Please mention a valid role (e.g. `@role`).', color: '#FF4444' })],
                            flags: [MessageFlags.Ephemeral]
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
                case 'starboardThreshold': {
                    const num = parseInt(value);
                    if (isNaN(num) || num < 1 || num > 50) {
                        return interaction.reply({
                            embeds: [embedBuilder({ title: '⚠️ Invalid Number', description: 'Starboard threshold must be a number between 1 and 50.', color: '#FF4444' })],
                            flags: [MessageFlags.Ephemeral]
                        });
                    }
                    config.starboardThreshold = num;
                    break;
                }
            }

            await config.save();

            // ═══ BUILD DISPLAY VALUE ═══
            let displayValue;
            const settingLabels = {
                welcomeChannel: '👋 Welcome Channel',
                logChannel: '📋 Log Channel',
                autoRole: '🎭 Auto-Role',
                leveling: '📊 Leveling',
                levelChannel: '📈 Level Channel',
                suggestionsChannel: '💡 Suggestions Channel',
                starboardChannel: '⭐ Starboard Channel',
                starboardThreshold: '⭐ Starboard Threshold',
            };

            switch (setting) {
                case 'leveling':
                    displayValue = config.levelingEnabled ? '`✅ Enabled`' : '`❌ Disabled`';
                    break;
                case 'autoRole':
                    displayValue = config.autoRole ? `<@&${config.autoRole}>` : '`Disabled`';
                    break;
                case 'starboardThreshold':
                    displayValue = `\`${config.starboardThreshold} ⭐\``;
                    break;
                default:
                    displayValue = `<#${config[setting]}>`;
                    break;
            }

            await interaction.reply({
                embeds: [embedBuilder({
                    title: '⚙️ Configuration Updated',
                    description: `**${settingLabels[setting] || setting}** has been set to ${displayValue}.`,
                    color: '#00FF88'
                })]
            });
        } catch (err) {
            console.error('[CONFIG ERROR]', err);
            await interaction.reply({
                embeds: [embedBuilder({ title: '⚠️ Error', description: 'Failed to update configuration.', color: '#FF4444' })],
                flags: [MessageFlags.Ephemeral]
            });
        }
    }
};
