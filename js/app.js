'use strict'
// Stores elements such as buttons and so on
const APPLICATION = {
  toggleButton: document.querySelector('.toggle-button'),
  sideBar: document.querySelector('aside'),
  module: document.querySelector('.module'),
  plusContainer: document.querySelector('.plus-container'),
  newBookForm: document.querySelector('.new-book-form'),
  nameInput: document.querySelector('.name-input'),
  titleInput: document.querySelector('.title-input'),
  pagesInput: document.querySelector('.pages-input'),
  completedPagesInput: document.querySelector('.completed-pages-input'),
  imageUrlInput: document.querySelector('.image-url-input'),
  moduleAddButton: document.querySelector('.module-add'),
}
const HELPER_FUNCTIONS = {
  isValidBook(bookInfo) {
    return Object.keys(bookInfo).length === 5
  },
}
// Stores book information before finalization
const NEW_BOOK_INFO = {}
// Stores all book's information
const BOOKS = []
// Hamburger menu settings
APPLICATION.toggleButton.addEventListener('click', () => {
  document.querySelector('aside').classList.toggle('-translate-x-full')
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
    document.body.classList.remove('overflow-hidden')
  }
})
// Setting max completed pages to the number of book's pages
APPLICATION.pagesInput.addEventListener('blur', () => {
  NEW_BOOK_INFO.MaxPages = +APPLICATION.pagesInput.value
  // Don't allowing the number of pages to go less than 10
  if (NEW_BOOK_INFO.MaxPages < 10) {
    document.querySelector('.pages-input').value = '10'
    NEW_BOOK_INFO.MaxPages = 10
  }
})
APPLICATION.completedPagesInput.addEventListener('blur', () => {
  NEW_BOOK_INFO.initialCompletedPages = Number.parseInt(
    APPLICATION.completedPagesInput.value
  )
  console.log(NEW_BOOK_INFO.initialCompletedPages)
  // In case user enters a number that's greater than specified max-pages of the book
  if (+NEW_BOOK_INFO.initialCompletedPages > +NEW_BOOK_INFO.MaxPages) {
    document.querySelector('.completed-pages-input').value =
      NEW_BOOK_INFO.MaxPages
    NEW_BOOK_INFO.initialCompletedPages = NEW_BOOK_INFO.MaxPages
  }
  // In case user enters a number that's less than 0 or includes none-numerical characters
  if (
    Number.isNaN(NEW_BOOK_INFO.initialCompletedPages) ||
    +NEW_BOOK_INFO.initialCompletedPages < 0
  ) {
    document.querySelector('.completed-pages-input').value = 0
    NEW_BOOK_INFO.initialCompletedPages = 0
  }
})
APPLICATION.imageUrlInput.addEventListener('blur', () => {
  console.log(APPLICATION.imageUrlInput)
  NEW_BOOK_INFO.imageUrl = APPLICATION.imageUrlInput.value.trim()
  // adds https:// if http:// or https:// is omitted
  if (
    !NEW_BOOK_INFO.imageUrl.startsWith('https://') &&
    !NEW_BOOK_INFO.imageUrl.startsWith('http://') &&
    NEW_BOOK_INFO.imageUrl
  ) {
    const fixedUrl = 'https://' + BOOK_INFO.imageUrl
    document.querySelector('.image-url-input').value = fixedUrl
    NEW_BOOK_INFO.imageUrl = fixedUrl
  }
})
// Module add button
APPLICATION.moduleAddButton.addEventListener('click', (e) => {
  NEW_BOOK_INFO.title = APPLICATION.titleInput.value || 'Untitled'
  NEW_BOOK_INFO.name = APPLICATION.nameInput.value || 'Unknown'
  if (HELPER_FUNCTIONS.isValidBook(NEW_BOOK_INFO)) {
    APPLICATION.module.classList.add('module-hidden')
    APPLICATION.newBookForm.reset()
  }
})

// New book constructor function
