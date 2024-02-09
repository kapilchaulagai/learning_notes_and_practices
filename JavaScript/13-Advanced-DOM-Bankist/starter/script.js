'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Creating and inserting a DOM Element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics, <button class = "btn btn--close-cookie"> Got it! </button>';

//To insert as first child of header element (part of header)
//header.prepend(message);

//To insert as first child of header element (part of header) by cloning the same element without removing existing
//header.prepend(message.cloneNode(true));

//To insert as first child of header element (part of header)
header.append(message);

//To insert before the header as a sibling of header element (not a part of header)
//header.before(message);

//To insert after the header as a sibling of header element (not a part of header)
//header.after(message);

//Delete Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();

    //old method
    //message.parentElement.removeChild(message);
  });

//Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

//console.log(message.style.height); //null
//console.log(message.style.backgroundColor); //has some value because we updated inline in the code during runtime
//console.log(getComputedStyle(message).color); //get values from css file for the given element

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(getComputedStyle(message).height);

//for the css styles under root: , we can access with document key
//document.documentElement.style.setProperty('--color-primary', 'orange');

//Scroll functionality
//Select Elements from the HTML file
const scrollBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//Add EventLitener
scrollBtn.addEventListener('click', function (e) {
  //old way
  const s1cords = section1.getBoundingClientRect();
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );

  window.scrollTo({
    left: s1cords.left + window.pageXOffset,
    top: s1cords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  //new way that is mostly used for the latest browsers
  //section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation
//First, select all the navigation buttons on navigation bar and add an event on each button as below
/*document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    //prevent from excuting default behaviour of the nav buttons
    e.preventDefault();

    //get the value in href attribute which is nothing but id for the section to be navigated to
    const id = this.getAttribute('href');

    //scroll into the section
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});*/

//Event Delegation Steps
/* 
1. Add Event Listener to common parent element
2.  Determine what element originated the event
*/
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching the strategy where we'll check the existence of the clicked element in the parent eventListener
  if (e.target.classList.contains('nav__link')) {
    //get the value in href attribute which is nothing but id for the section to be navigated to
    const id = e.target.getAttribute('href');

    //scroll into the section
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//DOM Travesrsing
const h1 = document.querySelector('h1');

/*//Going downwards: Chidren
console.log(h1.querySelectorAll('.highlight')); //returns nodeList as direct children
//Less used
console.log(h1.childNodes); //returns all the child elements like: text, comment, span, br as nodeList
//Mostly used
console.log(h1.children); //returns the child elements like: span, br as HTMLElementList
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';*/

/*//Going upwards: Parent
//Less used
console.log(h1.parentNode); //returns the parent element
//Mostly used
console.log(h1.parentElement); //returns the parent element
//h1.parentElement.style.color = 'white';
//h1.parentNode.style.color = 'orange';
//closest also refers to the parent Element
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';*/

/*//Going sideways: Siblings
//In javascript we can access only the immediate siblings (previous and next one) and returns HTMLElement
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
//Similar to nodes(not Element)
console.log(h1.previousSibling);
console.log(h1.nextSibling);
//Let's get all the siblings that returns HTMLCollection
console.log(h1.parentElement.children);
*/

//Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//Event Delegation
tabsContainer.addEventListener('click', e => {
  e.preventDefault();

  //Get exact clicked tab
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //Remove active from other inactive tabs
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  //Remove active from other inactive contents
  tabsContent.forEach(tabContent => {
    tabContent.classList.remove('operations__content--active');
  });

  //Activate the tab
  clicked.classList.add('operations__tab--active');

  //Active the content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//MouseHover Events with arguments
const nav = document.querySelector('.nav');

//Function to handle hover in-out event
const handleHover = function (e) {
  //console.log(e, this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//mouseEnter event doesn't buuble so we are using mouseover
//Passing argument into handler
nav.addEventListener(
  'mouseover' /*function (e) {
  //Use common function handleHover : handleHover(e, 0.5);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
}*/,
  //Alternative way
  handleHover.bind(0.5)
);

nav.addEventListener(
  'mouseout' /*function (e) {
  //Use common function handleHover : handleHover(e, 1);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
}*/,
  //Alternative way
  handleHover.bind(1)
);

//IntersectionObserver
const navHeight = nav.getBoundingClientRect().height;

//create a function to make observer do what we want while observing
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

//create Intersection Observer with name headerObserver
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

//call and tell headerObserver to observe
headerObserver.observe(header);

//Revealing Sections on scrolling
const allSections = document.querySelectorAll('.section');

const revealSections = function (entries, observer) {
  const [entry] = entries;

  //Guard clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  //Stop from observing once work is done
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);

  //First add section--hidden in all sections to hide it until we don't reveal in the code here
  section.classList.add('section--hidden');
});

//Lazy Loading images
//Selects all the img having tag "data-src"
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //Add event listener to remove blur filter only when high-res images are finish loading
  entry.target.addEventListener('load', e => {
    entry.target.classList.remove('lazy-img');
  });

  //stop observer once work is done
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.1,
  rootMargin: '500px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

//Slider Component - Part1 (On Left-Right Button)
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;
const maxSlides = slides.length;

const goToSlide = function (curSlide) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
  });
};

//initially
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlides - 1) currentSlide = 0;
  else currentSlide++;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlides - 1;
  else currentSlide--;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

//Slider Component - Part2 (On Left-Right Arrow Keyboard-Key)
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();

  //Short-circuting example
  e.key === 'ArrowRight' && nextSlide();
});

//Slide on-click dots
//Create dots
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  //Remove Active from all dots
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

dotContainer.addEventListener('click', e => {
  if (!e.target.classList.contains('dots__dot')) return;

  //alternate of this e.target.dataset.slide
  const { slide } = e.target.dataset; //destructuring
  goToSlide(slide);

  //Activate corresponding dot
  activateDot(slide);
});
