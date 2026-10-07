// ==========================================================================
// SAMVAYA HIGH-CONVERTING VIRAL FUNNEL ENGINE
// 1. VSL (Video Sales Letter) Player
// 2. Scarcity Countdown Loop
// 3. Case Study & Blueprint Lightbox Modal
// 4. Interactive Audio Showroom (120ms Voice AI Player & Real-time Transcript)
// 5. Interactive ROI & SDR Replacement Pipeline Calculator
// 6. The Founders Growth Vault & Gamified Viral Referral Loop
// 7. Objection-Busting FAQ Accordion
// 8. Live Social Proof Micro-Toast Notification Stream
// 9. Exit-Intent VIP Lead Magnet Modal
// 10. Sticky Floating Conversion Dock
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------------------
  // 1. VSL (VIDEO SALES LETTER) PLAYER INTERACTION
  // ------------------------------------------------------------------------
  const vslVideo = document.getElementById("vslVideo");
  const vslOverlay = document.getElementById("vslOverlay");
  const vslPlayBtn = document.getElementById("vslPlayBtn");

  if (vslVideo && vslOverlay) {
    const startVSL = () => {
      vslOverlay.classList.add("is-playing");
      vslVideo.controls = true;
      vslVideo.play().catch((err) => {
        console.warn("Autoplay with sound requires user gesture:", err);
      });
    };

    vslOverlay.addEventListener("click", startVSL);
    if (vslPlayBtn) {
      vslPlayBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        startVSL();
      });
    }

    vslVideo.addEventListener("ended", () => {
      vslOverlay.classList.remove("is-playing");
    });
  }

  // ------------------------------------------------------------------------
  // 2. DYNAMIC SCARCITY COUNTDOWN TIMER (15-Minute Urgency Loop)
  // ------------------------------------------------------------------------
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    let timeLeft = 14 * 60 + 52; // 14 mins 52 secs
    const timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        countdownEl.textContent = "DOORS CLOSING";
        return;
      }
      timeLeft--;
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      countdownEl.textContent = `${mins}m : ${secs < 10 ? '0' : ''}${secs}s`;
    }, 1000);
  }

  // ------------------------------------------------------------------------
  // 3. CASE STUDY & BLUEPRINT LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const lightboxModal = document.getElementById("lightboxModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalCtaBtn = document.getElementById("modalCtaBtn");

  const openLightbox = (imgSrc, title) => {
    if (!lightboxModal || !modalImage) return;
    modalImage.src = imgSrc;
    if (modalTitle && title) {
      modalTitle.textContent = title;
    }
    lightboxModal.classList.add("is-active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("is-active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (modalImage) modalImage.src = "";
  };

  const inspectElements = document.querySelectorAll("[data-full-img]");
  inspectElements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const imgSrc = el.getAttribute("data-full-img");
      const title = el.getAttribute("data-title") || "Case Study Blueprint";
      if (imgSrc) {
        openLightbox(imgSrc, title);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeLightbox);
  if (modalCtaBtn) {
    modalCtaBtn.addEventListener("click", () => {
      closeLightbox();
      const bookingSection = document.getElementById("booking");
      if (bookingSection) bookingSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightboxModal && lightboxModal.classList.contains("is-active")) closeLightbox();
      const exitModal = document.getElementById("exitModal");
      if (exitModal && exitModal.classList.contains("is-active")) exitModal.classList.remove("is-active");
    }
  });

  // ------------------------------------------------------------------------
  // 4. INTERACTIVE AUDIO SHOWROOM (120ms VOICE AI PLAYER & REAL-TIME TRANSCRIPT)
  // ------------------------------------------------------------------------
  const audioScenarios = [
    {
      id: 0,
      badge: "Scenario 01: Inbound Lead Instant Callback",
      latency: "118ms",
      duration: 26,
      turns: [
        { speaker: "ai", text: "Hi Marcus, this is Maya calling from Samvaya. I saw you just requested our B2B pipeline teardown 20 seconds ago. Caught you at an okay time?", start: 0, end: 7 },
        { speaker: "lead", text: "Oh wow, that was ridiculously fast! Yeah, I literally just clicked submit.", start: 7, end: 11 },
        { speaker: "ai", text: "Fast is what we do! We replace 4-hour manual SDR delays with 10-second callbacks. Are you looking to scale outbound cold calling, or speed up inbound qualification?", start: 11, end: 18 },
        { speaker: "lead", text: "Mainly outbound cold outreach. We have 5 SDRs right now.", start: 18, end: 22 },
        { speaker: "ai", text: "Got it. Our voice agents handle up to 10,000 dials concurrently with human turn-taking. Let's stress-test it live on your personal phone.", start: 22, end: 26 }
      ]
    },
    {
      id: 1,
      badge: 'Scenario 02: "Send Me An Email" Objection Handling',
      latency: "124ms",
      duration: 24,
      turns: [
        { speaker: "lead", text: "Look, I'm heading into a meeting right now, can you just send me an email with the info?", start: 0, end: 5 },
        { speaker: "ai", text: "I completely respect your time Marcus. That's actually why I called—takes just 30 seconds to confirm if this even fits before cluttering your inbox.", start: 5, end: 12 },
        { speaker: "lead", text: "Fair enough. What do you need to know?", start: 12, end: 15 },
        { speaker: "ai", text: "Simple: are your sales reps currently spending more than 2 hours a day manually dialing voicemails and gatekeepers?", start: 15, end: 20 },
        { speaker: "lead", text: "Honestly, yeah, at least 3 hours easily.", start: 20, end: 24 }
      ]
    },
    {
      id: 2,
      badge: "Scenario 03: Mid-Sentence Interruption & Natural Pivot",
      latency: "112ms",
      duration: 25,
      turns: [
        { speaker: "ai", text: "With our automated BYOC carrier setup, you can connect your existing Twilio or Exotel phone lines seamlessly...", start: 0, end: 6 },
        { speaker: "lead", text: "Wait, hold on a second—is this a real person or an AI voice?", start: 6, end: 10 },
        { speaker: "ai", text: "Haha, fair question! I'm Samvaya's voice intelligence agent. But notice how naturally I paused and answered you without any robotic delay?", start: 10, end: 17 },
        { speaker: "lead", text: "That is insane... I literally thought you were a sales rep calling from Sydney.", start: 17, end: 21 },
        { speaker: "ai", text: "That's why our clients see 21x higher booking rates. Prospects stay engaged instead of hanging up.", start: 21, end: 25 }
      ]
    },
    {
      id: 3,
      badge: "Scenario 04: Live Calendar Meeting Lock-In",
      latency: "120ms",
      duration: 25,
      turns: [
        { speaker: "ai", text: "Based on your 4,000 monthly lead volume, Samvaya will save your team roughly $13,500 in monthly SDR payroll.", start: 0, end: 7 },
        { speaker: "lead", text: "That would be huge for our margins. What's the next step to test this?", start: 7, end: 12 },
        { speaker: "ai", text: "I have our enterprise solutions architect open this Thursday at 2:30 PM or Friday at 11:00 AM. Which works better for your calendar?", start: 12, end: 19 },
        { speaker: "lead", text: "Thursday at 2:30 PM works great.", start: 19, end: 22 },
        { speaker: "ai", text: "Locked in! I've sent the Google Meet invite to your inbox. Looking forward to speaking on Thursday!", start: 22, end: 25 }
      ]
    }
  ];

  let currentScenarioIndex = 0;
  let isPlayingAudio = false;
  let playbackSeconds = 0;
  let playbackSpeed = 1.0;
  let audioTimer = null;
  let audioCtx = null;
  let animFrameId = null;

  const audioPlayBtn = document.getElementById("audioPlayBtn");
  const audioPlayIcon = document.getElementById("audioPlayIcon");
  const scrubberFill = document.getElementById("scrubberFill");
  const audioScrubber = document.getElementById("audioScrubber");
  const audioCurrentTime = document.getElementById("audioCurrentTime");
  const audioTotalDuration = document.getElementById("audioTotalDuration");
  const transcriptScrollArea = document.getElementById("transcriptScrollArea");
  const currentScenarioBadge = document.getElementById("currentScenarioBadge");
  const waveformCanvas = document.getElementById("waveformCanvas");
  const canvasCtx = waveformCanvas ? waveformCanvas.getContext("2d") : null;

  // Render Transcript for Scenario
  const renderTranscript = (scenario) => {
    if (!transcriptScrollArea) return;
    transcriptScrollArea.innerHTML = "";
    scenario.turns.forEach((turn, idx) => {
      const turnDiv = document.createElement("div");
      turnDiv.className = "transcript-turn";
      turnDiv.setAttribute("data-turn-idx", idx);
      turnDiv.innerHTML = `
        <span class="speaker-pill ${turn.speaker === 'ai' ? 'speaker-ai' : 'speaker-lead'}">
          ${turn.speaker === 'ai' ? 'Samvaya AI' : 'Prospect'}
        </span>
        <span class="turn-text">${turn.text}</span>
      `;
      transcriptScrollArea.appendChild(turnDiv);
    });
  };

  // Update Highlight based on playback time
  const updateTranscriptHighlight = (scenario, currentTime) => {
    const turns = scenario.turns;
    const turnElements = transcriptScrollArea ? transcriptScrollArea.querySelectorAll(".transcript-turn") : [];
    turnElements.forEach((el, idx) => {
      const turn = turns[idx];
      if (turn && currentTime >= turn.start && currentTime < turn.end) {
        if (!el.classList.contains("is-active")) {
          el.classList.add("is-active");
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } else {
        el.classList.remove("is-active");
      }
    });
  };

  // Canvas Waveform Animation
  const drawWaveform = () => {
    if (!canvasCtx || !waveformCanvas) return;
    const width = waveformCanvas.width;
    const height = waveformCanvas.height;
    canvasCtx.clearRect(0, 0, width, height);

    const barCount = 42;
    const barWidth = 6;
    const spacing = (width - (barCount * barWidth)) / (barCount - 1);

    for (let i = 0; i < barCount; i++) {
      let barHeight;
      if (isPlayingAudio) {
        const timeFactor = Date.now() * 0.005;
        const wave1 = Math.sin(i * 0.35 + timeFactor);
        const wave2 = Math.cos(i * 0.2 - timeFactor * 1.5);
        barHeight = Math.abs(wave1 * wave2) * (height * 0.75) + 8;
      } else {
        barHeight = 6 + Math.sin(i * 0.4) * 3;
      }

      const x = i * (barWidth + spacing);
      const y = (height - barHeight) / 2;

      // Cal.com clean monochrome waveform
      const grad = canvasCtx.createLinearGradient(0, y, 0, y + barHeight);
      grad.addColorStop(0, "#111111");
      grad.addColorStop(1, "#374151");

      canvasCtx.fillStyle = isPlayingAudio ? grad : "#e5e7eb";
      canvasCtx.beginPath();
      canvasCtx.roundRect(x, y, barWidth, barHeight, 3);
      canvasCtx.fill();
    }

    animFrameId = requestAnimationFrame(drawWaveform);
  };

  // Play synthetic tone burst / voice simulation with Web Audio API
  const playVoicePulse = (freq = 420) => {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      // AudioContext not available or blocked; animation continues gracefully
    }
  };

  const formatSecs = (s) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const setScenario = (index) => {
    pauseAudio();
    currentScenarioIndex = index;
    playbackSeconds = 0;
    const scenario = audioScenarios[index];
    
    // Update badge & tags
    if (currentScenarioBadge) {
      currentScenarioBadge.innerHTML = `<i data-lucide="zap"></i><span>${scenario.badge}</span>`;
      if (window.lucide) lucide.createIcons();
    }
    const latencyTag = document.querySelector(".player-latency-tag");
    if (latencyTag) latencyTag.innerHTML = `Turn-Taking: <strong>${scenario.latency}</strong>`;

    if (audioCurrentTime) audioCurrentTime.textContent = "00:00";
    if (audioTotalDuration) audioTotalDuration.textContent = formatSecs(scenario.duration);
    if (scrubberFill) scrubberFill.style.width = "0%";

    // Update Tab UI
    document.querySelectorAll(".scenario-btn").forEach((btn, idx) => {
      btn.classList.toggle("is-active", idx === index);
    });

    renderTranscript(scenario);
  };

  const playAudio = () => {
    isPlayingAudio = true;
    if (audioPlayBtn) {
      audioPlayBtn.innerHTML = '<i data-lucide="pause"></i>';
      if (window.lucide) lucide.createIcons();
    }

    const scenario = audioScenarios[currentScenarioIndex];
    clearInterval(audioTimer);

    // Speak active turn using SpeechSynthesis if supported
    const triggerSpeech = () => {
      if ('speechSynthesis' in window && !window.speechSynthesis.speaking) {
        const currentTurn = scenario.turns.find(t => playbackSeconds >= t.start && playbackSeconds < t.end);
        if (currentTurn) {
          const utterance = new SpeechSynthesisUtterance(currentTurn.text);
          utterance.rate = playbackSpeed * (currentTurn.speaker === 'ai' ? 1.05 : 0.98);
          utterance.pitch = currentTurn.speaker === 'ai' ? 1.05 : 0.95;
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    audioTimer = setInterval(() => {
      playbackSeconds += 0.25 * playbackSpeed;
      if (playbackSeconds >= scenario.duration) {
        pauseAudio();
        playbackSeconds = 0;
        if (scrubberFill) scrubberFill.style.width = "0%";
        if (audioCurrentTime) audioCurrentTime.textContent = "00:00";
        return;
      }

      const percent = (playbackSeconds / scenario.duration) * 100;
      if (scrubberFill) scrubberFill.style.width = `${percent}%`;
      if (audioCurrentTime) audioCurrentTime.textContent = formatSecs(playbackSeconds);

      updateTranscriptHighlight(scenario, playbackSeconds);

      // Subtle periodic frequency pulse
      if (Math.random() < 0.2) {
        playVoicePulse(360 + Math.random() * 200);
      }
    }, 250);
  };

  const pauseAudio = () => {
    isPlayingAudio = false;
    clearInterval(audioTimer);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioPlayBtn) {
      audioPlayBtn.innerHTML = '<i data-lucide="play"></i>';
      if (window.lucide) lucide.createIcons();
    }
  };

  if (audioPlayBtn) {
    audioPlayBtn.addEventListener("click", () => {
      if (isPlayingAudio) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  // Scrubber click to seek
  if (audioScrubber) {
    audioScrubber.addEventListener("click", (e) => {
      const rect = audioScrubber.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const scenario = audioScenarios[currentScenarioIndex];
      playbackSeconds = pct * scenario.duration;
      if (scrubberFill) scrubberFill.style.width = `${pct * 100}%`;
      if (audioCurrentTime) audioCurrentTime.textContent = formatSecs(playbackSeconds);
      updateTranscriptHighlight(scenario, playbackSeconds);
    });
  }

  // Speed selector
  document.querySelectorAll(".speed-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("is-active"));
      this.classList.add("is-active");
      playbackSpeed = parseFloat(this.getAttribute("data-speed")) || 1.0;
    });
  });

  // Scenario Buttons
  document.querySelectorAll(".scenario-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const scIdx = parseInt(this.getAttribute("data-scenario"), 10) || 0;
      setScenario(scIdx);
    });
  });

  // Init Audio Showroom
  setScenario(0);
  drawWaveform();

  // ------------------------------------------------------------------------
  // 5. INTERACTIVE ROI & SDR COST CALCULATOR
  // ------------------------------------------------------------------------
  const leadSlider = document.getElementById("leadSlider");
  const sdrSlider = document.getElementById("sdrSlider");
  const costSlider = document.getElementById("costSlider");

  const leadValueBadge = document.getElementById("leadValueBadge");
  const sdrValueBadge = document.getElementById("sdrValueBadge");
  const costValueBadge = document.getElementById("costValueBadge");

  const resMonthlySavings = document.getElementById("resMonthlySavings");
  const resAnnualSavings = document.getElementById("resAnnualSavings");
  const resExtraDemos = document.getElementById("resExtraDemos");
  const resPipelineValue = document.getElementById("resPipelineValue");
  const roiMultiplierText = document.getElementById("roiMultiplierText");

  const updateCalculator = () => {
    if (!leadSlider || !sdrSlider || !costSlider) return;

    const leads = parseInt(leadSlider.value, 10);
    const sdrs = parseInt(sdrSlider.value, 10);
    const sdrCost = parseInt(costSlider.value, 10);

    // Update Slider Badges
    if (leadValueBadge) leadValueBadge.textContent = `${leads.toLocaleString()} Leads`;
    if (sdrValueBadge) sdrValueBadge.textContent = `${sdrs} ${sdrs === 1 ? 'SDR' : 'SDRs'}`;
    if (costValueBadge) costValueBadge.textContent = `$${sdrCost.toLocaleString()} / mo`;

    // Calculations
    const monthlySdrPayroll = sdrs * sdrCost;
    // Samvaya cost is roughly ~15-18% of human SDR equivalent, saving 82%
    const monthlySaved = Math.round(monthlySdrPayroll * 0.82);
    const annualSaved = monthlySaved * 12;

    // Inbound & Outbound Demos booked (Sub-10s response lifts conversion by +4.3% of total leads)
    const extraDemos = Math.max(12, Math.round(leads * 0.043));
    // Assuming $2,000 avg pipeline deal size
    const pipelineValue = extraDemos * 2000;
    
    // ROI multiplier
    const estimatedCost = Math.round(monthlySdrPayroll * 0.18);
    const roiMultiplier = (pipelineValue / Math.max(1, estimatedCost)).toFixed(1);

    if (resMonthlySavings) resMonthlySavings.textContent = `$${monthlySaved.toLocaleString()}`;
    if (resAnnualSavings) resAnnualSavings.textContent = `$${annualSaved.toLocaleString()}`;
    if (resExtraDemos) resExtraDemos.textContent = `+${extraDemos.toLocaleString()} Demos`;
    if (resPipelineValue) resPipelineValue.textContent = `$${pipelineValue.toLocaleString()}+`;
    if (roiMultiplierText) roiMultiplierText.textContent = `${roiMultiplier}x ROI`;
  };

  if (leadSlider) leadSlider.addEventListener("input", updateCalculator);
  if (sdrSlider) sdrSlider.addEventListener("input", updateCalculator);
  if (costSlider) costSlider.addEventListener("input", updateCalculator);
  updateCalculator();

  // ------------------------------------------------------------------------
  // 6. THE FOUNDERS GROWTH VAULT & VIRAL REFERRAL ENGINE
  // ------------------------------------------------------------------------
  const refLinkInput = document.getElementById("refLinkInput");
  const btnCopyRef = document.getElementById("btnCopyRef");
  const copyBtnText = document.getElementById("copyBtnText");
  const copyIcon = document.getElementById("copyIcon");
  const refCounterText = document.getElementById("refCounterText");
  const vaultProgressFill = document.getElementById("vaultProgressFill");
  const btnSimulateShare = document.getElementById("btnSimulateShare");
  const btnUnlockMilestone1 = document.getElementById("btnUnlockMilestone1");
  const milestone2Card = document.getElementById("milestone2Card");
  const milestone2Tag = document.getElementById("milestone2Tag");

  // Generate deterministic or stored unique referral code
  let refCode = localStorage.getItem("samvaya_ref_code");
  if (!refCode) {
    refCode = "FOUNDER-" + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem("samvaya_ref_code", refCode);
  }
  const refUrl = `https://samvaya.in/?ref=${refCode}`;
  if (refLinkInput) refLinkInput.value = refUrl;

  // Social Share intent links
  const shareWhatsapp = document.getElementById("shareWhatsapp");
  const shareLinkedin = document.getElementById("shareLinkedin");
  const shareX = document.getElementById("shareX");

  const shareMessage = `Found this 120ms AI Voice Agent system for B2B sales (dials 10k leads with zero SDR lag): ${refUrl}`;
  if (shareWhatsapp) shareWhatsapp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  if (shareLinkedin) shareLinkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(refUrl)}`;
  if (shareX) shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent("Replacing manual SDR prospecting with 120ms AI Voice Agents. Check out the architecture:")}&url=${encodeURIComponent(refUrl)}`;

  // Copy referral link
  if (btnCopyRef) {
    btnCopyRef.addEventListener("click", () => {
      if (refLinkInput) {
        refLinkInput.select();
        navigator.clipboard.writeText(refLinkInput.value).then(() => {
          if (copyBtnText) copyBtnText.textContent = "Copied!";
          if (btnCopyRef) btnCopyRef.style.backgroundColor = "#b8fa00";
          setTimeout(() => {
            if (copyBtnText) copyBtnText.textContent = "Copy Link";
            if (btnCopyRef) btnCopyRef.style.backgroundColor = "";
          }, 2000);
        });
      }
    });
  }

  // Gamified Referral Unlock Simulator
  let simulatedReferrals = parseInt(localStorage.getItem("samvaya_sim_refs") || "0", 10);

  const updateVaultProgress = () => {
    if (refCounterText) refCounterText.textContent = `${simulatedReferrals} of 3 Unlocked`;
    const pct = Math.min(100, Math.max(15, (simulatedReferrals / 3) * 100));
    if (vaultProgressFill) vaultProgressFill.style.width = `${pct}%`;

    if (simulatedReferrals >= 1) {
      const m1 = document.getElementById("milestone1Card");
      if (m1) m1.classList.add("is-unlocked");
    }
    if (simulatedReferrals >= 3) {
      if (milestone2Card) milestone2Card.classList.add("is-unlocked");
      if (milestone2Tag) {
        milestone2Tag.className = "milestone-badge-tag tag-available";
        milestone2Tag.innerHTML = '<i data-lucide="unlock"></i><span>Milestone 2 Unlocked!</span>';
        if (window.lucide) lucide.createIcons();
      }
    }
  };
  updateVaultProgress();

  if (btnSimulateShare) {
    btnSimulateShare.addEventListener("click", () => {
      simulatedReferrals = (simulatedReferrals + 1) % 4;
      localStorage.setItem("samvaya_sim_refs", simulatedReferrals);
      updateVaultProgress();
      if (simulatedReferrals === 1) {
        alert("🎉 Milestone 1 Unlocked! You've unlocked The 2026 Voice AI Cold Calling Swipe File!");
      } else if (simulatedReferrals === 3) {
        alert("🏆 Milestone 2 Unlocked! You've unlocked VIP Deployment Priority & Free Carrier Setup ($1,500 Value)!");
      }
    });
  }

  if (btnUnlockMilestone1) {
    btnUnlockMilestone1.addEventListener("click", () => {
      alert("✅ Access Granted! Your 45-Page Voice AI Cold Calling & Objection Handling Swipe File (PDF) is ready for download. Our team will also review it during your live stress-test demo.");
      const booking = document.getElementById("booking");
      if (booking) booking.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ------------------------------------------------------------------------
  // 7. OBJECTION-BUSTING FAQ ACCORDION
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        faqItems.forEach(i => i.classList.remove("is-open"));
        if (!isOpen) {
          item.classList.add("is-open");
        }
      });
    }
  });

  // ------------------------------------------------------------------------
  // 8. LIVE SOCIAL PROOF MICRO-TOAST STREAM
  // ------------------------------------------------------------------------
  const socialToastCard = document.getElementById("socialToastCard");
  const toastMessage = document.getElementById("toastMessage");
  const toastTime = document.getElementById("toastTime");
  const toastCloseBtn = document.getElementById("toastCloseBtn");

  const toastNotifications = [
    { title: "VP of Sales in Singapore booked Live Voice Demo", time: "2 minutes ago" },
    { title: "B2B SaaS Founder in San Francisco dialed 850 leads in 3 mins", time: "8 minutes ago" },
    { title: "Enterprise Sales Director in Mumbai deployed 120ms Voice Agent", time: "14 minutes ago" },
    { title: "Growth Lead in Austin scheduled BYOC Telephony Integration Audit", time: "21 minutes ago" },
    { title: "FinTech VP in London unlocked the 2026 Voice AI Swipe File", time: "33 minutes ago" }
  ];

  let toastIdx = 0;
  let toastInterval = null;

  const showNextToast = () => {
    if (!socialToastCard || !toastMessage || !toastTime) return;
    const item = toastNotifications[toastIdx];
    toastMessage.textContent = item.title;
    toastTime.textContent = item.time;

    socialToastCard.classList.add("is-visible");

    setTimeout(() => {
      socialToastCard.classList.remove("is-visible");
    }, 5500);

    toastIdx = (toastIdx + 1) % toastNotifications.length;
  };

  // Trigger first toast after 3 seconds, then cycle every 12 seconds
  setTimeout(() => {
    showNextToast();
    toastInterval = setInterval(showNextToast, 12000);
  }, 3000);

  if (toastCloseBtn) {
    toastCloseBtn.addEventListener("click", () => {
      if (socialToastCard) socialToastCard.classList.remove("is-visible");
      clearInterval(toastInterval);
    });
  }

  // ------------------------------------------------------------------------
  // 9. EXIT-INTENT / VIP FAST-TRACK LEAD MAGNET MODAL
  // ------------------------------------------------------------------------
  const exitModal = document.getElementById("exitModal");
  const exitModalClose = document.getElementById("exitModalClose");
  const btnExitDownload = document.getElementById("btnExitDownload");
  const exitEmailInput = document.getElementById("exitEmailInput");
  const exitBookInstead = document.getElementById("exitBookInstead");

  let exitShown = sessionStorage.getItem("samvaya_exit_shown");

  const openExitModal = () => {
    if (exitShown || !exitModal) return;
    exitModal.classList.add("is-active");
    exitModal.setAttribute("aria-hidden", "false");
    exitShown = true;
    sessionStorage.setItem("samvaya_exit_shown", "true");
  };

  const closeExitModal = () => {
    if (!exitModal) return;
    exitModal.classList.remove("is-active");
    exitModal.setAttribute("aria-hidden", "true");
  };

  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 15) {
      openExitModal();
    }
  });

  if (exitModalClose) exitModalClose.addEventListener("click", closeExitModal);
  if (exitBookInstead) {
    exitBookInstead.addEventListener("click", () => {
      closeExitModal();
    });
  }

  if (btnExitDownload) {
    btnExitDownload.addEventListener("click", () => {
      const email = exitEmailInput ? exitEmailInput.value.trim() : "";
      if (!email || !email.includes("@")) {
        alert("Please enter a valid work email address.");
        return;
      }
      btnExitDownload.textContent = "Unlocked! Opening Swipe File...";
      setTimeout(() => {
        closeExitModal();
        alert(`✅ Success! The 2026 AI Voice Architecture Pack has been dispatched to ${email}. You can also test the system live right now on your phone!`);
        const booking = document.getElementById("booking");
        if (booking) booking.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    });
  }

  if (exitModal) {
    exitModal.addEventListener("click", (e) => {
      if (e.target === exitModal) closeExitModal();
    });
  }

  // ------------------------------------------------------------------------
  // 10. STICKY FLOATING CONVERSION DOCK
  // ------------------------------------------------------------------------
  const stickyDock = document.getElementById("stickyDock");
  const bookingSection = document.getElementById("booking");

  window.addEventListener("scroll", () => {
    if (!stickyDock) return;
    const scrollY = window.scrollY || window.pageYOffset;
    const bookingRect = bookingSection ? bookingSection.getBoundingClientRect() : null;

    // Show when scrolled past 500px, but hide when inside booking section
    const inBooking = bookingRect && (bookingRect.top < window.innerHeight && bookingRect.bottom > 100);

    if (scrollY > 500 && !inBooking) {
      stickyDock.classList.add("is-revealed");
    } else {
      stickyDock.classList.remove("is-revealed");
    }
  });

  // ------------------------------------------------------------------------
  // 11. SMOOTH SCROLL ANCHORS WITH ATTENTION HIGHLIGHT
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
          
          if (targetId === "#booking") {
            const calCard = document.querySelector(".cal-card");
            if (calCard) {
              calCard.style.boxShadow = "0 0 50px rgba(162, 222, 0, 0.5)";
              setTimeout(() => {
                calCard.style.boxShadow = "";
              }, 1800);
            }
          }
        }
      }
    });
  });

  // Re-run Lucide icon generator for newly injected icons
  if (window.lucide) {
    lucide.createIcons();
  }

});
