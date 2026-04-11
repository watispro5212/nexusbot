const { Events } = require('discord.js');
const GuildConfig = require('../../models/GuildConfig');
const embedBuilder = require('../../utils/embedBuilder');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        if (member.user.bot) return;

        try {
            const config = await GuildConfig.findOne({ guildId: member.guild.id });
            if (!config) return;

            // Log to log channel
            if (config.logChannel) {
                const logChannel = member.guild.channels.cache.get(config.logChannel);
                if (logChannel) {
                    const roles = member.roles.cache
                        .filter(r => r.id !== member.guild.id)
                        .map(r => r.toString())
                        .slice(0, 15)
                        .join(', ') || 'None';

                    await logChannel.send({
                        embeds: [embedBuilder({
                            title: '📤 Member Left',
                            description: `**${member.user.tag}** left the server.\n**Joined:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>\n**Roles:** ${roles}\n**Member Count:** ${member.guild.memberCount}`,
                            color: '#FF4444',
                            thumbnail: member.user.displayAvatarURL({ dynamic: true, size: 128 })
                        })]
                    }).catch(() => {});
                }
            }

            // Goodbye message in welcome channel
            if (config.welcomeChannel) {
                const channel = member.guild.channels.cache.get(config.welcomeChannel);
                if (channel) {
                    await channel.send({
                        embeds: [embedBuilder({
                            title: '👋 Farewell',
                            description: `**${member.user.tag}** has left the network. We now have **${member.guild.memberCount}** members.`,
                            color: '#FF8C00',
                            thumbnail: member.user.displayAvatarURL({ dynamic: true, size: 128 })
                        })]
                    }).catch(() => {});
                }
            }
        } catch {}
    }
};
