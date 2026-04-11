const { Events } = require('discord.js');
const GuildConfig = require('../../models/GuildConfig');
const embedBuilder = require('../../utils/embedBuilder');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        if (member.user.bot) return;

        try {
            const config = await GuildConfig.findOne({ guildId: member.guild.id });
            if (!config) return;

            // Send welcome message
            if (config.welcomeChannel) {
                const channel = member.guild.channels.cache.get(config.welcomeChannel);
                if (channel) {
                    await channel.send({
                        embeds: [embedBuilder({
                            title: '👋 Welcome to the Network!',
                            description: `Welcome ${member}, you are member **#${member.guild.memberCount}**!\n\nWe're glad to have you in **${member.guild.name}**. Make sure to check the rules and enjoy your stay!`,
                            color: '#00F5FF',
                            thumbnail: member.user.displayAvatarURL({ dynamic: true, size: 256 })
                        })]
                    }).catch(() => {});
                }
            }

            // Auto-role assignment
            if (config.autoRole) {
                const role = member.guild.roles.cache.get(config.autoRole);
                if (role && member.guild.members.me.roles.highest.position > role.position) {
                    await member.roles.add(role, 'Nexus Auto-Role Assignment').catch(() => {});
                }
            }

            // Log to log channel
            if (config.logChannel) {
                const logChannel = member.guild.channels.cache.get(config.logChannel);
                if (logChannel) {
                    await logChannel.send({
                        embeds: [embedBuilder({
                            title: '📥 Member Joined',
                            description: `**${member.user.tag}** joined the server.\n**Account Created:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>\n**Member Count:** ${member.guild.memberCount}`,
                            color: '#50fa7b',
                            thumbnail: member.user.displayAvatarURL({ dynamic: true, size: 128 })
                        })]
                    }).catch(() => {});
                }
            }
        } catch {}
    }
};
