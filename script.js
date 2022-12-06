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

console.log(theHobbit.info());

function addBookToLibrary(book) {
  myLibrary.push(book.title);
}

addBookToLibrary(theHobbit);

console.log(myLibrary);

function displayMyLibrary() {
  for (let book of myLibrary) {
    console.log(book);
    let bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    console.log(bookCard);
    let bookCardTitle = document.createElement('h2');
    bookCardTitle.textContent = book;
    console.log(bookCardTitle);
    bookCard.appendChild(bookCardTitle);
    document.body.appendChild(bookCard);
  }
}

displayMyLibrary();
