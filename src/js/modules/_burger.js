const burgerBtn = document.querySelector('#burger')
const popupMenu = document.querySelector('#popup-menu')
const popupMenuBtn = document.querySelector('.popup-menu__close-btn')

burgerBtn.onclick = (e) => {
  popupMenu.classList.add('popup-menu--open')
  document.body.style.overflow = "hidden";
  document.body.style.height = "100%";

  popupMenuBtn.addEventListener('click', () => {
    popupMenu.classList.remove('popup-menu--open')
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }, {once: true})
}