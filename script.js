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

addBookButton.addEventListener('click', () => {
  showModal();
  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.addEventListener('click', () => {
    closeModal();
  });
  const addBookSubmitButton = document.getElementById('add-book-submit');
  addBookSubmitButton.addEventListener('click', stopDefAction, false);
  const bookTitle = document.querySelector('#book-title');
  const bookAuthor = document.querySelector('#book-author');
  const bookPages = document.querySelector('#book-number-of-pages');
  const bookReadStatus = document.querySelector('#book-read-status');
  addBookSubmitButton.addEventListener('click', () => {
    let newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookReadStatus.checked
    );

    addBookToLibrary(newBook);

    let bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    let bookCardTitle = document.createElement('h2');
    bookCardTitle.textContent = newBook.title;
    bookCard.appendChild(bookCardTitle);
    container.appendChild(bookCard);
  });
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
				<span id="close-modal">&times;</span>
			</div>
			<div class="modal-body">
			<div class="form-container">
			<form action="#" id="add-book-form" method="post">
				<legend>Please fill all field below, then press "Add" button.</legend>
				<div class="modal-input">
					<label for="book-title">Book title</label>
					<input type="text" name="book-title" id="book-title" required />
				</div>
		
				<div class="modal-input">
					<label for="book-author">Book author</label>
					<input type="text" name="book-author" id="book-author" required />
				</div>
		
				<div class="modal-input">
					<label for="book-number-of-pages">Number of pages</label>
					<input
						type="number"
						name="book-number-of-pages"
						id="book-number-of-pages"
						required
					/>
				</div>

				<div class="modal-input checkbox">
					<label for="book-read-status">Have you read it?</label>
					<input type="checkbox" name="book-read-status" id="book-read-status" required />
				</div>
		
			</form>
		</div>
			</div>
			<div class="modal-footer">
				<button id="add-book-submit" type="submit" form="add-book-form">Add</button>
			</div>
		</div>
	</div>
	`
  );
  document.body.appendChild(modal);
}

function showModal() {
  const modal = document.querySelector('.modal');
  modal.classList.add('open');
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('open');
}

function stopDefAction(evt) {
  evt.preventDefault();
}
