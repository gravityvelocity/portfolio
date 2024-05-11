document.addEventListener('DOMContentLoaded', () => {
    const iconBoxes = document.querySelectorAll(".icon-box");
    const closeBtns = document.querySelectorAll(".close-btn");
    const maximizeBtns = document.querySelectorAll(".maximize-btn");
    const body = document.querySelector("body");
  
    iconBoxes.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
        body.classList.add("prevent-background-scroll");
      });
    });
  
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".popup");
        modal.style.display = "none";
        body.classList.remove("prevent-background-scroll");
        const iconBoxContainers = document.querySelectorAll(".icon-container");
        iconBoxContainers.forEach(container => container.style.display = "flex");
      });
    });
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) {
        e.target.style.display = "none";
        body.classList.remove("prevent-background-scroll");
      }
    });
  
    maximizeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".popup");
        const container = modal.querySelector(".popup-container");
        const modalBody = modal.querySelector(".popup-body");
        const isMaximized = modal.classList.contains("maximized");
  
        container.style.width = isMaximized ? "min(900px, 90%)" : "100%";
        container.style.top = isMaximized ? "45%" : "50%";
        modalBody.style.height = isMaximized ? "70vh" : "90vh";
  
        modal.classList.toggle("maximized");
        body.classList.toggle("prevent-scroll");
      });
    });
  
    const swiper = new Swiper(".swiper", {
      preventClicks: true,
      noSwiping: true,
      freeMode: false,
      spaceBetween: 10,
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
      mousewheel: {
        invert: false,
        thresholdDelta: 50,
        sensitivity: 1,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        680: { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
        1600: { slidesPerView: 4 },
      },
    });
  
    // GSAP Slide Animation
    const slideDuration = 0.5; // Duration of the slide animation in seconds
  
    document.querySelector('.next').addEventListener('click', () => {
      slideTo('next', swiper, slideDuration);
    });
  
    document.querySelector('.prev').addEventListener('click', () => {
      slideTo('prev', swiper, slideDuration);
    });
  
    function slideTo(direction, swiper, duration) {
      const currentSlide = swiper.activeIndex;
      const targetSlide = direction === 'next' ? currentSlide + 1 : currentSlide - 1;
  
      if ((direction === 'next' && targetSlide < swiper.slides.length) || (direction === 'prev' && targetSlide >= 0)) {
        const slideOutPercent = direction === 'next' ? -100 : 100;
        const slideInPercent = -slideOutPercent;
  
        gsap.to(swiper.slides[currentSlide], { xPercent: slideOutPercent, duration: duration });
        swiper.slideTo(targetSlide);
        gsap.fromTo(swiper.slides[targetSlide], { xPercent: slideInPercent }, { xPercent: 0, duration: duration });
      }
    }
  });
  