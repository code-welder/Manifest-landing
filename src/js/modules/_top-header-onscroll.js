'use strict'

const topHeader = document.querySelector('.header__top')
const headerBottom = document.querySelector('.header__bottom')

headerBottom.style.marginTop = window.getComputedStyle(topHeader).height

window.addEventListener('scroll', () => {
  if (window.pageYOffset <= 50) {
    topHeader.classList.remove('header__top--onscroll')
  } else {
    topHeader.classList.add('header__top--onscroll')
  }
});
