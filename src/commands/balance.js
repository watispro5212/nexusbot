const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');
const economy = require('../utils/EconomyManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Requests a secure read-out of your Nexus Credit reserves.')
        .addUserOption(opt => 
            opt.setName('target')
                .setDescription('The entity whose reserves you wish to audit.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target') || interaction.user;
        
        if (target.bot) {
            return interaction.reply({ content: '`[ERROR]` Artificial constructs do not possess commercial agency.', flags: 64 });
        }

        const data = await economy.getUser(target.id, interaction.guild.id);
        const netWorth = data.wallet + data.bank;
        
        // Progress Bar Logic
        const percent = Math.min(100, (data.bank / data.bankCapacity) * 100);
        const empty = '░';
        const full = '█';
        const barSize = 10;
        const filledChars = Math.round((percent / 100) * barSize);
        const bar = full.repeat(filledChars) + empty.repeat(barSize - filledChars);

        const embed = createEmbed({
            title: `💳 Nexus Financial Audit: ${target.username}`,
            thumbnail: target.displayAvatarURL({ dynamic: true, size: 256 }),
            fields: [
                { name: '👛 Liquid Assets (Wallet)', value: `\`${data.wallet.toLocaleString()}\` **CR**`, inline: true },
                { name: '🏦 Vaulted Reserves (Bank)', value: `\`${data.bank.toLocaleString()}\` / \`${data.bankCapacity.toLocaleString()}\` **CR**\n\`[${bar}]\` **${Math.floor(percent)}%**`, inline: true },
                { name: '🌐 Total Net Worth', value: `\`${netWorth.toLocaleString()}\` **Nexus Credits**`, inline: false },
            ],
            color: '#00FFCC',
            footer: 'Nexus Bank & Trust | Secure Link Active'
        });

        await interaction.reply({ embeds: [embed] });
    },
};
