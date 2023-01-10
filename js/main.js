const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";

const root = document.documentElement;

/*Theme*/
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/*Portfolio*/
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");

/* Modal*/
let openModal = document.querySelectorAll(modalOpen);
let closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

//theme-panel close-open
toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;

  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

searchBox.addEventListener("keyup", (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  portfolioItems.forEach((card) => {
    if (
      card.dataset.item.includes(searchInput) ||
      "all".includes(searchInput)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, ".filter-link");
    const filter = this.dataset.filter;

    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}
//Array of objects 
let portfolioCards = [
  {
    dataItem: "web",
    dataOpen: "web-1",
    source: "./assets/images/portfolio-1.jpg",
    title: "Web Development",
    subTitle: "Food Website",
    paragraphOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    paragraphTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dataItem: "web",
    dataOpen: "web-2",
    source: "./assets/images/portfolio-2.jpg",
    title: "Web Development",
    subTitle: "Skate Website",
    paragraphOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    paragraphTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dataItem: "web",
    dataOpen: "web-3",
    source: "./assets/images/portfolio-3.jpg",
    title: "Web Development",
    subTitle: "Eating Website",
    paragraphOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    paragraphTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dataItem: "ui",
    dataOpen: "ui-1",
    source: "./assets/images/portfolio-4.jpg",
    title: "UI Design",
    subTitle: "Cool Design",
    paragraphOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    paragraphTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dataItem: "app",
    dataOpen: "app-1",
    source: "./assets/images/portfolio-5.jpg",
    title: "App Development",
    subTitle: "Game App",
    paragraphOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    paragraphTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dataItem: "app",
    dataOpen: "app-2",
    source: "./assets/images/portfolio-6.jpg",
    title: "App Development",
    subTitle: "Gambling App",
    paragraphOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    paragraphTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dataItem: "app",
    dataOpen: "app-3",
    source: "./assets/images/portfolio-7.jpg",
    title: "App Development",
    subTitle: "Money Website",
    paragraphOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    paragraphTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    dataItem: "ui",
    dataOpen: "ui-2",
    source: "./assets/images/portfolio-8.jpg",
    title: "UI Design",
    subTitle: "Fantastic Design",
    paragraphOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    paragraphTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
//portfolioCards = array of objects
function createModal(id) {
  let card = portfolioCards.find((card) => {
    return card.dataOpen == id;
  })
  let modal = document.createElement("div");
  let modalDialog = document.createElement("div");
  let header = document.createElement("header");
  let h3 = document.createElement("h3");
  let i = document.createElement("i");
  let modalBody = document.createElement("div");
  let imgWrapper = document.createElement("div");
  let img = document.createElement("img");
  let txtWrapper = document.createElement("div");
  let p = document.createElement("p");
  let bold = document.createElement("strong");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  //Modal
  modal.id = id;
  modal.className = "modal";
  modal.dataset.animation = "slideInOutTop";
  modal.appendChild(modalDialog);
  modalDialog.className = "modal-dialog";
  modalDialog.appendChild(header);
  modalDialog.appendChild(modalBody);
  //Modal Header
  header.className = "modal-header";
  h3.innerText = card.title; //variable
  i.className = "fas fa-times";
  i.dataset.close = "";
  i.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
  header.appendChild(h3);
  header.appendChild(i);
  //Modal Body
  bold.innerText = card.subTitle;
  p.appendChild(bold);
  p2.innerText = card.paragraphOne; //variable
  p3.innerText = card.paragraphTwo; //variable
  txtWrapper.className = "text-wrapper";
  img.src = card.source; //variable
  modalBody.className = "modal-body";
  imgWrapper.className = "img-wrapper";
  modalBody.appendChild(imgWrapper);
  imgWrapper.appendChild(img);
  modalBody.appendChild(txtWrapper);
  txtWrapper.appendChild(p);
  txtWrapper.appendChild(p2);
  txtWrapper.appendChild(p3);

  return modal;
}

//create Portfolio cards
portfolioCards.forEach((card) => {
  const portfolioGrid = document.getElementById("portfolio-grid");
  const portfolioCard = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardImg = document.createElement("img");
  const cardPopUpBox = document.createElement("div");
  const cardPopUpBoxTitle = document.createElement("div");
  const cardPopUpBoxText = document.createElement("h3");

  portfolioCard.className = "portfolio-card";
  cardBody.className = "card-body";
  cardImg.alt = "portfolio-icon";
  cardPopUpBox.className = "card-popup-box";

  portfolioCard.dataset.item = card.dataItem;
  portfolioCard.dataset.open = card.dataOpen;
  cardImg.src = card.source;
  cardPopUpBox.href = card.link;
  cardPopUpBoxTitle.innerText = card.title;
  cardPopUpBoxText.innerText = card.subTitle;

  portfolioGrid.appendChild(portfolioCard);
  portfolioCard.appendChild(cardBody);
  cardBody.appendChild(cardImg);
  cardBody.appendChild(cardPopUpBox);
  cardPopUpBox.appendChild(cardPopUpBoxTitle);
  cardPopUpBox.appendChild(cardPopUpBoxText);
});
//re-query
openModal = document.querySelectorAll(modalOpen);
closeModal = document.querySelectorAll(modalClose);

// Modal/Full Site Modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    console.log(this);
      if(this.classList.contains("portfolio-card")) {
        if (document.querySelector(`.modal`)) {
          document.querySelector(`.modal`).remove();
        }
        const mainSection = document.getElementById("site-wrapper");
        mainSection.appendChild(createModal(modalId));
      }
      document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

// Modal
document.addEventListener("click", (e) => {
  //console.log(e.target, document.querySelector('.modal.is-visible'));
  if (e.target === document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key === "Escape") {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});
