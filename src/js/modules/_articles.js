$(document).ready(function() {
  const articlesList = $('.articles__list').masonry({
    itemSelector: '.articles__item',
    isFitWidth: true,
    gutter: 40,
  })

  articlesList.imagesLoaded().progress( function() {
    articlesList.masonry('layout')
  })

  let articlesShowNum = 6

  if ($(window).width() < 770) {
    articlesShowNum = 4
  }

  $('.articles__item').slice(0, articlesShowNum).show()

  $('.articles__btn-load-more ').click( function() {
    $('.articles__item:hidden').slice(0, articlesShowNum).show()
    articlesList.masonry('layout')
  })
})