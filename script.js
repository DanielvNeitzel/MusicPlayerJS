const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const IconDiscAnim = document.querySelector(".fa-compact-disc");

import songs from "./songs.js";

const textButtonPlay = "<i class='fa-regular fa-circle-play'></i>";
const textButtonPause = "<i class='fa-regular fa-circle-pause'></i>";

let index = 0;

// Aparecer a musica atual na aba do navegador com efeito marquee - inicio
var documentTitle = " " + document.title + " " + songs[index].name + " ";

(function titleMarquee() {
  document.title = documentTitle = documentTitle.substring(1) + documentTitle.substring(0, 1);
  setTimeout(titleMarquee, 100);
})();

// Aparecer a musica atual na aba do navegador com efeito marquee - fim


// Função Play e Pause do Player - inicio
prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();
playPauseButton.onclick = () => playPause();

const playPause = () => {
  if (player.paused) {
    player.play();
    playPauseButton.innerHTML = textButtonPause;
    IconDiscAnim.classList.add("fa-spin");
  } else {
    player.pause();
    playPauseButton.innerHTML = textButtonPlay;
    IconDiscAnim.classList.remove("fa-spin");
  }
};
// Função Play e Pause do Player - fim


// Atualização da linha do tempo da musica - inicio
player.ontimeupdate = () => updateTime();

const updateTime = () => {
  const currentMinutes = Math.floor(player.currentTime / 60);
  const currentSeconds = Math.floor(player.currentTime % 60);
  currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
  const durationMinutes = Math.floor(durationFormatted / 60);
  const durationSeconds = Math.floor(durationFormatted % 60);
  duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

  const progressWidth = durationFormatted
    ? (player.currentTime / durationFormatted) * 100
    : 0;

  progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
  const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = newTime;
};

// Atualização da linha do tempo da musica - fim

// Função passar e retornar a musica - inicio
const prevNextMusic = (type = "next") => {
  if ((type == "next" && index + 1 === songs.length) || type === "init") {
    index = 0;
  } else if (type == "prev" && index === 0) {
    index = songs.length;
  } else {
    index = type === "prev" && index ? index - 1 : index + 1;
  }

  player.src = 'songs/' + songs[index].src;
  musicName.innerHTML = songs[index].name;
  document.title = '...';
  documentTitle = '';
  documentTitle = "[Music Player JS] - " + songs[index].name + " ";
  if (type !== "init") playPause();

  updateTime();
};

prevNextMusic("init");

// Função passar e retornar a musica - fim