const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // API endpoints
  if (pathname.startsWith('/api/')) {
    handleAPI(req, res, pathname, query);
    return;
  }

  // Default to index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const safePath = path.join(__dirname, pathname);
  const ext = path.extname(safePath).toLowerCase();
  const mimeType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(safePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested file was not found.</p>');
      } else {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1><p>Something went wrong.</p>');
      }
    } else {
      // File found, serve it
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(data);
    }
  });
});

function handleAPI(req, res, pathname, query) {
  if (pathname === '/api/books') {
    // Get list of books from DB-Lagu folder
    const dbLaguPath = path.join(__dirname, 'DB-Lagu');
    
    if (!fs.existsSync(dbLaguPath)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
      return;
    }

    try {
      const books = [];
      const folders = fs.readdirSync(dbLaguPath);
      
      folders.forEach(folder => {
        const folderPath = path.join(dbLaguPath, folder);
        if (fs.statSync(folderPath).isDirectory()) {
          const files = fs.readdirSync(folderPath);
          const songCount = files.filter(file => file.endsWith('.txt')).length;
          
          books.push({
            name: folder,
            path: `DB-Lagu/${folder}`,
            icon: 'fa-book',
            count: songCount
          });
        }
      });

      books.sort((a, b) => a.name.localeCompare(b.name));
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(books));
    } catch (error) {
      console.error('Error reading books:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read books' }));
    }
    
  } else if (pathname === '/api/songs') {
    // Get list of songs from a specific book
    const bookPath = query.book;
    if (!bookPath) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Book path is required' }));
      return;
    }

    const fullBookPath = path.join(__dirname, bookPath);
    
    if (!fs.existsSync(fullBookPath)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
      return;
    }

    try {
      const songs = [];
      const files = fs.readdirSync(fullBookPath);
      
      files.forEach(file => {
        if (file.endsWith('.txt')) {
          // Parse filename untuk format "PREFIX No XXX - Judul.txt"
          const match = file.match(/^(.+?)\s+No\s+(\d+)\s*-\s*(.+)\.txt$/);
          if (match) {
            const [, prefix, number, title] = match;
            songs.push({
              number: `${prefix} No ${number}`,
              title: title,
              filename: file
            });
          }
        }
      });

      // Sort by number
      songs.sort((a, b) => {
        const numA = parseInt(a.number.match(/No (\d+)/)[1]);
        const numB = parseInt(b.number.match(/No (\d+)/)[1]);
        return numA - numB;
      });
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } catch (error) {
      console.error('Error reading songs:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read songs' }));
    }
    
  } else if (pathname === '/api/song-content') {
    // Get content of a specific song
    const filename = query.file;
    if (!filename) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Filename is required' }));
      return;
    }

    // Find the file in DB-Lagu folders
    const dbLaguPath = path.join(__dirname, 'DB-Lagu');
    let filePath = null;

    if (fs.existsSync(dbLaguPath)) {
      const folders = fs.readdirSync(dbLaguPath);
      for (const folder of folders) {
        const folderPath = path.join(dbLaguPath, folder);
        if (fs.statSync(folderPath).isDirectory()) {
          const testPath = path.join(folderPath, filename);
          if (fs.existsSync(testPath)) {
            filePath = testPath;
            break;
          }
        }
      }
    }

    if (!filePath) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Song file not found' }));
      return;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(content);
    } catch (error) {
      console.error('Error reading song content:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read song content' }));
    }
    
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
  }
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Open your browser and navigate to http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
