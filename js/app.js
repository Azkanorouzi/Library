'use strict'
// Stores elements such as buttons and so on
const APPLICATION = {
  toggleButton: document.querySelector('.toggle-button'),
  sideBar: document.querySelector('aside'),
  module: document.querySelector('.module'),
  plusContainer: document.querySelector('.plus-container'),
  pagesInput: document.querySelector('.pages-input'),
  completedPagesInput: document.querySelector('.completed-pages-input'),
}
// Stores book information before finalization
const BOOK_INFO = {}
// Hamburger menu settings
APPLICATION.toggleButton.addEventListener('click', () => {
  APPLICATION.sideBar.classList.toggle('-translate-x-0')
})
// Plus sign settings
APPLICATION.plusContainer.addEventListener('click', () => {
  console.log('hey')
  APPLICATION.module.classList.remove('module-hidden')
  document.body.classList.add('overflow-hidden')
  // Scrolling to the top of the page
})
// Module close
APPLICATION.module.addEventListener('click', (event) => {
  // If user wants to close the module
  if (event.target.closest('.module-close') === event.target) {
    APPLICATION.module.classList.add('module-hidden')
    document.body.classList.remove('overflow-hidden')
  }
  // If the user wants to add module
  if (event.target.classList.contains('module-add')) {
    console.log('added')
    document.body.classList.remove('overflow-hidden')
  }
})
// Setting max completed pages to the number of book's pages
APPLICATION.pagesInput.addEventListener('blur', () => {
  BOOK_INFO.MaxPages = +APPLICATION.pagesInput.value
  // Don't allowing the number of pages to go less than 10
  if (BOOK_INFO.MaxPages < 10) {
    document.querySelector('.pages-input').value = '10'
    BOOK_INFO.MaxPages = 10
  }
})
APPLICATION.completedPagesInput.addEventListener('blur', () => {
  BOOK_INFO.initialCompletedPages = Number.parseInt(
    APPLICATION.completedPagesInput.value
  )
  console.log(BOOK_INFO.initialCompletedPages)
  if (+BOOK_INFO.initialCompletedPages > +BOOK_INFO.MaxPages) {
    document.querySelector('.completed-pages-input').value = BOOK_INFO.MaxPages
    BOOK_INFO.initialCompletedPages = BOOK_INFO.MaxPages
  }
})
