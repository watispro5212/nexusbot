const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embedBuilder = require('../../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('massban')
        .setDescription('Ban multiple users simultaneously.')
        .addStringOption(opt => opt.setName('users').setDescription('User IDs separated by spaces').setRequired(true))
        .addStringOption(opt => opt.setName('reason').setDescription('Reason for the mass ban').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    cooldown: 30,
    async execute(interaction) {
        await interaction.deferReply();

        const userIds = interaction.options.getString('users').split(/[\s,]+/).filter(id => /^\d{17,20}$/.test(id));
        const reason = interaction.options.getString('reason') || 'Mass ban executed by administrator';

        if (userIds.length === 0) {
            return interaction.editReply({
                embeds: [embedBuilder({ title: '⚠️ Invalid Input', description: 'No valid user IDs provided. Separate IDs with spaces.', color: '#FF4444' })]
            });
        }

        if (userIds.length > 25) {
            return interaction.editReply({
                embeds: [embedBuilder({ title: '⚠️ Limit Exceeded', description: 'Maximum 25 users per mass ban operation.', color: '#FF4444' })]
            });
        }

        const results = { success: [], failed: [] };

        for (const userId of userIds) {
            try {
                await interaction.guild.members.ban(userId, { reason: `[MassBan by ${interaction.user.tag}] ${reason}`, deleteMessageSeconds: 86400 });
                results.success.push(userId);
            } catch {
                results.failed.push(userId);
            }
        }

        const fields = [];
        if (results.success.length > 0) {
            fields.push({ name: `✅ Banned (${results.success.length})`, value: results.success.map(id => `\`${id}\``).join(', '), inline: false });
        }
        if (results.failed.length > 0) {
            fields.push({ name: `❌ Failed (${results.failed.length})`, value: results.failed.map(id => `\`${id}\``).join(', '), inline: false });
        }

        await interaction.editReply({
            embeds: [embedBuilder({
                title: '🔨 Mass Ban Results',
                description: `**Reason:** ${reason}\n**Executed by:** ${interaction.user}`,
                fields,
                color: results.failed.length === 0 ? '#00FF88' : '#F1C40F'
            })]
        });
    }
};
