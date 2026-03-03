class SongReaderApp {
    constructor() {
        this.currentView = 'books';
        this.currentBook = null;
        this.books = [];
        this.songs = [];
        this.init();
    }

    async init() {
        this.showLoading(true);
        await this.loadBooks();
        this.setupEventListeners();
        this.showLoading(false);
        this.showView('books');
    }

    showView(view) {
        const books = document.getElementById('booksContainer');
        const songs = document.getElementById('songsContainer');
        const content = document.getElementById('songContent');

        // Semua disembunyikan dulu dengan display none
        books.style.display = 'none';
        songs.style.display = 'none';
        content.style.display = 'none';

        // Tampilkan yang dipilih
        if (view === 'books') books.style.display = 'block';
        if (view === 'songs') songs.style.display = 'block';
        if (view === 'song') content.style.display = 'block';

        this.currentView = view;
    }

    setupEventListeners() {
        document.getElementById('backButton').addEventListener('click', () => {
            if (this.currentView === 'song') {
                // Kembali ke daftar lagu, update breadcrumb ke nama buku
                const bookName = this.currentBook ? this.currentBook.split('/').pop() : 'Buku';
                this.updateBreadcrumb(['Beranda', bookName]);
                this.showView('songs');
            } else {
                // Kembali ke daftar buku, reset breadcrumb
                this.updateBreadcrumb(['Beranda']);
                this.showView('books');
            }
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.filterContent(query);
            });
        }
    }

    filterContent(query) {
        if (this.currentView === 'books') {
            this.filterBooks(query);
        } else if (this.currentView === 'songs') {
            this.filterSongs(query);
        }
    }

    filterBooks(query) {
        const filteredBooks = this.books.filter(book => 
            book.name.toLowerCase().includes(query)
        );
        this.renderBooks(filteredBooks);
    }

    filterSongs(query) {
        if (!query.trim()) {
            this.renderSongs(this.songs);
            return;
        }
        
        const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
        
        const filteredSongs = this.songs.filter(song => {
            const songTitle = song.title.toLowerCase();
            const songNumber = song.number.toLowerCase();
            const combinedText = `${song.number} ${song.title}`.toLowerCase();
            
            // Check if all search terms match either title, number, or combined
            return searchTerms.every(term => 
                songTitle.includes(term) || 
                songNumber.includes(term) ||
                combinedText.includes(term)
            );
        });
        
        this.renderSongs(filteredSongs);
    }

    async loadBooks() {
        try {
            this.books = await this.getBooksFromDirectory();
            this.renderBooks(this.books);
        } catch (error) {
            console.error('Error loading books:', error);
            this.showError('Gagal memuat buku lagu');
        }
    }

    async getBooksFromDirectory() {
        try {
            return await this.loadBooksFromServer();
        } catch (error) {
            return [
                { name: 'Kidung Jemaat', path: 'DB-Lagu/Kidung Jemaat', count: 0 },
                { name: 'Pelengkap Kidung Jemaat', path: 'DB-Lagu/Pelengkap Kidung Jemaat', count: 0 }
            ];
        }
    }

    async loadBooksFromServer() {
        const response = await fetch('/api/books');
        if (!response.ok) {
            throw new Error('Failed to fetch books from server');
        }
        return await response.json();
    }

    async loadSongs(bookPath) {
        try {
            this.showLoading(true);
            this.currentBook = bookPath;
            this.songs = await this.getSongsFromDirectory(bookPath);
            this.renderSongs(this.songs);
            
            // Extract book name from path for breadcrumb
            const bookName = bookPath.split('/').pop();
            this.updateBreadcrumb(['Beranda', bookName]);
            
            this.showView('songs');
        } catch (error) {
            console.error('Error loading songs:', error);
            this.showError('Gagal memuat lagu');
        } finally {
            this.showLoading(false);
        }
    }

    async getSongsFromDirectory(bookPath) {
        try {
            return await this.loadSongsFromServer(bookPath);
        } catch (error) {
            return [];
        }
    }

    async loadSongsFromServer(bookPath) {
        const response = await fetch(`/api/songs?book=${encodeURIComponent(bookPath)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch songs from server');
        }
        return await response.json();
    }

    async loadSongContent(song) {
        try {
            this.showLoading(true);
            const content = await this.getSongContent(song.filename);
            this.showSongContent(song, content);
        } catch (error) {
            console.error('Error loading song content:', error);
            this.showError('Gagal memuat konten lagu');
        } finally {
            this.showLoading(false);
        }
    }

    async getSongContent(filename) {
        const response = await fetch(`/api/song-content?file=${encodeURIComponent(filename)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch song content from server');
        }
        return await response.text();
    }

    parseSongContent(content) {
        const lines = content.split('\n');
        const parsedContent = [];
        
        lines.forEach(line => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('*')) {
                const label = trimmedLine.substring(1);
                parsedContent.push({
                    type: 'label',
                    content: label
                });
            } else if (trimmedLine) {
                parsedContent.push({
                    type: 'lyrics',
                    content: trimmedLine
                });
            } else {
                parsedContent.push({
                    type: 'empty',
                    content: ''
                });
            }
        });
        
        return parsedContent;
    }

    renderBooks(books) {
        const container = document.getElementById('booksContainer');
        container.innerHTML = '';

        books.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card bg-gray-800 rounded-lg p-6 cursor-pointer fade-in';
            bookCard.style.animationDelay = `${index * 0.1}s`;
            
            bookCard.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-book text-4xl text-green-500 mb-4 icon-animation"></i>
                    <h3 class="text-xl font-bold text-white mb-2">${book.name}</h3>
                    <p class="text-gray-400 text-sm mb-4">${book.count || 0} lagu</p>
                    <button class="btn-primary w-full">
                        <i class="fas fa-book-open mr-2"></i>Buka Buku
                    </button>
                </div>
            `;

            bookCard.addEventListener('click', () => {
                this.loadSongs(book.path);
            });

            container.appendChild(bookCard);
        });
    }

    renderSongs(songs) {
        const container = document.getElementById('songsContainer');
        container.innerHTML = '';

        songs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song-list-item fade-in';
            songItem.style.animationDelay = `${index * 0.05}s`;
            
            songItem.innerHTML = `
                <div class="song-number">${song.number}</div>
                <div class="song-title">${song.title}</div>
                <div class="song-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            `;

            songItem.addEventListener('click', () => {
                this.loadSongContent(song);
            });

            container.appendChild(songItem);
        });
    }

    showSongContent(song, content) {
        const songTitle = document.getElementById('songTitle');
        const songLyrics = document.getElementById('songLyrics');

        songTitle.textContent = `${song.number}. ${song.title}`;
        
        const parsedContent = this.parseSongContent(content);
        
        songLyrics.innerHTML = parsedContent.map(item => {
            if (item.type === 'label') {
                return `<div class="song-label font-bold text-green-500 mt-4 mb-2 text-lg">${item.content}</div>`;
            } else if (item.type === 'lyrics') {
                return `<div class="song-lyrics text-gray-300 leading-relaxed mb-1">${item.content}</div>`;
            } else {
                return `<div class="song-empty h-2"></div>`;
            }
        }).join('');

        this.showView('song');
        
        // Extract book name from path for breadcrumb
        const bookName = this.currentBook ? this.currentBook.split('/').pop() : 'Buku';
        this.updateBreadcrumb(['Beranda', bookName, song.title]);
    }

    updateBreadcrumb(path) {
        const breadcrumb = document.getElementById('breadcrumb');
        breadcrumb.innerHTML = path.map((item, index) => {
            if (index === path.length - 1) {
                // Last item - current page (not clickable)
                return `<span class="text-white font-semibold">${item}</span>`;
            } else if (index === 0) {
                // First item - Beranda (go to books)
                return `<span class="breadcrumb-item cursor-pointer hover:text-green-400" onclick="app.showView('books')">${item}</span> <span class="text-gray-500 mx-2">/</span> `;
            } else if (index === 1 && path.length === 3) {
                // Middle item - Book name (go to songs)
                return `<span class="breadcrumb-item cursor-pointer hover:text-green-400" onclick="app.showView('songs')">${item}</span> <span class="text-gray-500 mx-2">/</span> `;
            } else {
                // Other items
                return `<span class="breadcrumb-item cursor-pointer hover:text-green-400" onclick="app.showView('songs')">${item}</span> <span class="text-gray-500 mx-2">/</span> `;
            }
        }).join('');
    }

    showLoading(show) {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (show) {
            loadingIndicator.classList.remove('hidden');
        } else {
            loadingIndicator.classList.add('hidden');
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new SongReaderApp();
});

