const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { createEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Maps the architectural layout of the current Nexus Sector.'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [createEmbed({
                title: '📡 Mapping Sector Grid...',
                description: '`[PINGING]` gateway nodes... Building architectural topology.',
                color: '#00FFCC'
            })]
        });

        const { guild } = interaction;
        await guild.members.fetch();
        
        const bots = guild.members.cache.filter(member => member.user.bot).size;
        const humans = guild.memberCount - bots;
        
        const textChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
        const voiceChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;
        const categoryCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildCategory).size;
        
        const rolesCount = guild.roles.cache.size - 1; 
        const owner = await guild.fetchOwner();

        const embed = createEmbed({
            title: `📊 Sector Topology: ${guild.name}`,
            thumbnail: guild.iconURL({ dynamic: true, size: 512 }),
            fields: [
                { name: '👑 Sector Lead', value: `\`${owner.user.tag}\``, inline: true },
                { name: '🗓️ Online Since', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
                { name: '🌍 Locale', value: `\`${guild.preferredLocale}\``, inline: true },
                
                { name: '👥 Neural Links', value: `Total: **${guild.memberCount}**\nHumans: \`${humans}\` | Synths: \`${bots}\``, inline: true },
                { name: '💬 Comms Nodes', value: `Text: \`${textChannels}\` | Voice: \`${voiceChannels}\` | Sectors: \`${categoryCount}\``, inline: true },
                { name: '🏷️ Permission Tiers', value: `\`${rolesCount}\` access levels`, inline: true },
                
                { name: '🛡️ Security Level', value: `\`${guild.verificationLevel}\``, inline: true },
                { name: '🔥 System Overclock', value: `Level \`${guild.premiumTier}\` (${guild.premiumSubscriptionCount} boosts)`, inline: true },
                { name: '🆔 Sector ID', value: `\`${guild.id}\``, inline: true }
            ],
            footer: 'Nexus Sector Mapping v6.2 | Data Integrity: Verified'
        });

        setTimeout(async () => {
            await interaction.editReply({ embeds: [embed] });
        }, 1800);
    },
};
