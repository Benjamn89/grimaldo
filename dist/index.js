let counter = 0;

const initialClick = () => {
  polygonDisable();
  counter--;
  if (counter < 0) {
    counter = 2;
  }
  if (counter > 2) {
    counter = 0;
  }
  removeViewLeft();
  enterViewRight();
  changeOnlyDomNav();
  setTimeout(() => {
    polygonDisable();
    removeClasses();
  }, 700);
};

const initialClick2 = () => {
  polygonDisable();
  counter++;
  if (counter < 0) {
    counter = 2;
  }
  if (counter > 2) {
    counter = 0;
  }
  removeViewRight();
  enterViewLeft();
  changeOnlyDomNav();
  setTimeout(() => {
    polygonDisable();
    removeClasses();
  }, 700);
};

document
  .querySelector(".carrousel-polygon")
  .addEventListener("click", initialClick);
document
  .querySelector(".carrousel-polygon2")
  .addEventListener("click", initialClick2);

const enterViewRight = () => {
  document
    .querySelectorAll(".global-section")
    [counter].classList.add("section-in-right");
};
const enterViewLeft = () => {
  document
    .querySelectorAll(".global-section")
    [counter].classList.add("section-in-left");
};

const removeViewLeft = () => {
  const removeLeftEl = document.querySelector(".section-in-left");
  const removeRightEl = document.querySelector(".section-in-right");
  if (removeLeftEl) {
    removeLeftEl.classList.add("section-out-left");
  }
  if (removeRightEl) {
    removeRightEl.classList.add("section-out-left");
  }
};

const removeViewRight = () => {
  const removeLeftEl = document.querySelector(".section-in-left");
  const removeRightEl = document.querySelector(".section-in-right");
  if (removeLeftEl) {
    removeLeftEl.classList.add("section-out-right");
  }
  if (removeRightEl) {
    removeRightEl.classList.add("section-out-right");
  }
};

removeClasses = () => {
  const removeLeftEl = document.querySelector(".section-out-left");
  const removeRightEl = document.querySelector(".section-out-right");
  if (removeLeftEl) {
    removeLeftEl.classList.remove("section-in-right");
    removeLeftEl.classList.remove("section-in-left");
    removeLeftEl.classList.remove("section-out-left");
  }
  if (removeRightEl) {
    removeRightEl.classList.remove("section-in-right");
    removeRightEl.classList.remove("section-in-left");
    removeRightEl.classList.remove("section-out-right");
  }
};

// Taking care the nav classes
const changeViewFromNav = (e) => {
  const index = parseInt(e.target.getAttribute("index"));
  if (index === counter) {
    return null;
  }
  counter = index;
  if (index > counter) {
    removeViewLeft();
    enterViewRight();
  } else {
    removeViewRight();
    enterViewLeft();
  }
  setTimeout(() => {
    removeClasses();
  }, 700);
  if (e.target.classList.contains("phone-section-selector")) {
    chnagePhoneDiv();
  } else {
    changeOnlyDomNav();
  }
};

const chnagePhoneDiv = () => {
  document.querySelector(".phone-on").classList.remove("phone-on");
  document
    .querySelectorAll(".phone-section-selector")
    [counter].classList.add("phone-on");
};

const changeOnlyDomNav = () => {
  document.querySelector(".logo-p-on").classList.remove("logo-p-on");
  document.querySelectorAll(".logo-p")[counter].classList.add("logo-p-on");
};

for (var i = 0; i < 3; i++) {
  document
    .querySelectorAll(".logo-p")
    [i].addEventListener("click", changeViewFromNav);
  document
    .querySelectorAll(".phone-section-selector")
    [i].addEventListener("click", changeViewFromNav);
}

// Disable the carrousel buttons
const polygonDisable = () => {
  document
    .querySelector(".carrousel-polygon")
    .classList.toggle("carrousel-polygon-off");
  document
    .querySelector(".carrousel-polygon2")
    .classList.toggle("carrousel-polygon-off");
};

// Contact me button
document
  .querySelector(".header-btn-div")
  .addEventListener("click", changeViewFromNav);

const focusInput = (e) => {
  try {
    let className = e.target.parentNode.children[1].className;
    document
      .querySelector(`.${className}`)
      .classList.toggle("contact-input-span-on");
  } catch {
    console.log("focusinput err");
  }
};

const focusOut = (e) => {
  if (e.target.value.length < 1) {
    const className = e.target.parentNode.children[1].className.split(" ")[0];
    document
      .querySelector(`.${className}`)
      .classList.toggle("contact-input-span-on");
  }
};

const checkEmail = (e) => {
  const val = e.target.value;
  const el = document.querySelector(".contact-input-input2");
  if (val.length > 6 && val.includes("@")) {
    let validate = val.split("@")[1];
    if (validate.length > 3) {
      try {
        el.classList.remove("contact-input-red-line");
      } catch {
        console.log("remove class err");
      }
    } else {
      el.classList.add("contact-input-red-line");
    }
  } else {
    el.classList.add("contact-input-red-line");
  }
};

const typeOnInput = (e) => {
  let eT = e.target;
  getAtt = eT.getAttribute("index");
  if (eT.classList.contains("contact-input-red-line") && getAtt !== "1") {
    if (getAtt === "0" && eT.value.length > 2) {
      eT.classList.remove("contact-input-red-line");
    }
    if (getAtt === "2" && eT.value.length > 6) {
      e.target.classList.remove("contact-input-red-line");
    }
  }
};

for (var i = 0; i < 3; i++) {
  document
    .querySelectorAll(".input-global")
    [i].addEventListener("focus", focusInput);
  document
    .querySelectorAll(".input-global")
    [i].addEventListener("focusout", focusOut);
  document
    .querySelectorAll(".input-global")
    [i].addEventListener("input", typeOnInput);
}

document
  .querySelector(".contact-input-input2")
  .addEventListener("focusout", checkEmail);

// Send msg click
const sendMsg = () => {
  let inputs = document.querySelectorAll(".input-global");
  let checkInputs = 0;
  if (inputs[0].value.length > 2) {
    checkInputs++;
  } else {
    inputs[0].classList.add("contact-input-red-line");
  }
  if (
    inputs[1].value.length > 2 &&
    !inputs[1].classList.contains("contact-input-red-line")
  ) {
    checkInputs++;
  } else {
    inputs[1].classList.add("contact-input-red-line");
  }
  if (inputs[2].value.length > 6) {
    checkInputs++;
  } else {
    inputs[2].classList.add("contact-input-red-line");
  }
  if (checkInputs === 3) {
    console.log("Send the email");
    document
      .querySelector(".contact-ellipse")
      .classList.add("contact-ellipse-off");
    document
      .querySelector(".contact-spinner")
      .classList.add("contact-spinner-on");
    setTimeout(() => {
      document
        .querySelector(".contact-spinner")
        .classList.remove("contact-spinner-on");
      document
        .querySelector(".contact-ellipse")
        .classList.remove("contact-ellipse-off");
      setTimeout(() => {
        document
          .querySelector(".arrow-contact")
          .classList.add("arrow-contact-off");
        document.querySelector(".contact-vi").classList.add("contact-vi-on");
        document
          .querySelector(".contact-input-div-wrapper")
          .classList.add("contact-input-div-wrapper-off");
        document
          .querySelector(".contact-msg-sent")
          .classList.add("contact-msg-sent-on");
      }, 500);
    }, 1500);
  }
};

document.querySelector(".contact-ellipse").addEventListener("click", sendMsg);
