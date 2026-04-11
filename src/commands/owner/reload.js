const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const embedBuilder = require('../../utils/embedBuilder');
const logger = require('../../utils/logger');
const path = require('path');
const fs = require('fs');

module.exports = {
    ownerOnly: true,
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Hot-reloads a specific command file or all protocol commands.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload (e.g., "ping"). Use "all" for everything.')
                .setRequired(true))
        .setDefaultMemberPermissions(0),
    async execute(interaction, client) {
        const commandName = interaction.options.getString('command').toLowerCase();

        // ═══ RELOAD ALL ═══
        if (commandName === 'all') {
            await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

            const commandsDir = path.join(__dirname, '..');
            let reloaded = 0;
            let failed = 0;
            const errors = [];

            try {
                const categories = fs.readdirSync(commandsDir).filter(f =>
                    fs.statSync(path.join(commandsDir, f)).isDirectory()
                );

                for (const category of categories) {
                    const categoryPath = path.join(commandsDir, category);
                    const commandFiles = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));

                    for (const file of commandFiles) {
                        const filePath = path.join(categoryPath, file);
                        try {
                            // Clear cache
                            delete require.cache[require.resolve(filePath)];
                            // Reload
                            const newCommand = require(filePath);

                            if (newCommand.data && newCommand.execute) {
                                client.commands.set(newCommand.data.name, {
                                    ...newCommand,
                                    category: category
                                });
                                reloaded++;
                            } else {
                                failed++;
                                errors.push(`\`${file}\`: Missing data or execute`);
                            }
                        } catch (err) {
                            failed++;
                            errors.push(`\`${file}\`: ${err.message.substring(0, 80)}`);
                        }
                    }
                }

                const description = [
                    `✅ **${reloaded}** commands reloaded successfully`,
                    failed > 0 ? `❌ **${failed}** failed` : null,
                    errors.length > 0 ? `\n**Errors:**\n${errors.join('\n')}` : null,
                ].filter(Boolean).join('\n');

                await interaction.editReply({
                    embeds: [embedBuilder({
                        title: '🔄 Full Protocol Reload Complete',
                        description,
                        color: failed > 0 ? '#FFBD2E' : '#2ECC71'
                    })]
                });

                logger.info(`Reloaded ${reloaded} commands (${failed} failed)`);
            } catch (error) {
                logger.error('Full reload failed:', error);
                await interaction.editReply({
                    embeds: [embedBuilder({
                        title: '❌ Full Reload Failed',
                        description: `\`\`\`js\n${error.message}\n\`\`\``,
                        color: '#ED4245'
                    })]
                });
            }
            return;
        }

        // ═══ RELOAD SINGLE COMMAND ═══
        const command = client.commands.get(commandName);

        if (!command) {
            return interaction.reply({
                embeds: [embedBuilder({
                    title: '⚠️ Command Not Found',
                    description: `Command \`${commandName}\` is not active in the protocol registry.`,
                    color: '#ED4245'
                })],
                flags: [MessageFlags.Ephemeral]
            });
        }

        const category = command.category;
        const filePath = path.join(__dirname, `../../commands/${category}/${command.data.name}.js`);

        try {
            delete require.cache[require.resolve(filePath)];
            const newCommand = require(filePath);

            if (newCommand.data && newCommand.execute) {
                client.commands.set(newCommand.data.name, {
                    ...newCommand,
                    category: category
                });

                await interaction.reply({
                    embeds: [embedBuilder({
                        title: '✅ Command Reloaded',
                        description: `\`/${command.data.name}\` has been refreshed and is ready for execution.`,
                        color: '#2ECC71'
                    })],
                    flags: [MessageFlags.Ephemeral]
                });
            } else {
                throw new Error('Command file missing data or execute.');
            }
        } catch (error) {
            logger.error(`Failed to reload /${commandName}:`, error);
            await interaction.reply({
                embeds: [embedBuilder({
                    title: '❌ Reload Failed',
                    description: `An error occurred while reloading protocol \`${commandName}\`.\n\`\`\`js\n${error.message}\n\`\`\``,
                    color: '#ED4245'
                })],
                flags: [MessageFlags.Ephemeral]
            });
        }
    },
};
