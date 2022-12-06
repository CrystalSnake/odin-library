let myLibrary = [
  'Don Quixote',
  'Moby Dick',
  'War and Peace',
  'Hamlet',
  'The Odissey',
];

function Book(title, author, numberOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${
    this.readStatus ? 'read' : 'not read yet'
  }`;
};

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

function addBookToLibrary(book) {
  myLibrary.push(book.title);
}

addBookToLibrary(theHobbit);

const container = document.querySelector('.container');

function displayMyLibrary() {
  for (let book of myLibrary) {
    let bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    let bookCardTitle = document.createElement('h2');
    bookCardTitle.textContent = book;
    bookCard.appendChild(bookCardTitle);
    container.appendChild(bookCard);
  }
}

displayMyLibrary();
