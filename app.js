// Hamburger menu

let hamburgerBtn = document.getElementById("hamburger_menu");
let menuWrapper = document.getElementById("menu_wrapper");
let closeButton = document.getElementById("close_button");

hamburgerBtn.onclick = function () {
  menuWrapper.style.display = "flex";
};

closeButton.onclick = function () {
  menuWrapper.style.display = "none";
};

// Ticket & Information Section Carousel

let currentIndex = 2;

document.addEventListener("DOMContentLoaded", (e) => {
  slideTicketSlider(currentIndex);
});
window.addEventListener("resize", (e) => {
  slideTicketSlider(currentIndex);
});

let ticketSliderPrevBtn = document.querySelectorAll(
  "#ticketCarousel_btnGroup > button"
)[0];
let ticketSliderNextBtn = document.querySelectorAll(
  "#ticketCarousel_btnGroup > button"
)[1];

let ticketSlideCount = document.querySelectorAll(
  "#ticket_carousel .slide"
).length;

ticketSliderNextBtn.addEventListener("click", function () {
  updateSlideClasses("#ticket_carousel", ++currentIndex);
  toggleSlideButtons(
    "next",
    currentIndex,
    ticketSlideCount,
    ticketSliderPrevBtn,
    this
  );
  slideTicketSlider(currentIndex);
});

ticketSliderPrevBtn.addEventListener("click", function () {
  updateSlideClasses("#ticket_carousel", --currentIndex);
  toggleSlideButtons(
    "previous",
    currentIndex,
    ticketSlideCount,
    this,
    ticketSliderNextBtn
  );
  slideTicketSlider(currentIndex);
});

// PSV Players Section Slider

let playerIndex = 0;

window.addEventListener("resize", (e) => {
  slidePlayerSlider(playerIndex);
});

let playerSliderPrevBtn = document.querySelectorAll(
  "#slider_button_wrapper > button"
)[0];
let playerSliderNextBtn = document.querySelectorAll(
  "#slider_button_wrapper > button"
)[1];

let playerSlideCount = document.querySelectorAll("#team_section .slide").length;

playerSliderNextBtn.addEventListener("click", function () {
  updateSlideClasses("#team_section", ++playerIndex);
  toggleSlideButtons(
    "next",
    playerIndex,
    playerSlideCount,
    playerSliderPrevBtn,
    this
  );
  slidePlayerSlider(playerIndex);
});

playerSliderPrevBtn.addEventListener("click", function () {
  updateSlideClasses("#team_section", --playerIndex);
  toggleSlideButtons(
    "previous",
    playerIndex,
    playerSlideCount,
    this,
    playerSliderNextBtn
  );
  slidePlayerSlider(playerIndex);
});

function updateSlideClasses(sectionName, destinationIndex) {
  document
    .querySelector(`${sectionName} .active-slide`)
    .classList.remove("active-slide");
  if (document.querySelector(`${sectionName} .previous-slide`)) {
    document
      .querySelector(`${sectionName} .previous-slide`)
      .classList.remove("previous-slide");
  }
  if (document.querySelector(`${sectionName} .next-slide`)) {
    document
      .querySelector(`${sectionName} .next-slide`)
      .classList.remove("next-slide");
  }

  document
    .querySelectorAll(`${sectionName} .slide`)
    [destinationIndex].classList.add("active-slide");

  document
    .querySelectorAll(`${sectionName} .slide`)
    [destinationIndex - 1]?.classList.add("previous-slide");

  document
    .querySelectorAll(`${sectionName} .slide`)
    [destinationIndex + 1]?.classList.add("next-slide");
}

function toggleSlideButtons(
  direction,
  currentIndex,
  slideCount,
  prevButton,
  nextButton
) {
  if (direction === "next") {
    if (currentIndex === 1) {
      prevButton.disabled = false;
      prevButton.style.cursor = "pointer";
    } else if (currentIndex === slideCount - 1) {
      nextButton.disabled = true;
      nextButton.style.cursor = "not-allowed";
    }
  } else if (direction === "previous") {
    if (currentIndex === slideCount - 2) {
      nextButton.disabled = false;
      nextButton.style.cursor = "pointer";
    } else if (currentIndex === 0) {
      prevButton.disabled = true;
      prevButton.style.cursor = "not-allowed";
    }
  }
}

function slideTicketSlider(destinationIndex) {
  let windowWidth = document.documentElement.clientWidth;
  let ticketCardWidth =
    document.getElementsByClassName("card-ticket")[0].offsetWidth;

  // 24 is the margin value between the cards
  // There are no special properties for margin to get
  // Fortunately it is fixed in our design
  let slideSize =
    windowWidth / 2 -
    ticketCardWidth / 2 -
    destinationIndex * ticketCardWidth -
    24;

  let ticketCarousel = document.getElementById("ticket_carousel");
  ticketCarousel.style.transform = `translate3d(${slideSize}px, 0px, 0px)`;
}

function slidePlayerSlider(destinationIndex) {
  // debugger;
  let playerWrapperWidth = document.querySelectorAll(
    "#team_section .active-slide"
  )[0].offsetWidth;
  let slideSize = destinationIndex * playerWrapperWidth;
  let slider = document.getElementById("slider_body_wrapper");

  slider.style.transform = `translate3d(${-slideSize}px, 0px, 0px)`;
}
