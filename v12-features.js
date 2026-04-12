/**
 * NEXUS PROTOCOL - V12 GLOBAL FEATURES
 * Injected automatically into all HTML portals.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mount Live Status HUD
    const hud = document.createElement('div');
    hud.id = 'nexus-status-hud';
    hud.innerHTML = `
        <div class="status-dot"></div>
        <span>ALL SYSTEMS NOMINAL</span>
    `;
    document.body.appendChild(hud);

    // Dynamic HUD Ping Simulation (Update every 10-20s)
    setInterval(() => {
        const fakePing = Math.floor(Math.random() * 20) + 12;
        const span = hud.querySelector('span');
        span.innerText = `PING: ${fakePing}MS \u2014 v12.0.0`;
        setTimeout(() => { span.innerText = 'ALL SYSTEMS NOMINAL'; }, 4000);
    }, 15000);

    // 2. Mount Back-To-Top Accelerator
    const btt = document.createElement('button');
    btt.id = 'nexus-back-top';
    btt.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btt.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btt);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btt.classList.add('visible');
        } else {
            btt.classList.remove('visible');
        }
    });

    btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Mount Custom Context Menu
    const contextMenu = document.createElement('div');
    contextMenu.id = 'nexus-context-menu';
    contextMenu.innerHTML = `
        <a href="index.html" class="context-item"><i class="fas fa-home"></i> Return to Nexus</a>
        <a href="commands.html" class="context-item"><i class="fas fa-terminal"></i> Command Index</a>
        <div class="context-divider"></div>
        <a href="https://discord.com/invite/DYXBEd2G8M" target="_blank" class="context-item"><i class="fab fa-discord"></i> Priority Support</a>
    `;
    document.body.appendChild(contextMenu);

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        const x = e.clientX;
        const y = e.clientY;
        
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.classList.add('active');
    });

    document.addEventListener('click', () => {
        if (contextMenu.classList.contains('active')) {
            contextMenu.classList.remove('active');
        }
    });
    
    // Check if FontAwesome is loaded, if not inject it
    if (!document.querySelector('link[href*="fontawesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }
});
