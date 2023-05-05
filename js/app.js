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
  moduleAddButton: document.querySelector('.module-add'),
  gridContainer: document.querySelector('.grid-container'),
  domBooks: document.querySelectorAll('.dom-book'),
}
const HELPER_FUNCTIONS = {
  isValidBook(bookInfo) {
    return Object.keys(bookInfo).length === 4
  },
}
// Stores book information before finalization
let newBookInfo = {}
// Stores all book's information
let BOOKS = []
// rendering books that are stored in localStorage
window.addEventListener('load', function () {
  if (localStorage) {
    BOOKS = JSON.parse(this.localStorage.getItem('booksHistory'))
    BOOKS.forEach((book) => renderDomBook(createDomBook(book)))
    console.log(BOOKS)
    changeBookInformation()
  }
})
// Local storage
// saving the BOOKS object inside localStorage each time user closes the tab
window.addEventListener('beforeunload', function () {
  if (localStorage) {
    localStorage.setItem('booksHistory', JSON.stringify(BOOKS))
  }
})

// Hamburger menu settings
APPLICATION.toggleButton.addEventListener('click', () => {
  document.querySelector('aside').classList.toggle('-translate-x-full')
})
// Plus sign settings
APPLICATION.plusContainer.addEventListener('click', () => {
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
  newBookInfo.maxPages = +APPLICATION.pagesInput.value
  // Don't allowing the number of pages to go less than 10
  if (newBookInfo.maxPages < 10) {
    document.querySelector('.pages-input').value = '10'
    newBookInfo.maxPages = 10
  }
})
APPLICATION.completedPagesInput.addEventListener('blur', () => {
  newBookInfo.initialCompletedPages = Number.parseInt(
    APPLICATION.completedPagesInput.value
  )
  console.log(newBookInfo.initialCompletedPages)
  // In case user enters a number that's greater than specified max-pages of the book
  if (+newBookInfo.initialCompletedPages > +newBookInfo.maxPages) {
    document.querySelector('.completed-pages-input').value =
      newBookInfo.maxPages
    newBookInfo.initialCompletedPages = newBookInfo.maxPages
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
// Module add button
APPLICATION.moduleAddButton.addEventListener('click', (e) => {
  newBookInfo.title = APPLICATION.titleInput.value || 'Untitled'
  newBookInfo.name = APPLICATION.nameInput.value || 'Unknown'
  if (HELPER_FUNCTIONS.isValidBook(newBookInfo)) {
    APPLICATION.module.classList.add('module-hidden')
    APPLICATION.newBookForm.reset()
    const newBook = new Book(
      newBookInfo.title,
      newBookInfo.name,
      newBookInfo.maxPages,
      newBookInfo.initialCompletedPages
    )
    renderDomBook(createDomBook(newBook))
    BOOKS.push(newBook)
    changeBookInformation()
    newBookInfo = {}
    if (localStorage) {
      localStorage.setItem('booksHistory', JSON.stringify(BOOKS))
    }
  }
  console.log(BOOKS)
})
function Book(title, author, pages, completedPages) {
  this.title = title
  this.author = author
  this.pages = pages
  this.completedPages = completedPages
  // This will prevent equivalent ids
  let randomNumber =
    Math.trunc(Math.random() * (9999999 - 1000000 + 1)) + 1000000
  while (BOOKS.find((book) => book.id === randomNumber)) {
    randomNumber = Math.trunc(Math.random() * (9999999 - 1000000 + 1)) + 1000000
  }
  this.id = randomNumber
}
// Returns current number of books
Book.getCurrentNumber = function () {
  return BOOKS.length
}
// Returns current number of finished books
Book.getCurrentFinishedNumber = function () {
  return BOOKS.filter((book) => book.completedPages === book.pages).length
}
// Returns total number of pages
Book.getCurrentPages = function () {
  return BOOKS.reduce((sum, book) => {
    sum += book.pages
    return sum
  }, 0)
}
// Returns total number of finished pages
Book.getCurrentFinishedPages = function () {
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
// Returns a new book with the given properties from user
function createDomBook(book) {
  book.rendered = true
  return `<article
  class="grid-item bg-slate-800 text-white relative overflow-hidden border-2 border-orange-600 flex justify-center items-center dom-book fadeIn"
  data-id="${book.id} "
>
  <div
    class="absolute top-0 left-0 right-0 p-2 flex justify-between text-xl bg-slate-700 bg-opacity-90 border-b-4 border-orange-600"
  >
    <button class="text-right close-button" type="button">❌</button>
  </div>
  <div class="book-info text-center">
    <h1 class="text-2xl book-title">${book.title}</h1>
    <p>By <span class="author">${book.author}</span></p>
    <p class="text-xl text-orange-600">
      <span class="completed-page">${book.completedPages}</span> /
      <span class="pages">${book.pages}</span>
    </p>
  </div>
  <div
    class="w-full absolute bottom-0 left-0 right-0 z-10 bg-orange-600 flex"
  >
    <button class="flex-1 p-2 bg-blue-900 subtract-button" type="button">-</button>
    <button class="flex-1 p-2 bg-orange-400 add-button" type="button">+</button>
    <button class="flex-1 p-2 bg-orange-900 done" type="button">DONE</button>
  </div>
</article>`
}
function renderDomBook(domBook) {
  APPLICATION.gridContainer.insertAdjacentHTML('afterbegin', domBook)
  APPLICATION.domBooks = document.querySelectorAll('.dom-book')
  listenToDomBook(APPLICATION.domBooks[0])
}
// Handles click events of all the domBooks
function listenToDomBook(domBook) {
  domBook.addEventListener('click', (e) => {
    const bookId = e.target.closest('.dom-book').dataset.id
    const book = BOOKS.find((b) => +b.id === +bookId)
    // When user clicks on close button
    if (e.target.classList.contains('close-button') && book) {
      BOOKS.splice(BOOKS.indexOf(book), 1)
      domBook.remove()
      changeBookInformation()
    }
    // When user clicks on add button
    if (e.target.classList.contains('add-button') && book) {
      book.completedPages += book.completedPages < book.pages ? 1 : 0
      domBook.querySelector('.completed-page').textContent = book.completedPages
      changeBookInformation()
    }
    // When user clicks on add button
    if (e.target.classList.contains('subtract-button') && book) {
      console.log('subtract')
      book.completedPages -= book.completedPages > 0 ? 1 : 0
      domBook.querySelector('.completed-page').textContent = book.completedPages
      changeBookInformation()
    }
    if (e.target.classList.contains('done') && book) {
      console.log('done')
      book.completedPages = book.pages
      domBook.querySelector('.completed-page').textContent = book.completedPages
      changeBookInformation()
    }
  })
}
function changeBookInformation() {
  document.querySelector('.number-of-books').textContent =
    Book.getCurrentNumber()
  document.querySelector('.number-of-completed-books').textContent =
    Book.getCurrentFinishedNumber()
  document.querySelector('.number-of-total-pages').textContent =
    Book.getCurrentPages()
  document.querySelector('.number-of-completed-pages').textContent =
    Book.getCurrentFinishedPages()
}