class FileSystemHandler {
    static async loadBooksFromDirectory() {
        try {
            if ('showDirectoryPicker' in window) {
                const dirHandle = await window.showDirectoryPicker();
                const books = [];
                
                for await (const [name, handle] of dirHandle.entries()) {
                    if (handle.kind === 'directory') {
                        const songCount = await this.countSongsInDirectory(handle);
                        books.push({
                            name: name,
                            path: name,
                            icon: 'fa-book',
                            count: songCount
                        });
                    }
                }
                
                return books;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error accessing directory:', error);
            return [];
        }
    }

    static async countSongsInDirectory(dirHandle) {
        let count = 0;
        try {
            for await (const [name, handle] of dirHandle.entries()) {
                if (handle.kind === 'file' && name.endsWith('.txt')) {
                    count++;
                }
            }
        } catch (error) {
            console.error('Error counting songs:', error);
        }
        return count;
    }

    static async loadSongsFromDirectory(bookPath) {
        try {
            if ('showDirectoryPicker' in window) {
                const dirHandle = await window.showDirectoryPicker();
                const bookHandle = await dirHandle.getDirectoryHandle(bookPath);
                const songs = [];
                
                for await (const [name, handle] of bookHandle.entries()) {
                    if (handle.kind === 'file' && name.endsWith('.txt')) {
                        const file = await handle.getFile();
                        const content = await file.text();
                        
                        const match = name.match(/^(\d+)\s*-\s*(.+)\.txt$/);
                        if (match) {
                            songs.push({
                                number: match[1],
                                title: match[2],
                                filename: name,
                                content: content
                            });
                        }
                    }
                }
                
                return songs.sort((a, b) => parseInt(a.number) - parseInt(b.number));
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error loading songs:', error);
            return [];
        }
    }
}
