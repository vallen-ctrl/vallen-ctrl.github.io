
        // VARIABEL 
        let isPlaying = false; // Status apakah musik sedang diputar
        let currentTime = 174; // Waktu saat ini dalam detik (02:54)
        const totalDuration = 332; // Total durasi musik dalam detik (05:32)
        let progressInterval; // Variable untuk menyimpan interval timer

        // AMBIL ELEMEN 
        const playBtn = document.getElementById('playBtn'); // Tombol play/pause
        const playIcon = document.getElementById('playIcon'); // Icon play
        const pauseIcon = document.getElementById('pauseIcon'); // Icon pause
        const progressFill = document.getElementById('progressFill'); // Bar progress kuning
        const progressBar = document.getElementById('progressBar'); // Container progress bar
        const currentTimeEl = document.getElementById('currentTime'); // Teks waktu saat ini
        const heartBtn = document.getElementById('heartBtn'); // Tombol like
        const volumeBtn = document.getElementById('volumeBtn'); // Tombol volume

        // FUNGSI HELPER
        
        // Fungsi untuk format detik menjadi MM:SS
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

        // Fungsi untuk update tampilan progress bar
        function updateProgress() {
            const percentage = (currentTime / totalDuration) * 100;
            progressFill.style.width = percentage + '%';
            currentTimeEl.textContent = formatTime(currentTime);
        }


        // EVENT LISTENER - PLAY/PAUSE
        
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying; // Toggle status playing
            
            if (isPlaying) {
                // Saat play diklik
                playIcon.style.display = 'none'; // Sembunyikan icon play
                pauseIcon.style.display = 'block'; // Tampilkan icon pause
                
                // Mulai progress (update setiap 0.1 detik)
                progressInterval = setInterval(() => {
                    if (currentTime < totalDuration) {
                        currentTime += 0.1; // Tambah waktu
                        updateProgress(); // Update tampilan
                    } else {
                        // Musik selesai
                        isPlaying = false;
                        playIcon.style.display = 'block';
                        pauseIcon.style.display = 'none';
                        clearInterval(progressInterval); // Stop interval
                    }
                }, 100);
            } else {
                // Saat pause diklik
                playIcon.style.display = 'block'; // Tampilkan icon play
                pauseIcon.style.display = 'none'; // Sembunyikan icon pause
                clearInterval(progressInterval); // Stop interval
            }
        });


        // EVENT LISTENER - PROGRESS BAR CLICK
        
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            currentTime = pos * totalDuration;
            updateProgress();
        });


        // EVENT LISTENER - HEART BUTTON
        
        heartBtn.addEventListener('click', () => {
            heartBtn.classList.toggle('active'); // Toggle class active
        });

        
        // EVENT LISTENER - VOLUME BUTTON
        
        volumeBtn.addEventListener('click', () => {
            volumeBtn.classList.toggle('muted'); // Toggle class muted
        });

        
        // DRAG FUNCTIONALITY - VARIABEL
        
        let isDragging = false; // Status apakah sedang drag


        // DRAG FUNCTIONALITY - FUNGSI UPDATE
        
        // Fungsi untuk update progress berdasarkan posisi mouse
        function updateProgressFromEvent(e) {
            const rect = progressBar.getBoundingClientRect();
            let pos = (e.clientX - rect.left) / rect.width;
            
            // Batasi posisi antara 0 dan 1 (0% - 100%)
            pos = Math.max(0, Math.min(1, pos));
            
            // Update waktu current berdasarkan posisi
            currentTime = pos * totalDuration;
            
            // Update tampilan progress bar
            updateProgress();
        }

    
        // DRAG FUNCTIONALITY - EVENT LISTENERS
        
        // Event saat mouse ditekan pada progress bar (mulai drag)
        progressBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            progressBar.classList.add('dragging'); // Tambah class untuk visual feedback
            updateProgressFromEvent(e);
        });

        // Event saat mouse bergerak (sedang drag)
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateProgressFromEvent(e);
            }
        });

        // Event saat mouse dilepas (selesai drag)
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                progressBar.classList.remove('dragging'); // Hapus class dragging
            }
        });

        // INISIALISASI
        
        // Set tampilan awal progress bar
        updateProgress();