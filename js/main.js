// global object
const JSOB = {};

// sticky header
JSOB.stickyHeader = () => {
  const header = document.getElementById("headerMain");

  // if header is not define, return
  if (!header) return;

  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    header.classList.add("sticky");
    return;
  }

  header.classList.remove("sticky");
};

// splideJS
JSOB.splideJS = (selector = null, options = {}, extensions = {}) => {
  const splides = Array.from(document.querySelectorAll(selector));

  // if there is no splide, return
  if (!splides.length) return;

  const splide = new Splide(selector, { speed: 1000, ...options });

  splide.mount(extensions);

  return splide;
};

// aos Animation
JSOB.initAos = () => {
  // if aos is not define, return
  if (
    typeof AOS === null ||
    typeof AOS === "undefined" ||
    typeof AOS === undefined
  )
    return;
  AOS.init();
};

// count Up
JSOB.countUp = async (
  target,
  options = { enableScrollSpy: true },
  callback = null
) => {
  const elem = document.getElementById(target);

  // if no element define, return
  if (!elem) return;
  const limit = parseFloat(elem.dataset.value);
  if (!limit) return;

  const countUp = new CountUp(target, limit, { ...options });
  if (!countUp.error) {
    if (callback) {
      countUp.start(callback);
    }

    if (!options.enableScrollSpy) {
      countUp.start();
    }
  } else {
    console.error(countUp.error);
  }

  return countUp;
};

// lines
JSOB.lines = (selector = ".line-reveal", speed = 500) => {
  const lines = document.querySelectorAll(selector);

  // if no line define, return
  if (!lines.length) return;

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("show");
    }, index * speed);
  });
};

// handle modal video
JSOB.videoModal = () => {
  modal = document.getElementById("videoPlayerModal");

  modal.addEventListener("hide.bs.modal", () => {
    const iframe = modal.querySelector("iframe");
    const src = iframe.getAttribute("src");

    iframe.setAttribute("src", "");
    iframe.setAttribute("src", src);
  });
};

// typewriter
JSOB.createTypeWriter = function (selector, data = [], once = false) {
  // get the element
  const textFields = Array.from(document.querySelectorAll(selector));

  if (!(textFields.length && data.length)) return;

  // make a words array
  const words = [...data];

  textFields.forEach(function (text) {
    // start typing effect
    setTyper(text, words);
  });

  function setTyper(element, words) {
    const LETTER_TYPE_DELAY = 100;
    const WORD_STAY_DELAY = 2000;

    const DIRECTION_FORWARDS = 0;
    const DIRECTION_BACKWARDS = 1;

    var direction = DIRECTION_FORWARDS;
    var wordIndex = 0;
    var letterIndex = 0;

    var wordTypeInterval;

    startTyping();

    function startTyping() {
      wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
    }

    function typeLetter() {
      const word = words[wordIndex];

      if (direction == DIRECTION_FORWARDS) {
        letterIndex++;

        if (letterIndex == word.length) {
          direction = DIRECTION_BACKWARDS;
          clearInterval(wordTypeInterval);
          setTimeout(startTyping, WORD_STAY_DELAY);
        }
      } else if (direction == DIRECTION_BACKWARDS) {
        if (!once) {
          letterIndex--;

          if (letterIndex == 0) {
            nextWord();
          }
        }
      }

      const textToType = word.substring(0, letterIndex);

      element.textContent = textToType;
    }

    function nextWord() {
      letterIndex = 0;
      direction = DIRECTION_FORWARDS;
      wordIndex++;

      if (wordIndex == words.length) {
        wordIndex = 0;
      }
    }
  }
};


// document on load
document.addEventListener("DOMContentLoaded", () => {
  JSOB.initAos();
  JSOB.stickyHeader();
  JSOB.splideJS();
  JSOB.splideJS("#StockSplide", {
    type: "loop",
    pagination: false,
    autoplay: true,
    speed: 750,
    gap: 20,
    perPage: 5,
    perMove: 1,
    breakpoints: {
      1199: {
        perPage: 4,
      },
      991: {
        perPage: 3,
        gap: 16,
      },
      767: {
        perPage: 2,
      },
      575: {
        gap: 12,
      },
    },
  });
  JSOB.countUp("monthlyEA");
  JSOB.countUp("monthlyClients");
  JSOB.countUp("recoredUptime");
  JSOB.lines();
  JSOB.splideJS("#eduPricinPlanSplide", {
    type: "loop",
    pagination: false,
    speed: 1200,
    perPage: 1,
    perMove: 1,
    focus: "center",
    updateOnMove: true,
    breakpoints: {
      449: {
        perPage: 1,
      },
    },
  });
  JSOB.splideJS("#tradingPricinPlanSplide", {
    type: "loop",
    pagination: false,
    speed: 1200,
    perPage: 3,
    perMove: 1,
    focus: "center",
    updateOnMove: true,
    gap: "4rem",
    breakpoints: {
      991: {
        gap: "2.5rem",
        
      },
      767: {
        gap: 0,
        perPage: 2,
      },
      449: {
        perPage: 2,
      },
    },
  });
  JSOB.splideJS("#testimonialSplide", {
    type: "loop",
    arrows: false,
    direction: "ttb",
    clones: 0,
    heightRatio: 0.65,
    paginationDirection: "ltr",
    updateOnMove: true,
    drag: false,
    pagination: true,
    breakpoints: {
      575: {
        heightRatio: 0.75,
      },
      449: {
        heightRatio: 0.9,
      },
    },
  });
  JSOB.splideJS("#resultSplide", {
    type: "loop",
    pagination: false,
  });
  JSOB.videoModal();
  JSOB.createTypeWriter(
    ".typing-text",
    ["Affordable Trading Solutions For People On The Go!"],
    true
  );
});

// document on scroll
document.addEventListener("scroll", () => {
  JSOB.stickyHeader();
});

// alert modal
JSOB.controlAlert = function () {
  const modalElem = document.getElementById("#alertModal");
  const options = {};
  const alertModal = new bootstrap.Modal("#alertModal", options);
  alertModal.show(modalElem);
};
JSOB.controlAlert();

$(document).ready(function() {
	$('.popup-youtube').magnificPopup({
    type: 'iframe'
  });
  $(document).ready(function() {
    $('.techer_content_area').owlCarousel({
        loop:true,
        nav:false,
        items:1,
        margin:0,
        dots:true,
        smartSpeed: 300,
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:1,
            },
            1000:{
                items:1,
            }
        }
    })
});
});
