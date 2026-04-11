const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const embedBuilder = require('../../utils/embedBuilder');

const triviaQuestions = [
    { question: 'What does CPU stand for?', answers: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correct: 0 },
    { question: 'What year was Discord founded?', answers: ['2013', '2014', '2015', '2016'], correct: 2 },
    { question: 'What does HTML stand for?', answers: ['Hyper Trainer Marking Language', 'HyperText Markup Language', 'HyperText Marketing Language', 'Hyper Tool Markup Language'], correct: 1 },
    { question: 'Which planet is known as the Red Planet?', answers: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correct: 2 },
    { question: 'What is the largest ocean on Earth?', answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3 },
    { question: 'What does RAM stand for?', answers: ['Read Access Memory', 'Random Access Memory', 'Run Application Memory', 'Real Active Memory'], correct: 1 },
    { question: 'How many bits are in a byte?', answers: ['4', '8', '16', '32'], correct: 1 },
    { question: 'What programming language is Discord.js written in?', answers: ['Python', 'Java', 'JavaScript', 'TypeScript'], correct: 2 },
    { question: 'What does API stand for?', answers: ['Application Protocol Interface', 'Application Programming Interface', 'Automated Protocol Integration', 'Application Process Integration'], correct: 1 },
    { question: 'Who created Node.js?', answers: ['Brendan Eich', 'Guido van Rossum', 'Ryan Dahl', 'James Gosling'], correct: 2 },
    { question: 'What port does HTTPS use by default?', answers: ['80', '443', '8080', '3000'], correct: 1 },
    { question: 'What does JSON stand for?', answers: ['JavaScript Object Notation', 'JavaScript Online Notation', 'Java Standard Object Notation', 'JavaScript Oriented Networks'], correct: 0 },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Answer a random trivia question!'),
    cooldown: 10,
    async execute(interaction) {
        const q = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        const labels = ['A', 'B', 'C', 'D'];

        const buttons = new ActionRowBuilder().addComponents(
            q.answers.map((ans, i) => new ButtonBuilder()
                .setCustomId(`trivia_${i}`)
                .setLabel(`${labels[i]}: ${ans}`)
                .setStyle(ButtonStyle.Secondary)
            )
        );

        const embed = embedBuilder({
            title: '🧠 Trivia Time!',
            description: `**${q.question}**\n\nYou have **15 seconds** to answer!`,
            color: '#7B2FFF'
        });

        await interaction.reply({ embeds: [embed], components: [buttons] });

        const collector = (await interaction.fetchReply()).createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 15000,
            max: 1
        });

        collector.on('collect', async i => {
            const selected = parseInt(i.customId.split('_')[1]);
            const isCorrect = selected === q.correct;

            const resultEmbed = embedBuilder({
                title: isCorrect ? '✅ Correct!' : '❌ Wrong!',
                description: isCorrect
                    ? `Great job! **${q.answers[q.correct]}** is correct!`
                    : `The correct answer was **${q.answers[q.correct]}**.`,
                color: isCorrect ? '#00FF88' : '#FF4444'
            });

            const disabledBtns = new ActionRowBuilder().addComponents(
                q.answers.map((ans, idx) => new ButtonBuilder()
                    .setCustomId(`trivia_done_${idx}`)
                    .setLabel(`${labels[idx]}: ${ans}`)
                    .setStyle(idx === q.correct ? ButtonStyle.Success : (idx === selected && !isCorrect ? ButtonStyle.Danger : ButtonStyle.Secondary))
                    .setDisabled(true)
                )
            );

            await i.update({ embeds: [resultEmbed], components: [disabledBtns] });
        });

        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                const timeoutEmbed = embedBuilder({
                    title: '⏰ Time\'s Up!',
                    description: `The correct answer was **${q.answers[q.correct]}**.`,
                    color: '#F1C40F'
                });

                const disabledBtns = new ActionRowBuilder().addComponents(
                    q.answers.map((ans, idx) => new ButtonBuilder()
                        .setCustomId(`trivia_timeout_${idx}`)
                        .setLabel(`${labels[idx]}: ${ans}`)
                        .setStyle(idx === q.correct ? ButtonStyle.Success : ButtonStyle.Secondary)
                        .setDisabled(true)
                    )
                );

                await interaction.editReply({ embeds: [timeoutEmbed], components: [disabledBtns] }).catch(() => {});
            }
        });
    }
};
