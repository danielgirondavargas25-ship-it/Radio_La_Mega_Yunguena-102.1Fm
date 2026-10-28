const audio = document.getElementById('radioAudio');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const playerTitle = document.getElementById('playerTitle');
const playerStatus = document.getElementById('playerStatus');
const soundBars = document.querySelector('.sound-bars');

function setPlaying(playing) {
  playIcon.textContent = playing ? 'Ⅱ' : '▶';
  playButton.setAttribute('aria-label', playing ? 'Pausar radio' : 'Reproducir radio');
  playerTitle.textContent = playing ? 'Estás escuchando La Mega Yungueña' : 'Dale play y vive La Mega';
  playerStatus.textContent = playing ? 'Señal en directo · 102.1 FM' : 'Listos para conectarte con nuestra señal';
  soundBars.classList.toggle('active', playing);
}

playButton.addEventListener('click', async () => {
  if (!audio.paused) {
    audio.pause();
    setPlaying(false);
    return;
  }
  playerTitle.textContent = 'Conectando con la radio…';
  playerStatus.textContent = 'Un momento, estamos buscando la señal';
  try {
    await audio.play();
    setPlaying(true);
  } catch (error) {
    setPlaying(false);
    playerTitle.textContent = 'No se pudo iniciar la señal';
    playerStatus.textContent = 'Comprueba tu conexión y vuelve a intentarlo.';
  }
});

audio.addEventListener('playing', () => setPlaying(true));
audio.addEventListener('pause', () => setPlaying(false));
audio.addEventListener('error', () => {
  setPlaying(false);
  playerTitle.textContent = 'Señal temporalmente no disponible';
  playerStatus.textContent = 'Intenta de nuevo en unos instantes.';
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.textContent = opened ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();



/* CONTROL DE VOLUMEN - RADIO LA MEGA YUNGUEÑA */
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const muteButton = document.getElementById('muteButton');

if (audio && volumeSlider && volumeValue && muteButton) {
  audio.volume = 0.7;

  let previousVolume = 0.7;

  function updateVolume() {
    volumeValue.textContent = Math.round(audio.volume * 100) + '%';
    volumeSlider.value = Math.round(audio.volume * 100);

    muteButton.textContent =
      audio.muted || audio.volume === 0
        ? '🔇 Activar sonido'
        : '🔊 Silenciar';
  }

  volumeSlider.addEventListener('input', () => {
    audio.volume = Number(volumeSlider.value) / 100;
    audio.muted = false;

    if (audio.volume > 0) {
      previousVolume = audio.volume;
    }

    updateVolume();
  });

  muteButton.addEventListener('click', () => {
    if (audio.muted || audio.volume === 0) {
      audio.muted = false;

      if (audio.volume === 0) {
        audio.volume = previousVolume;
      }
    } else {
      previousVolume = audio.volume;
      audio.muted = true;
    }

    updateVolume();
  });

  updateVolume();
}
