const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

pngToIco(path.join(__dirname, 'logo.png'))
    .then(buf => {
        fs.writeFileSync(path.join(__dirname, 'logo.ico'), buf);
        console.log('Successfully created logo.ico');
    })
    .catch(err => {
        console.error('Error creating ico:', err);
    });
