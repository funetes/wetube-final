const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("playBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreen = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");
function handlePlayBtn() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}
function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}
function exitFullScreen() {
  fullScreen.innerHTML = `<i class="fas fa-expand"></i>`;
  fullScreen.addEventListener("click", goFullScreen);
  document.webkitExitFullscreen();
}
function goFullScreen() {
  videoContainer.webkitRequestFullscreen();
  fullScreen.removeEventListener("click", goFullScreen);
  fullScreen.innerHTML = `<i class="fas fa-compress"></i>`;
  fullScreen.addEventListener("click", exitFullScreen);
}
const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};
function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}
function setTotalTime() {
  totalTime.innerHTML = formatDate(videoPlayer.duration);
  setInterval(getCurrentTime, 1000);
}
function init() {
  playBtn.addEventListener("click", handlePlayBtn);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreen.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
}

if (videoContainer) {
  init();
}
