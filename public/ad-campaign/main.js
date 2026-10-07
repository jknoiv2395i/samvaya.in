// ==========================================================================
// HIGH-CONVERTING FUNNEL INTERACTION ENGINE
// 1. VSL Video Controller & Sound Toggle
// 2. Smooth Scrolling to Booking
// 3. Dynamic Booking Calendar & Time Slot Picker
// 4. Form Submission & Confirmation
// 5. FAQ Accordion Toggle
// 6. Mobile Notice Dismissal
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------------------
  // 1. VSL VIDEO CONTROLLER & AUDIO TOGGLE
  // ------------------------------------------------------------------------
  const vslWrapper = document.getElementById("vslWrapper");
  const vslVideo = document.getElementById("vslVideo");
  const vslPlayTrigger = document.getElementById("vslPlayTrigger");
  const vslMuteBtn = document.getElementById("vslMuteBtn");

  if (vslVideo && vslPlayTrigger) {
    const playVideo = () => {
      if (vslWrapper) vslWrapper.classList.add("is-playing");
      vslVideo.controls = true;
      vslVideo.play().catch(e => console.log("Autoplay blocked:", e));
    };

    vslPlayTrigger.addEventListener("click", playVideo);
    
    if (vslMuteBtn) {
      vslMuteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        vslVideo.muted = false;
        playVideo();
        vslMuteBtn.style.display = "none";
      });
    }

    vslVideo.addEventListener("ended", () => {
      if (vslWrapper) vslWrapper.classList.remove("is-playing");
      vslVideo.controls = false;
    });
  }

  // ------------------------------------------------------------------------
  // 2. SMOOTH SCROLLING TO BOOKING
  // ------------------------------------------------------------------------
  document.querySelectorAll(".scroll-to-booking").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("booking");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        const firstInput = document.getElementById("firstName");
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 600);
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 3. DYNAMIC INTERACTIVE BOOKING CALENDAR
  // ------------------------------------------------------------------------
  const daysGrid = document.getElementById("calendarDaysGrid");
  const selectedDateText = document.getElementById("selectedDateText");
  const calMonthTitle = document.getElementById("calMonthTitle");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const now = new Date();
  let currentYear = now.getFullYear() || 2026;
  let currentMonth = now.getMonth(); // 0-indexed

  const renderCalendar = (month, year) => {
    if (!daysGrid) return;
    daysGrid.innerHTML = "";
    if (calMonthTitle) {
      calMonthTitle.textContent = `${months[month]} ${year}`;
    }

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Previous month padding
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "cal-day-cell disabled";
      daysGrid.appendChild(emptyCell);
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("button");
      dayCell.type = "button";
      dayCell.className = "cal-day-cell";
      dayCell.textContent = day;

      const dateObj = new Date(year, month, day);
      const dayOfWeek = dateObj.getDay();

      // Disable Sundays (0)
      if (dayOfWeek === 0) {
        dayCell.classList.add("disabled");
        dayCell.disabled = true;
      } else {
        // Select day 8 or today by default
        if (day === 8 || (day === now.getDate() && month === now.getMonth())) {
          dayCell.classList.add("selected");
        }

        dayCell.addEventListener("click", () => {
          document.querySelectorAll(".cal-day-cell.selected").forEach(c => c.classList.remove("selected"));
          dayCell.classList.add("selected");
          const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
          const monthShort = months[month].substring(0, 3);
          if (selectedDateText) {
            selectedDateText.textContent = `${dayName}, ${monthShort} ${day}`;
          }
        });
      }

      daysGrid.appendChild(dayCell);
    }
  };

  renderCalendar(currentMonth, currentYear);

  const prevBtn = document.getElementById("calPrevBtn");
  const nextBtn = document.getElementById("calNextBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
    });
  }

  // Time slot selection
  window.selectTimeSlot = (btn, time) => {
    document.querySelectorAll(".time-slot-btn.selected").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  };

  // Form continue handler
  window.handleBookingContinue = () => {
    const email = document.getElementById("workEmail")?.value;
    const name = document.getElementById("firstName")?.value;
    if (!name || !email) {
      alert("Please enter your name and work email.");
      return;
    }
    
    const calStep = document.getElementById("bookingCalendarStep");
    if (calStep) {
      calStep.scrollIntoView({ behavior: "smooth", block: "nearest" });
      calStep.style.borderColor = "var(--color-purple-primary)";
      setTimeout(() => {
        calStep.style.borderColor = "#e2e8f0";
      }, 1200);
    }
  };

  // Confirm booking handler
  window.confirmBooking = () => {
    const firstName = document.getElementById("firstName")?.value || "there";
    const selectedDate = document.getElementById("selectedDateText")?.textContent || "Upcoming Date";
    const selectedSlot = document.querySelector(".time-slot-btn.selected")?.textContent || "11:30 AM";

    alert(`🎉 Success, ${firstName}! Your strategy call is confirmed for ${selectedDate} at ${selectedSlot}.\n\nA calendar invitation and preparation link has been dispatched to your email.`);
  };

  // ------------------------------------------------------------------------
  // 4. FAQ ACCORDION TOGGLE
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq-card-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".faq-card-header");
    if (header) {
      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        item.classList.toggle("is-open", !isOpen);
        header.setAttribute("aria-expanded", !isOpen);
      });
    }
  });

  // ------------------------------------------------------------------------
  // 5. MOBILE NOTICE BAR DISMISSAL
  // ------------------------------------------------------------------------
  const mobileCloseBtn = document.getElementById("mobileCloseNotice");
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", () => {
      const bar = document.querySelector(".top-scarcity-bar");
      if (bar) bar.style.display = "none";
    });
  }

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

});
