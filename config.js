// Hixs Shares Configuration

// Web App URL Configuration
// If you host the web version online, update this URL
// Users will be able to scan QR codes or click share links to join from browsers

const CONFIG = {
    // Replace this with your actual hosted web app URL
    // Examples:
    // - 'https://hixshares.netlify.app/'
    // - 'https://yourdomain.com/hixshares/'
    // - 'https://hixshares.github.io/'

    WEB_APP_URL: 'https://hixshares.pgboyahpgr.workers.dev/', // Default placeholder

    // Alternative: Use a free hosting service
    // You can deploy index.html to:
    // - GitHub Pages (free)
    // - Netlify (free)
    // - Vercel (free)
    // - Cloudflare Pages (free)
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.HIXSHARES_CONFIG = CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
