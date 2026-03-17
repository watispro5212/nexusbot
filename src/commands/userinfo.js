const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Executes a deep-scan of a user profile in the Nexus Grid.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The entity to be scanned.')
                .setRequired(false)),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user;
        
        await interaction.reply({
            embeds: [createEmbed({
                title: '👤 Initiating Bio-Scan...',
                description: `\`[SCANNING]\` user profile: **${targetUser.tag}**\n\`[ACCESSING]\` encrypted identity packets...`,
                color: '#FFCC00'
            })]
        });

        const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(() => null);
        const embedColor = targetMember ? targetMember.displayHexColor : '#00FFCC';
        
        // Account Age Calculation
        const createdOn = Math.floor(targetUser.createdTimestamp / 1000);
        
        let rolesValue = 'Entity not recognized in current server.';
        let rolesTitle = '🏷️ Roles';
        if (targetMember) {
            const roles = targetMember.roles.cache
                .filter(role => role.id !== interaction.guild.id)
                .sort((a, b) => b.position - a.position)
                .map(role => `<@&${role.id}>`);
                
            rolesValue = roles.length > 0 
                ? (roles.length > 10 ? roles.slice(0, 10).join(' ') + ` \`+${roles.length - 10} more\`` : roles.join(' '))
                : '`NONE`';
            rolesTitle = `🏷️ Roles [${targetMember.roles.cache.size - 1}]`;
        }

        const embed = createEmbed({
            title: '🧬 Entity Identity Decrypted',
            thumbnail: targetUser.displayAvatarURL({ dynamic: true, size: 512 }),
            color: embedColor === '#000000' ? '#00FFCC' : embedColor,
            fields: [
                { name: '👤 Username', value: `\`${targetUser.tag}\``, inline: true },
                { name: '🆔 Global ID', value: `\`${targetUser.id}\``, inline: true },
                { name: '🤖 Biological/Bot', value: targetUser.bot ? '`SYNTHETIC`' : '`BIOLOGICAL`', inline: true },
                
                { name: '📆 Creation Date', value: `<t:${createdOn}:D> (<t:${createdOn}:R>)`, inline: false },
                { name: '📥 Arrival Date', value: targetMember ? `<t:${Math.floor(targetMember.joinedTimestamp / 1000)}:R>` : '`N/A`', inline: true },
                { name: '🎨 Callsign', value: targetMember?.nickname ? `\`${targetMember.nickname}\`` : '`NONE`', inline: true },
                
                { name: rolesTitle, value: rolesValue, inline: false }
            ],
            footer: 'Nexus Bio-Scanner v5.0 | Data Sensitivity: High'
        });

        setTimeout(async () => {
            await interaction.editReply({ embeds: [embed] });
        }, 1500);
    },
};
