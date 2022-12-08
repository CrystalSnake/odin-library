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
					<label for="number-of-pages">Number of pages</label>
					<input
						type="number"
						name="number-of-pages"
						id="number-of-pages"
						required
					/>
				</div>
		
			</form>
		</div>
			</div>
			<div class="modal-footer">
				<button type="submit" form="add-book-form">Add</button>
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
