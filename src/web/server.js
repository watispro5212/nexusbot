const express = require('express');
const path = require('path');
const logger = require('../utils/logger');

module.exports = (manager) => {
    const app = express();
    const port = process.env.PORT || 3000;

    // Static site delivery (serving the 7 pages)
    app.use(express.static(path.join(__dirname, '../../')));

    // Simple route handling for the 7 pages
    const pages = ['/', '/commands', '/invite', '/faq', '/wiki', '/terms', '/privacy'];
    
    pages.forEach(route => {
        app.get(route, (req, res) => {
            const fileName = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
            res.sendFile(path.join(__dirname, '../../', fileName));
        });
    });

    app.listen(port, () => {
        logger.info(`Artisanal Portal online on port ${port}`);
    });
};
