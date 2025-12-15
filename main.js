//document.addEventListener("DOMContentLoaded", (event) => {
//    gsap.registerPlugin(ScrollTrigger)

// code here :)
gsap.to(".hero", { x: 200 })

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Progress bar
gsap.to(".progress-bar", {
  scaleX: 1,
  transformOrigin: "left",
  ease: "none",
  scrollTrigger: {
    start: "top top",
    end: "max",
    scrub: 0.3
  }
});

// Hero animations with stagger
const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

heroTl.to("#title", {
  opacity: 1,
  scale: 1,
  duration: 1.5,
  ease: "back.out(1.7)"
})
  .to("#subtitle", {
    opacity: 1,
    y: 0,
    duration: 1
  }, "-=0.7")
  .to("#nav", {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, "-=0.5");

// Card symbols flying animation
gsap.to("#card1", {
  x: -300,
  y: -150,
  rotation: 360,
  scale: 1.5,
  duration: 2,
  ease: "power2.out"
});

gsap.to("#card2", {
  x: 300,
  y: -200,
  rotation: -360,
  scale: 1.3,
  duration: 2.2,
  ease: "power2.out"
});

gsap.to("#card3", {
  x: -320,
  y: 150,
  rotation: -270,
  scale: 1.4,
  duration: 2.1,
  ease: "power2.out"
});

gsap.to("#card4", {
  x: 320,
  y: 180,
  rotation: 270,
  scale: 1.6,
  duration: 2.3,
  ease: "power2.out"
});

// Laser effect on scroll
const laser = document.querySelector('.laser-line');
window.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  if (Math.random() > 0.97) {
    gsap.to(laser, {
      opacity: 0.8,
      top: Math.random() * window.innerHeight + 'px',
      duration: 0.1,
      onComplete: () => {
        gsap.to(laser, { opacity: 0, duration: 0.3 });
      }
    });
  }
});

// Floating cards continuous animation
const floatingCards = ["#float1", "#float2", "#float3", "#float4"];
floatingCards.forEach((card, i) => {
  gsap.set(card, {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  });

  gsap.to(card, {
    x: `+=${Math.random() * 600 - 300}`,
    y: `+=${Math.random() * 600 - 300}`,
    rotation: 360,
    duration: 15 + i * 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});

// Intro section with stagger
gsap.to(".intro-title", {
  scrollTrigger: {
    trigger: ".intro-title",
    start: "top 80%",
  },
  opacity: 1,
  scale: 1,
  duration: 1,
  ease: "power2.out"
});

gsap.utils.toArray(".intro-content p").forEach((p, i) => {
  gsap.to(p, {
    scrollTrigger: {
      trigger: p,
      start: "top 85%",
    },
    opacity: 1,
    x: 0,
    duration: 1,
    delay: i * 0.1,
    ease: "power2.out"
  });
});

// HORIZONTAL SCROLLING SECTION
const horizontalScroll = gsap.to(".horizontal-scroll", {
  x: () => -(document.querySelector(".horizontal-scroll").scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll-wrapper",
    start: "top top",
    end: () => "+=" + document.querySelector(".horizontal-scroll").scrollWidth,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true
  }
});

// Character title animation
gsap.to(".char-title", {
  scrollTrigger: {
    trigger: ".char-title",
    start: "top 80%",
  },
  opacity: 1,
  duration: 1,
  ease: "power2.out"
});

// Animate each character card as it comes into view during horizontal scroll
gsap.utils.toArray(".character-content").forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: card,
      start: "left 80%",
      end: "left 20%",
      containerAnimation: horizontalScroll,
      toggleActions: "play reverse play reverse",
    }
  });
});

// Card reveal between sections
const suits = ['♠', '♥', '♦', '♣'];
const cardReveal = document.querySelector('.card-reveal');

ScrollTrigger.create({
  trigger: "#games",
  start: "top center",
  onEnter: () => {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    cardReveal.textContent = randomSuit;
    cardReveal.style.color = (randomSuit === '♥' || randomSuit === '♦') ? '#ff0000' : '#fff';

    gsap.timeline()
      .to(cardReveal, { opacity: 1, scale: 1, duration: 0.3 })
      .to(cardReveal, { rotation: 720, duration: 0.5 })
      .to(cardReveal, { opacity: 0, scale: 0, duration: 0.3 });
  }
});

// Games section animations
gsap.to(".games-title", {
  scrollTrigger: {
    trigger: ".games-title",
    start: "top 80%",
  },
  opacity: 1,
  duration: 1,
  ease: "power2.out"
});

gsap.to(".games-intro", {
  scrollTrigger: {
    trigger: ".games-intro",
    start: "top 80%",
  },
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.out"
});

// Vertical scroll animations for game cards with parallax
gsap.utils.toArray(".game-card").forEach((card, i) => {
  const isEven = i % 2 === 0;

  gsap.fromTo(card,
    {
      opacity: 0,
      x: isEven ? -200 : 200,
      rotation: isEven ? -15 : 15
    },
    {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
      opacity: 1,
      x: 0,
      rotation: 0,
      ease: "power2.out"
    }
  );

  // Parallax effect on game cards
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    y: -50,
    ease: "none"
  });

  // Rotate game suit symbol
  const suit = card.querySelector('.game-suit');
  if (suit) {
    gsap.to(suit, {
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      rotation: 360,
      ease: "none"
    });
  }
});

// Smooth scrolling for nav
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: target,
        offsetY: 80
      },
      ease: "power3.inOut"
    });
  });
});

// Hero parallax
gsap.to(".hero", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
  },
  opacity: 0.2,
  scale: 0.8,
  ease: "none"
});

// Parallax on hero cards
gsap.to("#card1, #card3", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
  },
  y: 300,
  ease: "none"
});

gsap.to("#card2, #card4", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
  },
  y: -300,
  ease: "none"
});

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
    button.textContent = '❚❚';
    button.classList.add('playing');
    startPulse();
  } else {
    music.pause();
    button.textContent = '▶';
    button.classList.remove('playing');
    stopPulse();
  }
});