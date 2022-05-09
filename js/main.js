document.addEventListener("DOMContentLoaded", function () {
  let header = document.querySelector(".header");
  let anchors = document.querySelectorAll(".header a[href*='#']");
  let menuItem = document.querySelectorAll(".nav__link");
  let menuBtn = document.querySelector("#menu");
  let menu = document.querySelector(".nav");

  for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener("click", function () {
      this.closest(".nav").classList.remove("active");
      removeBurger();
    });
  };

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const removeBurger = () => {
    menu.classList.remove("active");
    menuBtn.classList.remove("active");
  }

  const openBurger = () => {
    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");
  }

  function scrolledHeader() {
    if (window.pageYOffset >= header.offsetHeight - 10) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    };
  };

  menuBtn.addEventListener('click', openBurger);
  window.addEventListener('scroll', removeBurger);
  window.addEventListener('scroll', scrolledHeader);

  // Tabs
  let tabBtn = document.querySelectorAll(".tab__item");
  let tabContent = document.querySelectorAll(".tab__content");

  tabBtn.forEach(elem => {
    elem.addEventListener("click", function () {
      showTabContent(elem.dataset.tabindex);
      tabBtn.forEach(elem => {
        elem.classList.remove("tab__item--active");
      });
      this.classList.add("tab__item--active");
    });
  });

  let hideTabContent = () => {
    for (let i = 1; i < tabContent.length; i++) {
      tabContent[i].classList.add("hidden");
    };
  };

  hideTabContent();

  function showTabContent(tabindex) {
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.add("hidden");
    };
    tabContent[tabindex - 1].classList.remove("hidden");
  }

  // Slider
  const swiper = new Swiper(".team__slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
    },
    breakpoints: {
      300: {
        slidesPerView: "auto",
        spaceBetween: 10,
        centeredSlides: true,
      },
      992: {
        spaceBetween: 20,
        centeredSlides: false,
      }
    }
  });

  // Team section
  let teamLinks = document.querySelectorAll(".team__link");
  let popUp = document.querySelector(".team__popup");
  let overlay = document.querySelector(".overlay");
  let btnClose = document.querySelector(".popup__close");

  teamLinks.forEach(link => {

    link.addEventListener("click", function (e) {
      e.preventDefault();

      popUp.classList.add("active");
      overlay.classList.add("active");
      disableScroll();
    });
  });

  btnClose.addEventListener("click", function () {
    popUp.classList.remove("active");
    overlay.classList.remove("active");
    enableScroll();
  });

  const disableScroll = () => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.dataset.scrollY = window.scrollY;
    document.body.style.cssText = `
      position: fixed;
      width: 100%;
      height: 100vh;
      top: ${-window.scrollY}px;
      overflow: hidden;
      padding-right: ${scrollBarWidth}px;
    `;
  };

  const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
      top: document.body.dataset.scrollY
    });
    document.body.dataset.scrollY = '';
  };
});