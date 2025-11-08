document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-input');
  const songItems = document.querySelectorAll('.song-item');
  const topResultCard = document.querySelector('.top-result-card');
  const topResultTitle = topResultCard.querySelector('h2');
  const topResultArtist = topResultCard.querySelector('strong');
  const topResultImage = topResultCard.querySelector('.top-result-image');

  // Function untuk filter lagu
  function filterSongs(query) {
    const lowerQuery = query.toLowerCase();
    let firstMatch = null;

    songItems.forEach(item => {
      const title = item.querySelector('.song-title').textContent.toLowerCase();
      const artist = item.querySelector('.song-artist').textContent.toLowerCase();
      const matches = title.includes(lowerQuery) || artist.includes(lowerQuery);

      if (matches) {
        item.style.display = 'flex';
        if (!firstMatch) {
          firstMatch = item;
        }
      } else {
        item.style.display = 'none';
      }
    });

    // Update result yang mendekati
    if (firstMatch && query.trim() !== '') {
      const title = firstMatch.querySelector('.song-title').textContent;
      const artist = firstMatch.querySelector('.song-artist').textContent;
      const imageSrc = firstMatch.querySelector('.song-image').src;

      topResultTitle.textContent = title;
      topResultArtist.textContent = artist;
      topResultImage.src = imageSrc;
      topResultImage.alt = `${title} Album Artwork`;
    } else {
      // jika tidak ada hasil, reset ke default
      topResultTitle.textContent = 'About You';
      topResultArtist.textContent = 'The 1975';
      topResultImage.src = 'https://i.scdn.co/image/ab67616d00001e0279514a3e36306a235e4520b9';
      topResultImage.alt = 'About You Album Artwork';
    }
  }

  // Event listener untuk input pencarian
  searchInput.addEventListener('input', function() {
    filterSongs(this.value);
  });

  // Event listener untuk menandai lagu yang sedang diputar
  songItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove from all
      songItems.forEach(i => i.classList.remove('playing'));
      // Add to clicked
      this.classList.add('playing');
    });
  });
});
