const http = require('http');
const fs = require('fs');
const path = require('path');

// Port, auf dem der Server läuft
const port = 3000;

// Erstelle den Server
const server = http.createServer((req, res) => {
    // Pfad zur angeforderten Datei
    let filePath = path.join(__dirname, req.url);

    // Füge 'index.html' hinzu, wenn kein Dateiname angegeben ist
    if (req.url === '/') {
        filePath = path.join(filePath, 'index.html');
    }

    // Ermittelt den Dateityp
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml',
    };

    // Standard Content-Type ist 'application/octet-stream'
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Lese die Datei
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Datei nicht gefunden
                fs.readFile(path.join(__dirname, '404.html'), (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Andere Fehler
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Datei gefunden, sende sie zurück
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data, 'utf-8');
        }
    });
});

// Starte den Server
server.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
