let myLibrary = [];

class Book {
  constructor(title, author, numberOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
  }
  add() {
    myLibrary.push(this);
  }
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.className = 'book-card';
  let bookCardTitle = document.createElement('h2');
  bookCardTitle.textContent = book.title;
  bookCard.appendChild(bookCardTitle);
  let bookCardAuthor = document.createElement('p');
  bookCardAuthor.textContent = book.author;
  bookCard.appendChild(bookCardAuthor);
  let bookCardPages = document.createElement('p');
  bookCardPages.textContent = book.numberOfPages + 'pg';
  bookCard.appendChild(bookCardPages);
  // buttons
  let buttonsCardContainer = document.createElement('div');
  //delete
  let deleteBookButton = document.createElement('button');
  deleteBookButton.classList.add('book-card-button', 'delete-button');
  deleteBookButton.addEventListener('click', () => {
    myLibrary.splice(bookCard.dataset.bookId, 1);
    displayMyLibrary();
  });
  buttonsCardContainer.appendChild(deleteBookButton);
  //read status
  let readBookButton = document.createElement('button');
  if (book.readStatus) {
    readBookButton.classList.add(
      'book-card-button',
      'read-button',
      'read-true'
    );
  } else {
    readBookButton.classList.add('book-card-button', 'read-button');
  }
  readBookButton.addEventListener('click', () => {
    myLibrary[bookCard.dataset.bookId].readStatus =
      !myLibrary[bookCard.dataset.bookId].readStatus;
    displayMyLibrary();
  });
  buttonsCardContainer.appendChild(readBookButton);
  //assembly
  bookCard.appendChild(buttonsCardContainer);
  return bookCard;
}

function displayMyLibrary() {
  const container = document.querySelector('.container');
  container.textContent = '';
  myLibrary.forEach((item, index) => {
    let bookCard = createBookCard(item);
    bookCard.dataset.bookId = index;
    container.appendChild(bookCard);
  });
}

function createModal() {
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
			<form name="add-book" action="#" id="add-book-form" method="post novalidate">
				<legend>Please fill all field below, then press "Add" button.</legend>
				<div class="modal-input">
					<label for="book-title">Book title</label>
					<input type="text" minlength="3" maxlength="50" name="book-title" id="book-title" required />
				</div>
		
				<div class="modal-input">
					<label for="book-author">Book author</label>
					<input type="text" minlength="3" maxlength="30" name="book-author" id="book-author" required />
				</div>
		
				<div class="modal-input">
					<label for="book-number-of-pages">Number of pages</label>
					<input
						type="number"
						min="1"
						max="5000"
						name="book-number-of-pages"
						id="book-number-of-pages"
						required
					/>
				</div>

				<div class="modal-input checkbox">
					<label for="book-read-status">Have you read it?</label>
					<input type="checkbox" name="book-read-status" id="book-read-status" />
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

function closeModalHandler() {
  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.addEventListener('click', () => {
    document.body.removeChild(document.body.lastChild);
  });
}

function submitListener() {
  const form = document.forms['add-book'];
  const addBookSubmitButton = form.elements['add-book-submit'];
  const title = form.elements['book-title'];
  const author = form.elements['book-author'];
  const numberOfPages = form.elements['book-number-of-pages'];
  const readStatus = form.elements['book-read-status'];
  addBookSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    let newBook = new Book(
      title.value,
      author.value,
      numberOfPages.value,
      readStatus.checked
    );
    newBook.add();
    displayMyLibrary();
    form.reset();
  });
}

const addBookButton = document.getElementById('add-book');

addBookButton.addEventListener('click', createModal, false);
addBookButton.addEventListener('click', closeModalHandler, false);
addBookButton.addEventListener('click', submitListener, false);
