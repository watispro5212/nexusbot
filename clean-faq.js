const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Delete all lines containing 'faq.html">FAQ</a>' or 'faq.html" class="active">FAQ</a>'
    // This is safer than the broad regex
    content = content.split('\n').filter(line => !line.includes('href="faq.html"')).join('\n');
    
    const parts = content.split('<a href="wiki.html">Wiki</a>');
    
    if (parts.length === 3) { // 2 wiki links
        content = parts[0] + '<a href="wiki.html">Wiki</a>\n                <a href="faq.html">FAQ</a>' + 
                  parts[1] + '<a href="wiki.html">Wiki</a>\n                    <a href="faq.html">FAQ</a>' + 
                  parts[2];
    } else if (parts.length === 2) { // 1 wiki link
        content = parts[0] + '<a href="wiki.html">Wiki</a>\n                <a href="faq.html">FAQ</a>' + parts[1];
    }
    
    // Restore the active class if we're in faq.html
    if (file === 'faq.html') {
        content = content.replace('<a href="faq.html">FAQ</a>', '<a href="faq.html" class="active">FAQ</a>');
    }
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Cleaned and fixed:', file);
});
