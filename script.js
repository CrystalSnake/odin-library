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

const addBookButton = document.getElementById('add-book');

addBookButton.addEventListener('click', () => {
  createModal();
});

function createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML(
    'beforeend',
    `
		<div class="modal-overlay">
		<div class="modal-window">
			<div class="modal-header">
				<span class="modal-title">Add book</span>
				<span class="close">&times;</span>
			</div>
			<div class="modal-body">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
				saepe, voluptatum dolores distinctio veniam possimus aperiam? Quas
				modi nam ab.
			</div>
			<div class="modal-footer">
				<button type="submit">Add</button>
			</div>
		</div>
	</div>
	`
  );
  document.body.appendChild(modal);
}
