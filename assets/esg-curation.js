/**
 * Corner Museum - ESG Zero-Carbon Curation Interactive Engine
 * Upgraded Edition:
 * 1. NeoLeaf-Style Wave Liquid Loader Portal (3-Second Duration, Dual Wave Fluid Mask)
 * 2. Three.js 3D Holographic Artifact Stage (360° Drag Rotation, XRF Laser Scan)
 * 3. Three.js Ambient Cosmic Particle Starfield
 * 4. Real-time SROI Dynamic Calculator with Rolling Odometer
 * 5. Cross-Industry Brand Metaphors Tabs & Module Checklist
 */

(function () {
  'use strict';

  function initAll() {
    initNeoLeafLoader(() => {
      // Trigger canvas resize when loader reveals the page
      window.dispatchEvent(new Event('resize'));
    });
    initBrandLogoStage();
    ensureThreeAndInit();
    initHeroButtons();
    initSROICalculator();
    initIndustryTabs();
    initModuleChecklist();
    initScrollReveal();
    initFAQAccordion();
    initShowcaseWindow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    // If DOMContentLoaded already fired (mobile Safari / cached DOM / deferred execution), run immediately!
    initAll();
  }

  /* ==========================================================================
     1. NeoLeaf-Style Wave Liquid Loader Portal (約 3 秒)
     ========================================================================== */
  function initNeoLeafLoader(onComplete) {
    const portal = document.getElementById('esg-loader-portal');
    if (!portal) return;

    // Immediately ensure section and page elements are visible beneath
    const esgSection = document.querySelector('.section-esg-curation, [id*="esg_curation"]');
    if (esgSection) {
      esgSection.style.setProperty('opacity', '1', 'important');
      esgSection.style.setProperty('transform', 'none', 'important');
      esgSection.style.setProperty('visibility', 'visible', 'important');
    }
    const pageEl = document.querySelector('.esg-page');
    if (pageEl) {
      pageEl.style.setProperty('opacity', '1', 'important');
      pageEl.style.setProperty('visibility', 'visible', 'important');
    }

    let isDismissed = false;
    function dismissPortal() {
      if (isDismissed) return;
      isDismissed = true;
      portal.style.pointerEvents = 'none';
      portal.classList.add('fade-out');
      portal.classList.add('is-done');
      portal.style.setProperty('display', 'none', 'important');
      portal.style.setProperty('pointer-events', 'none', 'important');
      portal.style.visibility = 'hidden';
      if (typeof onComplete === 'function') onComplete();
      window.dispatchEvent(new Event('resize'));
      setTimeout(() => {
        try {
          if (portal && portal.parentNode) {
            portal.parentNode.removeChild(portal);
          }
        } catch (e) {
          console.warn(e);
        }
      }, 400);
    }

    // Allow user to tap/click anywhere to skip immediately
    portal.addEventListener('click', dismissPortal);
    portal.addEventListener('touchstart', dismissPortal, { passive: true });

    const isMobile = window.innerWidth <= 768;
    // Safety watchdog: Guarantee portal dismissal after 2.3s on mobile, 3.1s on desktop
    setTimeout(dismissPortal, isMobile ? 2300 : 3100);

    const canvas = document.getElementById('esg-neoleaf-wave-canvas');
    const counterEl = document.getElementById('esg-neoleaf-counter');
    if (!canvas || !counterEl) {
      dismissPortal();
      return;
    }

    // Relocate portal to document.body to escape theme section stacking context
    try {
      if (portal.parentElement !== document.body && document.body) {
        document.body.appendChild(portal);
      }
    } catch (e) {}

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      dismissPortal();
      return;
    }

    let width = 960;
    let height = 210;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 960;
      height = rect.height || 210;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const brandText = 'CornerMuseum';
    const duration = isMobile ? 1900 : 2700;
    let startTime = null;
    let isFinished = false;

    function draw(now) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1.0);
      const percent = Math.min(Math.floor(progressRatio * 100), 100);
      counterEl.textContent = percent;

      ctx.clearRect(0, 0, width, height);

      // Measure font size to fill 90% of canvas width
      const fontStack = '900 100px "Inter", "Syne", "Montserrat", "Arial Black", sans-serif';
      ctx.font = fontStack;
      const textWidth = ctx.measureText(brandText).width || 100;
      const targetWidth = width * 0.90;
      const fontSize = Math.floor(100 * (targetWidth / textWidth));
      ctx.font = `900 ${fontSize}px "Inter", "Syne", "Montserrat", "Arial Black", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw Base Silhouette in Slate Grey
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#52575f';
      ctx.fillText(brandText, centerX, centerY);

      // 2. Liquid wave fill strictly inside letters
      ctx.globalCompositeOperation = 'source-atop';

      const topY = centerY - fontSize * 0.36;
      const bottomY = centerY + fontSize * 0.44;
      const currentWaterY = bottomY - progressRatio * (bottomY - topY + 12);
      const timeSec = elapsed * 0.001;

      // Back wave (darker translucent slate)
      ctx.fillStyle = 'rgba(120, 130, 145, 0.72)';
      ctx.beginPath();
      ctx.moveTo(0, height + 20);
      for (let x = 0; x <= width; x += 10) {
        const wave = Math.sin(x * 0.014 + timeSec * 4.2) * 14 + Math.cos(x * 0.007 + timeSec * 2.5) * 6;
        ctx.lineTo(x, currentWaterY + wave);
      }
      ctx.lineTo(width, height + 20);
      ctx.closePath();
      ctx.fill();

      // Front wave (pure crisp solid white)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, height + 20);
      for (let x = 0; x <= width; x += 8) {
        const wave = Math.sin(x * 0.016 + timeSec * 4.8 + 1.4) * 16 + Math.sin(x * 0.008 + timeSec * 3.2) * 7;
        ctx.lineTo(x, currentWaterY + wave);
      }
      ctx.lineTo(width, height + 20);
      ctx.closePath();
      ctx.fill();

      // Floating droplet
      if (currentWaterY < bottomY) {
        const bubbleY = (centerY - 35) - ((elapsed * 0.04) % 60);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX + fontSize * 2.2, bubbleY, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      if (progressRatio < 1.0) {
        requestAnimationFrame(draw);
      } else if (!isFinished) {
        isFinished = true;
        // ── Netflix-style reveal: text stays white for 200ms ──
        // Then the WHOLE portal scales up + fades out (punching through to page)
        counterEl.textContent = '100';
        setTimeout(() => {
          // Kill the wave animation, fill letters solid white instantly
          ctx.clearRect(0, 0, width, height);
          ctx.font = `900 ${fontSize}px "Inter", "Syne", "Montserrat", "Arial Black", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = '#52575f';
          ctx.fillText(brandText, centerX, centerY);
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = 'source-over';

          // Apply Netflix zoom-up scale + fade
          portal.style.pointerEvents = 'none';
          portal.classList.add('fade-out');

          const loaderBox = portal.querySelector('.esg-neoleaf-loader-box');
          if (loaderBox) {
            loaderBox.style.transition = 'transform 0.75s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease';
            loaderBox.style.transformOrigin = 'center center';
            loaderBox.style.transform = 'scale(1.0)';
          }
          // Small delay then trigger the zoom
          requestAnimationFrame(() => {
            if (loaderBox) {
              loaderBox.style.transform = 'scale(2.8)';
              loaderBox.style.opacity = '0';
            }
            portal.style.transition = 'opacity 0.65s ease 0.15s, background-color 0.5s ease';
            portal.style.opacity = '0';
          });

          setTimeout(() => {
            window.removeEventListener('resize', resizeCanvas);
            dismissPortal();
          }, 800);
        }, 200);
      }
    }

    requestAnimationFrame(draw);
  }


  /* ==========================================================================
     2. Three.js Engine: Local Detection & Background Starfield
     ========================================================================== */
  function ensureThreeAndInit() {
    function start() {
      if (typeof window.THREE === 'undefined') return;
      initCosmicBackground();
    }

    if (typeof window.THREE !== 'undefined') {
      start();
    } else {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (typeof window.THREE !== 'undefined') {
          clearInterval(interval);
          start();
        } else if (attempts > 30) {
          clearInterval(interval);
        }
      }, 100);
    }
  }

  /* ==========================================================================
     3. Corner Museum × Zero-Carbon ESG Dynamic Animated Logo Stage
     ========================================================================== */
  function initBrandLogoStage() {
    const stageBox = document.getElementById('esg-brand-stage-box');
    const card = document.getElementById('esg-brand-card');
    const canvas = document.getElementById('esg-brand-canvas');
    const telemetryEl = document.getElementById('esg-brand-telemetry');

    if (!stageBox || !card) return;

    // --- 1. Ambient Stardust & Orbit Canvas ---
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let width = 0;
        let height = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        function resizeCanvas() {
          const rect = stageBox.getBoundingClientRect();
          width = rect.width || 540;
          height = rect.height || 480;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Stardust particle system
        const PARTICLE_COUNT = 45;
        const particles = [];
        const colors = [
          'rgba(197, 160, 89, ', // gold
          'rgba(245, 223, 176, ', // gold light
          'rgba(16, 185, 129, ',  // emerald
          'rgba(110, 231, 183, '  // emerald light
        ];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles.push({
            x: Math.random() * (width || 540),
            y: Math.random() * (height || 480),
            r: Math.random() * 1.8 + 0.8,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            baseAlpha: Math.random() * 0.5 + 0.3,
            colorBase: colors[Math.floor(Math.random() * colors.length)],
            phase: Math.random() * Math.PI * 2
          });
        }

        // Orbit photon particles
        const ORBIT_NODES = 4;
        const orbitAngles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];

        let time = 0;

        function render() {
          time += 0.02;
          ctx.clearRect(0, 0, width, height);

          const cx = width / 2;
          const cy = height / 2 - 10;

          // Draw dual orbital ellipses connecting the two emblems
          ctx.save();
          ctx.lineWidth = 1;

          // Ellipse 1 (Gold)
          ctx.strokeStyle = 'rgba(197, 160, 89, 0.22)';
          ctx.beginPath();
          ctx.ellipse(cx, cy, width * 0.38, height * 0.28, -0.15, 0, Math.PI * 2);
          ctx.stroke();

          // Ellipse 2 (Emerald)
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.18)';
          ctx.beginPath();
          ctx.ellipse(cx, cy, width * 0.35, height * 0.24, 0.18, 0, Math.PI * 2);
          ctx.stroke();

          // Traveling glowing photons on orbits
          for (let i = 0; i < ORBIT_NODES; i++) {
            const angle1 = time * 0.7 + orbitAngles[i];
            const px1 = cx + Math.cos(angle1) * (width * 0.38) * Math.cos(-0.15) - Math.sin(angle1) * (height * 0.28) * Math.sin(-0.15);
            const py1 = cy + Math.cos(angle1) * (width * 0.38) * Math.sin(-0.15) + Math.sin(angle1) * (height * 0.28) * Math.cos(-0.15);

            ctx.fillStyle = '#f5dfb0';
            ctx.shadowColor = '#c5a059';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(px1, py1, 2.2, 0, Math.PI * 2);
            ctx.fill();

            const angle2 = -time * 0.6 + orbitAngles[i];
            const px2 = cx + Math.cos(angle2) * (width * 0.35) * Math.cos(0.18) - Math.sin(angle2) * (height * 0.24) * Math.sin(0.18);
            const py2 = cy + Math.cos(angle2) * (width * 0.35) * Math.sin(0.18) + Math.sin(angle2) * (height * 0.24) * Math.cos(0.18);

            ctx.fillStyle = '#6ee7b7';
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(px2, py2, 2.0, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.shadowBlur = 0;
          ctx.restore();

          // Floating stardust
          particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            const alpha = p.baseAlpha + Math.sin(time * 1.5 + p.phase) * 0.25;
            ctx.fillStyle = p.colorBase + Math.max(0.05, Math.min(1, alpha)) + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          });

          requestAnimationFrame(render);
        }
        render();
      }
    }

    // --- 2. Interactive Parallax 3D Perspective Tilt on Mouse Move ---
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    function onMouseMove(e) {
      const rect = stageBox.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 18;  // tilt up to 18 deg
      targetRotX = -y * 14; // tilt up to 14 deg

      if (telemetryEl) {
        telemetryEl.textContent = `PARALLAX: ${Math.round(targetRotY)}° / ${Math.round(targetRotX)}°`;
      }
    }

    function onMouseLeave() {
      targetRotX = 0;
      targetRotY = 0;
      if (telemetryEl) {
        telemetryEl.textContent = 'HERITAGE × SUSTAINABILITY';
      }
    }

    stageBox.addEventListener('mousemove', onMouseMove);
    stageBox.addEventListener('mouseleave', onMouseLeave);

    // Touch support for mobile devices
    stageBox.addEventListener('touchmove', (e) => {
      if (!e.touches.length) return;
      const rect = stageBox.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
      const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 14;
      targetRotX = -y * 10;
    }, { passive: true });

    stageBox.addEventListener('touchend', onMouseLeave);

    function loopTilt() {
      currentRotX += (targetRotX - currentRotX) * 0.1;
      currentRotY += (targetRotY - currentRotY) * 0.1;
      card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
      requestAnimationFrame(loopTilt);
    }
    loopTilt();
  }

  /* ==========================================================================
     Smooth Scroll Handler for All ESG Anchor Links (including #esg-calculator)
     ========================================================================== */
  function initHeroButtons() {
    function getHeaderOffset() {
      const stickyHeader = document.querySelector('sticky-header, .shopify-section-header, header');
      const headerH = stickyHeader ? stickyHeader.getBoundingClientRect().height : 80;
      return Math.max(headerH, 70) + 24;
    }

    function scrollToElement(targetEl) {
      if (!targetEl) return;
      const offset = getHeaderOffset();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const rect = targetEl.getBoundingClientRect();
      const targetTop = rect.top + scrollY - offset;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });

      // Second correction pass in case lazy loaded images expand layout
      setTimeout(() => {
        const newRect = targetEl.getBoundingClientRect();
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
        if (Math.abs(newRect.top - offset) > 35) {
          const correctedTop = newRect.top + currentScroll - offset;
          window.scrollTo({ top: Math.max(0, correctedTop), behavior: 'smooth' });
        }
      }, 450);
    }

    // Event delegation on document to catch all ESG anchor clicks reliably
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        scrollToElement(targetEl);
      }
    });
  }




  /* ==========================================================================
     4. Ambient Cosmic Starfield Background
     ========================================================================== */
  function initCosmicBackground() {
    const bgContainer = document.getElementById('esg-webgl-canvas');
    if (!bgContainer || typeof window.THREE === 'undefined') return;

    let width = window.innerWidth || 1920;
    let height = window.innerHeight || 1080;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.pointerEvents = 'none';
    bgContainer.style.pointerEvents = 'none';
    bgContainer.innerHTML = '';
    bgContainer.appendChild(renderer.domElement);

    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xc5a059);
    const colorEmerald = new THREE.Color(0x10b981);
    const colorCyan = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 260;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 140;

      const rand = Math.random();
      let c = rand < 0.5 ? colorGold : (rand < 0.85 ? colorEmerald : colorCyan);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, pMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0004;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0004;
    });

    function loop() {
      requestAnimationFrame(loop);
      particles.rotation.y += 0.0006;
      particles.rotation.x += 0.0003;

      camera.position.x += (mouseX * 40 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 40 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    loop();

    window.addEventListener('resize', () => {
      if (!bgContainer) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  /* ==========================================================================
     5. SROI Calculator with Rolling Odometer Effect (Enhanced Option A)
     ========================================================================== */
  function initSROICalculator() {
    const rangeBudget = document.getElementById('esg-calc-budget');
    const rangeStudents = document.getElementById('esg-calc-students');
    const rangeArtifacts = document.getElementById('esg-calc-artifacts');
    const rangeFakes = document.getElementById('esg-calc-fakes');

    const valBudget = document.getElementById('val-budget');
    const valStudents = document.getElementById('val-students');
    const valArtifacts = document.getElementById('val-artifacts');
    const valFakes = document.getElementById('val-fakes');

    const budgetPills = document.querySelectorAll('.esg-budget-pill');
    const displayRatio = document.getElementById('esg-sroi-ratio');
    const displayRatioSubtext = document.getElementById('esg-ratio-subtext');
    const displayCost = document.getElementById('esg-sroi-cost');
    const displayTotal = document.getElementById('esg-sroi-total');
    const displayNet = document.getElementById('esg-sroi-net');
    const displayEdu = document.getElementById('esg-sroi-edu');
    const displayArchive = document.getElementById('esg-sroi-archive');
    const displayCarbon = document.getElementById('esg-sroi-carbon');
    const auditFormula = document.querySelector('.esg-calc-audit-formula');

    if (!rangeStudents || !rangeArtifacts || !rangeFakes) return;

    let currentTotal = 5500000;
    let currentRatio = 6.96;

    function formatNTD(num) {
      return 'NT$ ' + Math.round(num).toLocaleString();
    }

    // Number rolling odometer animation for both Total and Ratio
    function animateOdometer(targetTotal, targetRatio) {
      const startTotal = currentTotal;
      const diffTotal = targetTotal - startTotal;
      const startRatio = currentRatio;
      const diffRatio = targetRatio - startRatio;
      const startTime = performance.now();
      const duration = 400; // 0.4s roll

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
        const valTotal = startTotal + diffTotal * ease;
        const valRatio = (startRatio + diffRatio * ease).toFixed(2);

        if (displayTotal) displayTotal.textContent = formatNTD(valTotal);
        if (displayRatio) displayRatio.textContent = valRatio + ' : 1';

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          currentTotal = targetTotal;
          currentRatio = targetRatio;
          if (displayTotal) displayTotal.textContent = formatNTD(targetTotal);
          if (displayRatio) displayRatio.textContent = targetRatio.toFixed(2) + ' : 1';
        }
      }
      requestAnimationFrame(tick);
    }

    function calculate() {
      const budget = rangeBudget ? (parseInt(rangeBudget.value, 10) || 790000) : 790000;
      const students = parseInt(rangeStudents.value, 10) || 500;
      const artifacts = parseInt(rangeArtifacts.value, 10) || 50;
      const fakes = parseInt(rangeFakes.value, 10) || 10;

      if (valBudget) valBudget.textContent = formatNTD(budget);
      if (valStudents) valStudents.textContent = students + ' 人次';
      if (valArtifacts) valArtifacts.textContent = artifacts + ' 件';
      if (valFakes) valFakes.textContent = fakes + ' 件';

      const eduValue = students * 1500;
      const archiveValue = artifacts * 25000;
      const carbonValue = fakes * 350000;
      const grandTotal = eduValue + archiveValue + carbonValue;
      const netValue = grandTotal - budget;
      const ratioNum = budget > 0 ? (grandTotal / budget) : 0;
      const ratioStr = ratioNum.toFixed(2);

      animateOdometer(grandTotal, ratioNum);

      if (displayCost) displayCost.textContent = formatNTD(budget);
      if (displayNet) displayNet.textContent = (netValue >= 0 ? '+ ' : '') + formatNTD(netValue);
      if (displayRatioSubtext) {
        displayRatioSubtext.textContent = '每投入 NT$ 1 元策展預算，預估創造 NT$ ' + ratioStr + ' 元社會價值';
      }
      if (displayEdu) displayEdu.textContent = formatNTD(eduValue);
      if (displayArchive) displayArchive.textContent = formatNTD(archiveValue);
      if (displayCarbon) displayCarbon.textContent = formatNTD(carbonValue);
      if (auditFormula) {
        auditFormula.textContent = 'SROI Ratio = 總產出社會價值 (' + formatNTD(grandTotal) + ') ÷ 策展投入成本 (' + formatNTD(budget) + ') = ' + ratioStr + ' : 1';
      }
    }

    // 預算滑桿事件
    if (rangeBudget) {
      rangeBudget.addEventListener('input', function() {
        const b = parseInt(this.value, 10);
        budgetPills.forEach(function(pill) {
          if (parseInt(pill.getAttribute('data-val'), 10) === b) {
            pill.classList.add('active');
          } else {
            pill.classList.remove('active');
          }
        });
        calculate();
      });
    }

    // 預算快捷按鈕事件
    budgetPills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        budgetPills.forEach(function(p) { p.classList.remove('active'); });
        this.classList.add('active');
        const val = parseInt(this.getAttribute('data-val'), 10);
        if (rangeBudget && val) {
          rangeBudget.value = val;
          calculate();
        }
      });
    });

    rangeStudents.addEventListener('input', calculate);
    rangeArtifacts.addEventListener('input', calculate);
    rangeFakes.addEventListener('input', calculate);

    calculate();
  }

  /* ==========================================================================
     6. Cross-Industry Brand Metaphors Tabs & Mobile Swipe Gesture
     ========================================================================== */
  function initIndustryTabs() {
    const tabBtns = document.querySelectorAll('.esg-tab-btn');
    const tabContents = document.querySelectorAll('.esg-tab-content');
    const sliderWrap = document.getElementById('esg-industry-slider-wrap');
    const swipePrevBtn = document.getElementById('esg-swipe-prev');
    const swipeNextBtn = document.getElementById('esg-swipe-next');
    const swipeDots = document.querySelectorAll('.esg-swipe-dot');
    const swipeCounter = document.getElementById('esg-swipe-counter');

    if (!tabBtns.length || !tabContents.length) return;

    const tabList = Array.from(tabContents);
    let currentIndex = 0;

    function switchTab(newIndex, direction = 'fade') {
      if (newIndex < 0) newIndex = tabList.length - 1;
      if (newIndex >= tabList.length) newIndex = 0;

      currentIndex = newIndex;

      // Update Tab Buttons (Top Grid)
      tabBtns.forEach((b, i) => {
        b.classList.toggle('active', i === currentIndex);
      });

      // Update Tab Contents with directional slide animation
      tabContents.forEach((c, i) => {
        c.classList.remove('active', 'slide-next', 'slide-prev');
        if (i === currentIndex) {
          c.classList.add('active');
          if (direction === 'next') {
            c.classList.add('slide-next');
          } else if (direction === 'prev') {
            c.classList.add('slide-prev');
          }
        }
      });

      // Update Dots & Counter
      swipeDots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
      if (swipeCounter) {
        swipeCounter.textContent = `${currentIndex + 1} / ${tabList.length}`;
      }
    }

    // Top Tab Buttons Click
    tabBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const dir = index > currentIndex ? 'next' : (index < currentIndex ? 'prev' : 'fade');
        switchTab(index, dir);
      });
    });

    // Arrow Buttons Click
    if (swipePrevBtn) {
      swipePrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(currentIndex - 1, 'prev');
      });
    }
    if (swipeNextBtn) {
      swipeNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(currentIndex + 1, 'next');
      });
    }

    // Dot Navigation Click
    swipeDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const dir = index > currentIndex ? 'next' : (index < currentIndex ? 'prev' : 'fade');
        switchTab(index, dir);
      });
    });

    // Mobile Touch Swipe Gesture Detection
    const swipeTargets = [sliderWrap, document.getElementById('esg-tabs-nav')].filter(Boolean);
    swipeTargets.forEach((target) => {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;
      let isSwiping = false;

      target.addEventListener('touchstart', (e) => {
        if (!e.touches.length) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchEndX = touchStartX;
        touchEndY = touchStartY;
        isSwiping = true;
      }, { passive: true });

      target.addEventListener('touchmove', (e) => {
        if (!isSwiping || !e.touches.length) return;
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
      }, { passive: true });

      target.addEventListener('touchend', () => {
        if (!isSwiping) return;
        isSwiping = false;

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Threshold check: at least 42px horizontal swipe, and X delta significantly exceeds Y delta
        if (Math.abs(diffX) > 42 && Math.abs(diffX) > Math.abs(diffY) * 1.25) {
          if (diffX < 0) {
            // Swipe Left -> Next Tab
            switchTab(currentIndex + 1, 'next');
          } else {
            // Swipe Right -> Previous Tab
            switchTab(currentIndex - 1, 'prev');
          }
        }
      }, { passive: true });
    });
  }

  /* ==========================================================================
     7. Interactive Module Selection Feedback
     ========================================================================== */
  function initModuleChecklist() {
    const moduleCards = document.querySelectorAll('.esg-module-card');
    moduleCards.forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.toggle('selected');
        if (card.classList.contains('selected')) {
          card.style.borderColor = 'var(--esg-emerald)';
          card.style.background = 'rgba(16, 185, 129, 0.18)';
        } else {
          card.style.borderColor = 'rgba(255, 255, 255, 0.14)';
          card.style.background = 'rgba(7, 13, 18, 0.85)';
        }
      });
    });
  }

  /* ==========================================================================
     8. Scroll Reveal Observer
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.esg-reveal');
    if (!revealElements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /* ==========================================================================
     9. AEO & GEO FAQ Accordion & Clipboard Citation
     ========================================================================== */
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.esg-faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const header = item.querySelector('.esg-faq-header');
      const body = item.querySelector('.esg-faq-body');
      if (!header || !body) return;

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other items for a clean, focused reading experience
        faqItems.forEach((other) => {
          if (other !== item && other.classList.contains('is-open')) {
            other.classList.remove('is-open');
            const otherHeader = other.querySelector('.esg-faq-header');
            const otherBody = other.querySelector('.esg-faq-body');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            if (otherBody) otherBody.style.display = 'none';
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          header.setAttribute('aria-expanded', 'false');
          body.style.display = 'none';
        } else {
          item.classList.add('is-open');
          header.setAttribute('aria-expanded', 'true');
          body.style.display = 'block';
        }
      });

      // Handle Copy Direct Answer
      const copyBtn = item.querySelector('.esg-faq-copy-btn');
      const directTextEl = item.querySelector('.esg-faq-direct-text');
      if (copyBtn && directTextEl) {
        copyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const textToCopy = directTextEl.innerText.trim();
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
              showCopiedFeedback(copyBtn);
            }).catch(() => {
              fallbackCopy(textToCopy, copyBtn);
            });
          } else {
            fallbackCopy(textToCopy, copyBtn);
          }
        });
      }
    });

    function showCopiedFeedback(btn) {
      const origHtml = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 14px; height: 14px;"><polyline points="20 6 9 17 4 12"/></svg>
        <span>已複製定義金句</span>
      `;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = origHtml;
      }, 2200);
    }

    function fallbackCopy(text, btn) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showCopiedFeedback(btn);
      } catch (err) {
        console.error('Copy failed', err);
      }
      document.body.removeChild(ta);
    }
  }

  /* ==========================================================================
     10. Enterprise Lobby Curation Showcase (方案 A：3D 視差與互動熱點)
     ========================================================================== */
  function initShowcaseWindow() {
    const card = document.getElementById('esg-showcase-card');
    const wrap = document.getElementById('esg-showcase-wrap');
    if (!card || !wrap) return;

    // Desktop: Subtle 3D perspective tilt
    if (window.matchMedia('(min-width: 992px)').matches) {
      let isHovered = false;
      card.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 2.2;
        const rotateY = ((x - centerX) / centerX) * 2.2;

        card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    }

    // Hotspot click / touch handler for mobile and accessibility
    const hotspots = card.querySelectorAll('.esg-hotspot');
    hotspots.forEach((hs) => {
      const pin = hs.querySelector('.esg-hotspot-pin');
      if (!pin) return;

      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = hs.classList.contains('is-active');
        hotspots.forEach((other) => other.classList.remove('is-active'));
        if (!isActive) {
          hs.classList.add('is-active');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!card.contains(e.target)) {
        hotspots.forEach((hs) => hs.classList.remove('is-active'));
      }
    });
  }
})();

