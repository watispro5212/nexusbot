const { SlashCommandBuilder } = require('discord.js');
const embedBuilder = require('../../utils/embedBuilder');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View a detailed operative profile card.')
        .addUserOption(opt => opt.setName('user').setDescription('The user to view').setRequired(false)),
    cooldown: 5,
    async execute(interaction) {
        const target = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(target.id).catch(() => null);

        let userData;
        try {
            userData = await User.findOne({ userId: target.id, guildId: interaction.guild.id });
        } catch { userData = null; }

        const level = userData?.level || 1;
        const xp = userData?.xp || 0;
        const xpNeeded = 5 * (level ** 2) + 50 * level + 100;
        const progressPercent = Math.floor((xp / xpNeeded) * 100);
        const progressBar = generateBar(progressPercent);

        const balance = userData?.balance || 0;
        const bank = userData?.bank || 0;
        const rep = userData?.reputation || 0;
        const bio = userData?.bio || '*No bio set*';
        const badges = userData?.badges?.length > 0 ? userData.badges.join(' ') : 'None';
        const streak = userData?.streak || 0;
        const totalEarned = userData?.totalEarned || 0;

        const embed = embedBuilder({
            title: `${target.username}'s Profile`,
            description: bio,
            color: userData?.profileColor || '#00F5FF',
            thumbnail: target.displayAvatarURL({ dynamic: true, size: 256 }),
            fields: [
                { name: '📊 Level', value: `**${level}**`, inline: true },
                { name: '✨ XP', value: `${xp.toLocaleString()} / ${xpNeeded.toLocaleString()}`, inline: true },
                { name: '⭐ Reputation', value: `**${rep}**`, inline: true },
                { name: '📈 Progress', value: `${progressBar} ${progressPercent}%`, inline: false },
                { name: '💰 Wallet', value: `¤ ${balance.toLocaleString()}`, inline: true },
                { name: '🏦 Bank', value: `¤ ${bank.toLocaleString()}`, inline: true },
                { name: '🔥 Streak', value: `${streak} days`, inline: true },
                { name: '💎 Total Earned', value: `¤ ${totalEarned.toLocaleString()}`, inline: true },
                { name: '🏅 Badges', value: badges, inline: true },
            ],
            author: target.tag,
            authorIcon: target.displayAvatarURL({ dynamic: true })
        });

        if (member) {
            embed.addFields({
                name: '📅 Joined',
                value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`,
                inline: true
            });
        }

        await interaction.reply({ embeds: [embed] });
    }
};

function generateBar(percent) {
    const filled = Math.round(percent / 10);
    const empty = 10 - filled;
    return '`' + '█'.repeat(filled) + '░'.repeat(empty) + '`';
}
