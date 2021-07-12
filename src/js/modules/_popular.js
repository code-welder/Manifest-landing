$(document).ready(function() {
  const popularList = $('.popular__list').masonry({
    itemSelector: '.popular__item',
    isFitWidth: true,
    gutter: 30,
  })

  popularList.imagesLoaded().progress( function() {
    popularList.masonry('layout')
  })

  let popularShowNum = 6

  if ($(window).width() < 770) {
    popularShowNum = 4
  }

  $('.popular__item').slice(0, popularShowNum).show()

  $('.popular__btn-load-more').click( function() {
    $('.popular__item:hidden').slice(0, popularShowNum).show()
    popularList.masonry('layout')
  })
})