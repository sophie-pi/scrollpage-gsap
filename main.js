//document.addEventListener("DOMContentLoaded", (event) => {
//    gsap.registerPlugin(ScrollTrigger)

    // code here :)



//});
//oben kp maybe wichtig

const button = document.getElementById('music-btn');
const music = document.getElementById('background-music');
let pulse;

// GSAP Animation
function startPulse() {
  pulse = gsap.to(button, {
    scale: 1.15,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 0.8
  });
}

function stopPulse() {
  if (pulse) pulse.kill();
  gsap.to(button, { scale: 1, duration: 0.3, ease: "power1.out" });
}

// Button Event
button.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    button.textContent = 'Pause music';
    button.classList.add('playing');
    startPulse();
  } else {
    music.pause();
    button.textContent = 'Play music';
    button.classList.remove('playing');
    stopPulse();
  }
});