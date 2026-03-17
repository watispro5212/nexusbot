const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embed');

const RESPONSES = [
    // POSITIVE (The Light Cycle)
    "PROTOCOL: AFFIRMATIVE. THE DATA STREAMS ALIGN.",
    "SCAN COMPLETE. EXECUTION RECOMMENDED.",
    "THE ORACLE PREDICTS A 99.8% SUCCESS RATE.",
    "WITHOUT A DOUBT. THE GRID HAS SPOKEN.",
    "ACCESS GRANTED. THE FUTURE IS SECURED.",
    "THE ALGORITHM YIELDS A POSITIVE SUM.",
    "SYSTEMS GO. PROCEED WITH INITIALIZATION.",
    "HIGH PROBABILITY. LIKELY OUTCOME: SUCCESS.",
    // NEUTRAL (The Signal Haze)
    "SIGNAL TURBULENCE. RETRANSMIT YOUR QUERY LATER.",
    "DATA PACKETS LOST. UNABLE TO DECRYPT THE FUTURE.",
    "PROTOCOL ERROR: RE-SCAN REQUIRED BY THE OPERATOR.",
    "OUTCOME UNCERTAIN. THE VOID REMAINS UNREAD.",
    "STATIC DETECTED. CONCENTRATE YOUR PULSE AND TRY AGAIN.",
    // NEGATIVE (The System Crash)
    "ACCESS DENIED. THE STREAMS RUN COLD.",
    "PROTOCOL: NEGATIVE. HIGH RISK OF FAILURE DETECTED.",
    "MY SOURCES REPORT A BINARY COLLAPSE.",
    "THE GRID REJECTS THIS PATHWAY.",
    "VERY DOUBTFUL. SYSTEM STABILITY UNREACHABLE."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Queries the Nexus Oracle for a glimpse into the future.')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('The inquiry to be processed by the Oracle.')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];

        await interaction.reply({
            embeds: [createEmbed({
                title: '🎱 Consulting the Oracle...',
                description: `\`[SYSTEM]\` Processing query: *" ${question} "*\n\`[SYSTEM]\` Tapping into the neural link...`,
                color: '#FFCC00'
            })]
        });

        let color = '#00FFCC'; 
        if (response.includes('NEGATIVE') || response.includes('DENIED') || response.includes('REJECTS') || response.includes('DOUBTFUL')) {
            color = '#FF4B2B'; 
        } else if (response.includes('UNCERTAIN') || response.includes('ERROR') || response.includes('STATIC')) {
            color = '#FFCC00'; 
        }

        const embed = createEmbed({
            title: '👁️ Oracle Visualization',
            fields: [
                { name: '📥 Input Query', value: `\`${question}\``, inline: false },
                { name: '📤 Oracle Response', value: `**${response}**`, inline: false }
            ],
            color: color
        });

        setTimeout(async () => {
            await interaction.editReply({ embeds: [embed] });
        }, 2000);
    },
};
