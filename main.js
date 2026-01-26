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


let scene, camera, renderer, cards = [];
    let mouse = { x: 0, y: 0 };
    let raycaster, intersects;
    let cardsRing; // Gruppe für alle Karten

    // Drag-Variablen
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotation = 0;
    let currentRotation = 0;

    const cardData = {
        '3H': { name: '3 von Herz', difficulty: 3, suit: '♥', type: 'Vertrauen', color: 0xff0000,
                desc: 'Ein Spiel des Vertrauens in einem brennenden Gebäude. Finde den sicheren Raum.' },
        '7H': { name: '7 von Herz', difficulty: 7, suit: '♥', type: 'Psychologie', color: 0xff0000,
                desc: 'Das Wolfsrudel - Identifiziere den Wolf unter den Spielern bevor es zu spät ist.' },
        '10H': { name: '10 von Herz', difficulty: 10, suit: '♥', type: 'Verrat', color: 0xff0000,
                 desc: 'Hexenjagd - Finde die Hexe oder stirb durch falsche Anschuldigungen.' },
        'QH': { name: 'Dame von Herz', difficulty: 12, suit: '♥', type: 'Isolation', color: 0xff0000,
                desc: 'Solitär in völliger Einsamkeit. Überwinde deine Ängste oder verliere deinen Verstand.' },
        '5S': { name: '5 von Pik', difficulty: 5, suit: '♠', type: 'Kraft', color: 0x000000,
                desc: 'Durchquere die Arena. Körperliche Stärke und Geschwindigkeit entscheiden.' },
        'KS': { name: 'König von Pik', difficulty: 13, suit: '♠', type: 'Boss Fight', color: 0x000000,
                desc: 'Die ultimative physische Herausforderung. Besiege den König oder stirb.' },
        '7D': { name: '7 von Karo', difficulty: 7, suit: '♦', type: 'Intelligenz', color: 0xff0000,
                desc: 'Löse komplexe Rätsel unter Zeitdruck. Nur die Klügsten überleben.' },
        '3C': { name: '3 von Kreuz', difficulty: 3, suit: '♣', type: 'Teamwork', color: 0x000000,
                desc: 'Arbeitet zusammen oder sterbt getrennt. Kommunikation ist der Schlüssel.' }
    };

    function init() {
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 10, 50);

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 15;
        camera.position.y = 2;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        document.getElementById('canvas-container').appendChild(renderer.domElement);

        raycaster = new THREE.Raycaster();

        // Gruppe für Karten-Kreis
        cardsRing = new THREE.Group();
        scene.add(cardsRing);

        // Licht
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xff0000, 2);
        spotLight.position.set(0, 20, 10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        const pointLight1 = new THREE.PointLight(0xff0000, 1, 50);
        pointLight1.position.set(-10, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff0000, 1, 50);
        pointLight2.position.set(10, 5, 5);
        scene.add(pointLight2);

        createCards();
        createParticles();

        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onMouseClick);

        // Drag-Events für Rotation
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseleave', onMouseUp); // Sicherheit

        animate();
    }

    function createCards() {
        const cardKeys = Object.keys(cardData);
        const radius = 8;
        const angleStep = (Math.PI * 2) / cardKeys.length;

        cardKeys.forEach((key, index) => {
            const angle = angleStep * index;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const cardGroup = new THREE.Group();

            const geometry = new THREE.BoxGeometry(2, 3, 0.05);

            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 384;
            const ctx = canvas.getContext('2d');

            const gradient = ctx.createLinearGradient(0, 0, 256, 384);
            gradient.addColorStop(0, '#1a1a1a');
            gradient.addColorStop(1, '#0a0a0a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 256, 384);

            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 4;
            ctx.strokeRect(4, 4, 248, 376);

            ctx.font = 'bold 120px Arial';
            ctx.fillStyle = cardData[key].color === 0xff0000 ? '#ff0000' : '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cardData[key].suit, 128, 140);

            ctx.font = 'bold 80px Arial';
            ctx.fillStyle = '#ff0000';
            ctx.fillText(
                key.replace('H', '').replace('S', '').replace('D', '').replace('C', ''),
                128,
                260
            );

            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#ff6b6b';
            ctx.fillText(cardData[key].type.toUpperCase(), 128, 340);

            const texture = new THREE.CanvasTexture(canvas);
            const frontMaterial = new THREE.MeshPhongMaterial({
                map: texture,
                shininess: 100,
                emissive: 0x330000,
                emissiveIntensity: 0.2
            });

            const backMaterial = new THREE.MeshPhongMaterial({
                color: 0x0a0a0a,
                shininess: 100,
                emissive: 0xff0000,
                emissiveIntensity: 0.1
            });

            const sideMaterial = new THREE.MeshPhongMaterial({
                color: 0xff0000,
                emissive: 0xff0000,
                emissiveIntensity: 0.3
            });

            const materials = [
                sideMaterial,
                sideMaterial,
                sideMaterial,
                sideMaterial,
                frontMaterial,
                backMaterial
            ];

            const card = new THREE.Mesh(geometry, materials);

            const glowGeometry = new THREE.BoxGeometry(2.1, 3.1, 0.06);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                transparent: true,
                opacity: 0.3,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            cardGroup.add(glow);

            cardGroup.add(card);
            cardGroup.position.set(x, 0, z);
            cardGroup.lookAt(0, 0, 0);
            cardGroup.userData = {
                key: key,
                data: cardData[key],
                originalY: 0,
                card: card,
                glow: glow
            };

            // statt scene -> in cardsRing einfügen
            cardsRing.add(cardGroup);
            cards.push(cardGroup);

            gsap.from(cardGroup.position, {
                y: -10,
                duration: 1.5,
                delay: index * 0.1,
                ease: "bounce.out"
            });

            gsap.from(cardGroup.rotation, {
                y: cardGroup.rotation.y + Math.PI * 2,
                duration: 1.5,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });
    }

    function createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xff0000,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        function animateParticles() {
            const positions = particlesGeometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] -= 0.01;
                if (positions[i] < -25) {
                    positions[i] = 25;
                }
            }
            particlesGeometry.attributes.position.needsUpdate = true;
        }

        setInterval(animateParticles, 16);
    }

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(cardsRing.children, true); // Gruppe durchsuchen[web:12][web:15][web:18]

        // Reset Hover
        cards.forEach(cardGroup => {
            gsap.to(cardGroup.position, {
                y: cardGroup.userData.originalY,
                duration: 0.3
            });
            gsap.to(cardGroup.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3
            });
            cardGroup.userData.glow.material.opacity = 0.3;
        });

        if (intersects.length > 0) {
            let cardGroup = intersects[0].object.parent;
            gsap.to(cardGroup.position, {
                y: 0.5,
                duration: 0.3
            });
            gsap.to(cardGroup.scale, {
                x: 1.2,
                y: 1.2,
                z: 1.2,
                duration: 0.3
            });
            cardGroup.userData.glow.material.opacity = 0.8;

            const data = cardGroup.userData.data;
            document.getElementById('cardTitle').textContent = data.name;
            document.getElementById('cardDifficulty').textContent = `Schwierigkeit: ${data.difficulty} ${data.suit}`;
            document.getElementById('cardDescription').textContent = data.desc;
            document.getElementById('cardInfo').classList.add('visible');
        } else {
            document.getElementById('cardInfo').classList.remove('visible');
        }

        // Kamera leicht der Maus folgen
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouse.y * 2 - camera.position.y + 2) * 0.05;
        camera.lookAt(scene.position);

        // Drag-Rotation: nur wenn gedrückt und nicht direkt über einer Karte
        if (isDragging && (!intersects || intersects.length === 0)) {
            const deltaX = event.clientX - prevMouseX;
            targetRotation += deltaX * 0.005; // Empfindlichkeit
            prevMouseX = event.clientX;
        }
    }

    function onMouseDown(event) {
        isDragging = true;
        prevMouseX = event.clientX;
    }

    function onMouseUp() {
        isDragging = false;
    }

    function onMouseClick(event) {
        if (intersects && intersects.length > 0) {
            let cardGroup = intersects[0].object.parent;

            gsap.to(cardGroup.rotation, {
                y: cardGroup.rotation.y + Math.PI,
                duration: 0.6,
                ease: "power2.inOut"
            });

            gsap.to(cardGroup.userData.glow.material, {
                opacity: 1,
                duration: 0.2,
                yoyo: true,
                repeat: 3
            });
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        // weiche Annäherung an Zielrotation (Inertia)
        currentRotation += (targetRotation - currentRotation) * 0.1;
        cardsRing.rotation.y = currentRotation;

        renderer.render(scene, camera);
    }

    init();