const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Add to top navigation links
    if (!content.includes('<a href="faq.html"')) {
        // If it's already got it, skip. But what if one is active and one isn't?
        // Let's just do a simple replacement if it doesn't exist
        const target = '<a href="wiki.html">Wiki</a>';
        if (content.includes(target) && !content.includes('faq.html">FAQ</a>')) {
            content = content.replace(target, target + '\n                <a href="faq.html">FAQ</a>');
        }
        
        // Let's also handle the footer links
        const footerTarget = '<a href="wiki.html">Wiki</a>';
        // Replacing globally is safe if there's multiple
        content = content.split(target).join(target + '\n                    <a href="faq.html">FAQ</a>');
        
        // Wait, the split/join above might double-insert if there are 2 wiki.html links (one in nav, one in footer). Let's fix indentation later.
        // Actually, just doing split/join on wiki.html is perfect.
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log('Fixed:', file);
});
