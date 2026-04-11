const { EmbedBuilder } = require('discord.js');

/**
 * NEXUS PROTOCOL v8.5 — SINGULARITY EMBED ARCHITECTURE
 * Standardizes high-fidelity responses with consistent technical branding.
 */
module.exports = (options) => {
    // Standard Singularity Palette
    const THEME = {
        PRIMARY: '#00F5FF',    // Cyan Glow
        SECONDARY: '#7000FF',  // Purple Pulse
        NEUTRAL: '#FFFFFF',    // Pure Signal
        CRITICAL: '#FF4444',   // Alert Vector
        SUCCESS: '#00FF88'     // Stable Node
    };

    const embed = new EmbedBuilder()
        .setColor(options.color || THEME.PRIMARY)
        .setTimestamp();

    const trim = (str, max) => str && str.length > max ? str.slice(0, max - 3) + '...' : str;

    // High-Fidelity Title
    if (options.title) {
        embed.setTitle(trim(options.title, 256));
    }

    // Technical Description
    if (options.description) {
        embed.setDescription(trim(options.description, 4096));
    }

    if (options.url) embed.setURL(options.url);

    // Dynamic Fields
    if (options.fields && options.fields.length > 0) {
        const safeFields = options.fields.slice(0, 25).map(f => ({
            name: trim(f.name, 256),
            value: trim(f.value, 1024),
            inline: !!f.inline
        }));
        embed.addFields(safeFields);
    }

    if (options.thumbnail) embed.setThumbnail(options.thumbnail);
    if (options.image) embed.setImage(options.image);

    if (options.author) {
        embed.setAuthor({
            name: trim(options.author, 256),
            iconURL: options.authorIcon || undefined
        });
    }

    // Technical Signature (v8.5 Standard)
    const versionTag = 'NEXUS PROTOCOL v8.5.0';
    const sectorTag = options.sector || 'SECTOR_BRAVO';
    const footerText = trim(options.footer || `${versionTag} // ${sectorTag} // SIGNAL_STABLE`, 2048);

    embed.setFooter({
        text: footerText,
        iconURL: 'https://cdn.discordapp.com/emojis/1210452340753101031.png' // Placeholder for bot icon if desired
    });

    return embed;
};
