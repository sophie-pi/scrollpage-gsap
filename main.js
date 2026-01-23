document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Progress bar
  gsap.to(".progress-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      start: "top top",
      end: "max",
      scrub: 0.3
    }
  });

  // Hero intro timeline
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

  heroTl
    .fromTo(
      "#title",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }
    )
    .fromTo(
      "#subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.7"
    )
    .fromTo(
      "#nav",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );

  // Hero cards fly-in
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
  const laser = document.querySelector(".laser-line");
  window.addEventListener("scroll", () => {
    if (Math.random() > 0.97) {
      gsap.to(laser, {
        opacity: 0.8,
        top: Math.random() * window.innerHeight + "px",
        duration: 0.1,
        onComplete: () => {
          gsap.to(laser, { opacity: 0, duration: 0.3 });
        }
      });
    }
  });

  // Floating cards
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

  // Intro section
  gsap.to(".intro-title", {
    scrollTrigger: {
      trigger: ".intro-title",
      start: "top 80%"
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
        start: "top 85%"
      },
      opacity: 1,
      x: 0,
      duration: 1,
      delay: i * 0.1,
      ease: "power2.out"
    });
  });

  // Horizontal scrolling for characters
  const horizontal = document.querySelector(".horizontal-scroll");
  if (horizontal) {
    const horizontalScroll = gsap.to(".horizontal-scroll", {
      x: () => -(horizontal.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-scroll-wrapper",
        start: "top top",
        end: () => "+=" + horizontal.scrollWidth,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Character title
    gsap.to(".char-title", {
      scrollTrigger: {
        trigger: ".char-title",
        start: "top 80%"
      },
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });

    // Character cards
    gsap.utils.toArray(".character-content").forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: card,
          start: "left 80%",
          end: "left 20%",
          containerAnimation: horizontalScroll,
          toggleActions: "play reverse play reverse"
        }
      });
    });
  }

  // Card reveal before games
  const suits = ["♠", "♥", "♦", "♣"];
  const cardReveal = document.querySelector(".card-reveal");

  ScrollTrigger.create({
    trigger: "#games",
    start: "top center",
    once: true,
    onEnter: () => {
      const randomSuit = suits[Math.floor(Math.random() * suits.length)];
      cardReveal.textContent = randomSuit;
      cardReveal.style.color =
        randomSuit === "♥" || randomSuit === "♦" ? "#ff0000" : "#fff";

      gsap
        .timeline()
        .to(cardReveal, { opacity: 1, scale: 1, duration: 0.3 })
        .to(cardReveal, { rotation: 720, duration: 0.5 })
        .to(cardReveal, { opacity: 0, scale: 0, duration: 0.3, rotation: 0 });
    }
  });

  // Games section animations
  gsap.to(".games-title", {
    scrollTrigger: {
      trigger: ".games-title",
      start: "top 80%"
    },
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });

  gsap.to(".games-intro", {
    scrollTrigger: {
      trigger: ".games-intro",
      start: "top 80%"
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  });

  gsap.utils.toArray(".game-card").forEach((card, i) => {
    const isEven = i % 2 === 0;

    gsap.fromTo(
      card,
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
          scrub: 1
        },
        opacity: 1,
        x: 0,
        rotation: 0,
        ease: "power2.out"
      }
    );

    // Parallax
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: -50,
      ease: "none"
    });

    const suit = card.querySelector(".game-suit");
    if (suit) {
      gsap.to(suit, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        rotation: 360,
        ease: "none"
      });
    }
  });

  // Smooth scrolling for nav
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

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

  // Hero parallax fade/scale
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
});
