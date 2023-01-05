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
let portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");

/* Modal*/
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

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

// full Site Modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.classList.remove(isVisible);
  });
}

let portfolioCards = [
  {
    dataItem: "web",
    source: "./assets/images/portfolio-1.jpg",
    link: "#",
    title: "Web Development",
    subTitle: "Food Website",
  },
  {
    dataItem: "web",
    source: "./assets/images/portfolio-2.jpg",
    link: "#",
    title: "Web Development",
    subTitle: "Skate Website",
  },
  {
    dataItem: "web",
    source: "./assets/images/portfolio-3.jpg",
    link: "#",
    title: "Web Development",
    subTitle: "Eating Website",
  },
  {
    dataItem: "ui",
    source: "./assets/images/portfolio-4.jpg",
    link: "#",
    title: "UI Design",
    subTitle: "Cool Design",
  },
  {
    dataItem: "app",
    source: "./assets/images/portfolio-5.jpg",
    link: "#",
    title: "App Development",
    subTitle: "Game App",
  },
  {
    dataItem: "app",
    source: "./assets/images/portfolio-6.jpg",
    link: "#",
    title: "App Development",
    subTitle: "Gambling App",
  },
  {
    dataItem: "app",
    source: "./assets/images/portfolio-7.jpg",
    link: "#",
    title: "App Development",
    subTitle: "Money Website",
  },
  {
    dataItem: "ui",
    source: "./assets/images/portfolio-8.jpg",
    link: "#",
    title: "UI Design",
    subTitle: "Fantastic Design",
  },
];

portfolioCards.forEach((card) => {
  const portfolioGrid = document.getElementById("portfolio-grid");
  const portfolioCard = document.createElement("div");
  portfolioCard.className = "portfolio-card";
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const cardImg = document.createElement("img");
  cardImg.alt = "portfolio-icon";
  const cardLink = document.createElement("a");
  cardLink.className = "card-popup-box";
  const cardLinkTitle = document.createElement("div");
  const cardLinkText = document.createElement("h3");

  console.log(card.dataItem);
  portfolioCard.dataset.item = card.dataItem;
  cardImg.src = card.source;
  cardLink.href = card.link;
  cardLinkTitle.innerText = card.title;
  cardLinkText.innerText = card.subTitle;

  portfolioGrid.appendChild(portfolioCard);
  portfolioCard.appendChild(cardBody);
  cardBody.appendChild(cardImg);
  cardBody.appendChild(cardLink);
  cardLink.appendChild(cardLinkTitle);
  cardLink.appendChild(cardLinkText);
});

portfolioItems = document.querySelectorAll(portfolioData);
