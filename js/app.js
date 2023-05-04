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
let newBookInfo = {}
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
  newBookInfo.MaxPages = +APPLICATION.pagesInput.value
  // Don't allowing the number of pages to go less than 10
  if (newBookInfo.MaxPages < 10) {
    document.querySelector('.pages-input').value = '10'
    newBookInfo.MaxPages = 10
  }
})
APPLICATION.completedPagesInput.addEventListener('blur', () => {
  newBookInfo.initialCompletedPages = Number.parseInt(
    APPLICATION.completedPagesInput.value
  )
  console.log(newBookInfo.initialCompletedPages)
  // In case user enters a number that's greater than specified max-pages of the book
  if (+newBookInfo.initialCompletedPages > +newBookInfo.MaxPages) {
    document.querySelector('.completed-pages-input').value =
      newBookInfo.MaxPages
    newBookInfo.initialCompletedPages = newBookInfo.MaxPages
  }
  // In case user enters a number that's less than 0 or includes none-numerical characters
  if (
    Number.isNaN(newBookInfo.initialCompletedPages) ||
    +newBookInfo.initialCompletedPages < 0
  ) {
    document.querySelector('.completed-pages-input').value = 0
    newBookInfo.initialCompletedPages = 0
  }
})
APPLICATION.imageUrlInput.addEventListener('blur', () => {
  console.log(APPLICATION.imageUrlInput)
  newBookInfo.imageUrl = APPLICATION.imageUrlInput.value.trim()
  // adds https:// if http:// or https:// is omitted
  if (
    !newBookInfo.imageUrl.startsWith('https://') &&
    !newBookInfo.imageUrl.startsWith('http://') &&
    newBookInfo.imageUrl
  ) {
    const fixedUrl = 'https://' + newBookInfo.imageUrl
    document.querySelector('.image-url-input').value = fixedUrl
    newBookInfo.imageUrl = fixedUrl
  }
})
// Module add button
APPLICATION.moduleAddButton.addEventListener('click', (e) => {
  newBookInfo.title = APPLICATION.titleInput.value || 'Untitled'
  newBookInfo.name = APPLICATION.nameInput.value || 'Unknown'
  if (HELPER_FUNCTIONS.isValidBook(newBookInfo)) {
    APPLICATION.module.classList.add('module-hidden')
    APPLICATION.newBookForm.reset()
    BOOKS.push({ ...newBookInfo })
    newBookInfo = {}
  }
})
function Book(title, author, pages, completedPages, imageUrl) {
  this.title = title
  this.author = author
  this.pages = pages
  this.completedPages = completedPages
  this.imageUrl = imageUrl
}
// Returns current number of books
Book.getCurrentNumber = function () {
  return BOOKS.length
}
// Returns current number of finished books
Book.getCurrentFinishedNumber = function () {
  return BOOKS.filter((book) => book.completedPages === book.pages).length
}
// Returns current number of finished books
Book.getCurrentPages = function () {
  return BOOKS.filter((book) => book.completedPages === book.pages).length
}
// Returns total number of finished pages
Book.getCurrentFinishedPages = function () {
  return BOOKS.reduce((sum, book) => {
    sum += book.
    return sum
  }, 0)
}
// Returns total number of finished pages
Book.getCurrentFinishedNumber = function () {
  return BOOKS.reduce((sum, book) => {
    sum += book.completedPages
    return sum
  }, 0)
}
// Adds one completed page
Book.prototype.addCompletedPage = function () {
  this.completedPages++
  return this
}
// Subtract one completed page
Book.prototype.subtractCompletedPage = function () {
  this.completedPages--
  return this
}
// Modifies book's information
Book.prototype.edit = function (property, newValue) {
  this[property] = newValue
  return this
}
// Set the current completedPages to the number of a certain book's pages, indicating that the book is now finished
Book.prototype.done = function () {
  this.completedPages = this.pages
  return this
}
