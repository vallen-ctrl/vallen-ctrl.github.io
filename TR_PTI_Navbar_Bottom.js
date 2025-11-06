

const BASEURL = "https://musichost.myhomedrivekolens.my.id"
const auth = () =>{
    return `&u=truenas_admin&t=54d3946c3ac11114d649e9b6789182e8&s=abc&v=1.16.1&c=Postman&f=json`
}
const getlist = (search="", songCount=10, songOffset=0) => {
    return BASEURL + `/rest/search3?query=${search}&songCount=${songCount}&songOffset=${songOffset}${auth()}`
} 
const getThumbnailURL = (id)=>{
    if (!id) return console.error("please see your id music")
    return `${BASEURL}/rest/getCoverArt?id=${id}&size=300${auth()}`
}

const getLiveSongURL = (id) =>{
    if (!id) return console.error("please see your id music")
    return`${BASEURL}/rest/stream?id=${id}${auth()}`
}

const musicContainer = document.getElementById("music-container");

// VARIABEL 
let isPlaying = false; // Status apakah musik sedang diputar
let currentTime = 0; // Waktu saat ini dalam detik (02:54)
let totalDuration = 0; // Total durasi musik dalam detik (05:32)
let progressInterval; // Variable untuk menyimpan interval timer
let idBefore;

// AMBIL ELEMEN 
const playBtn = document.getElementById('playBtn'); // Tombol play/pause
const playIcon = document.getElementById('playIcon'); // Icon play
const pauseIcon = document.getElementById('pauseIcon'); // Icon pause
const progressFill = document.getElementById('progressFill'); // Bar progress kuning
const progressBar = document.getElementById('progressBar'); // Container progress bar
const currentTimeEl = document.getElementById('currentTime'); // Teks waktu saat ini
const heartBtn = document.getElementById('heartBtn'); // Tombol like
const volumeBtn = document.getElementById('volumeBtn'); // Tombol volume
const totalDurationelement = document.getElementById("duration")
const audioControl = document.getElementById("audioplayer");
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

async function getMusicListAndSearch(search=""){
    const songlist = await fetch(getlist(search))
    const hasil = await songlist.json()
    return hasil
}

async function appendToMusic() {
    try{
        const songlist = await getMusicListAndSearch();

        const songs = songlist['subsonic-response'].searchResult3?.song || [];
        songs.forEach(element => {
            
            musicContainer.appendChild(musicsongs(element.title, element.artist, element.id, getThumbnailURL(element.id)))
        });
    }catch{
        alert("EROR WHEN GET DATA TO SERVER PLEASE SEE YOUR CONNECTION")
    }
}

appendToMusic()




// EVENT LISTENER - PLAY/PAUSE

audioControl.addEventListener("timeupdate", ()=>{
    totalDuration = audioControl.duration
    currentTime = audioControl.currentTime || 0
    totalDurationelement.textContent = formatTime(totalDuration)
    updateProgress();
})


async function playpausebtn(id){
    
    isPlaying = !isPlaying; // Toggle status playing
    console.log(`BEFORE: ${idBefore}`)

    if(idBefore != id && idBefore && id != 0){
        console.log("masuk")
        currentTime = 0;
        updateProgress();
        document.getElementById(idBefore).checked = false;
        document.getElementById(idBefore).removeAttribute("checked")
        isPlaying = true;
    }

    if(id != 0){
        idBefore = id
    }
    
   console.log(`AFTER: ${idBefore}`)
   const idnow = id == 0 ? idBefore : id
    if (isPlaying){


        audioControl.src = getLiveSongURL(idnow);
        playIcon.style.display = 'none'; // Sembunyikan icon play
        pauseIcon.style.display = 'block'; // Tampilkan icon pause
        document.getElementById(idnow).setAttribute("checked", "checked")
        document.getElementById(idnow).checked = true;
        if(currentTime > 0){
            audioControl.currentTime = currentTime
            audioControl.play()
        }else{
            audioControl.play();
        }
    // ================ INI BAGIAN UPDATE ======================
        // progressInterval = setInterval(() => {
        //             if (currentTime < totalDuration) {
        //                 currentTime += 0.1; // Tambah waktu
        //                 updateProgress(); // Update tampilan
        //             } else {
        //                 // Musik selesai
        //                 isPlaying = false;
        //                 playIcon.style.display = 'block';
        //                 pauseIcon.style.display = 'none';
        //                 clearInterval(progressInterval); // Stop interval
        //             }
        //         }, 100);
            // ================ INI BAGIAN UPDATE ======================
    } else {
        // Saat pause diklik
        audioControl.pause()
        playIcon.style.display = 'block'; // Tampilkan icon play
        pauseIcon.style.display = 'none'; // Sembunyikan icon pause
        clearInterval(progressInterval);
        document.getElementById(idnow).checked = false;
        document.getElementById(idnow).removeAttribute("checked")
    }
}

// playBtn.addEventListener('click', () => {
//     isPlaying = !isPlaying; // Toggle status playing
    
//     if (isPlaying){
//         // Saat play diklik
//         playIcon.style.display = 'none'; // Sembunyikan icon play
//         pauseIcon.style.display = 'block'; // Tampilkan icon pause
//         document.getElementById("ashkbasllkavsd").setAttribute("checked", "checked")
        
//     // ================ INI BAGIAN UPDATE ======================
//     // if (currentTime < totalDuration) {
//         //     currentTime += 1; // Tambah waktu
//         //     updateProgress(); // Update tampilan
//         // } else {
//             //     // Musik selesai
//             //     isPlaying = false;
//             //     playIcon.style.display = 'block';
//             //     pauseIcon.style.display = 'none';
//             //     clearInterval(progressInterval); // Stop interval
//             // }
//             // ================ INI BAGIAN UPDATE ======================
//     } else {
//         // Saat pause diklik
//         document.getElementById("ashkbasllkavsd").removeAttribute("checked")
//         playIcon.style.display = 'block'; // Tampilkan icon play
//         pauseIcon.style.display = 'none'; // Sembunyikan icon pause
//         clearInterval(progressInterval); // Stop interval
//     }
// });


// EVENT LISTENER - PROGRESS BAR CLICK
progressBar.addEventListener('click', (e) => {
    audioControl.pause()
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    currentTime = pos * totalDuration;
    audioControl.currentTime = currentTime
    audioControl.play()
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

