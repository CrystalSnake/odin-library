const myLibrary = [];

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
  const bookCardTitle = document.createElement('h2');
  bookCardTitle.textContent = book.title;
  bookCard.appendChild(bookCardTitle);
  const bookCardAuthor = document.createElement('p');
  bookCardAuthor.textContent = book.author;
  bookCard.appendChild(bookCardAuthor);
  const bookCardPages = document.createElement('p');
  bookCardPages.textContent = book.numberOfPages + ' pg';
  bookCard.appendChild(bookCardPages);
  // buttons
  const buttonsCardContainer = document.createElement('div');
  //delete
  const deleteBookButton = document.createElement('button');
  deleteBookButton.classList.add('book-card-button', 'delete-button');
  deleteBookButton.addEventListener('click', () => {
    myLibrary.splice(bookCard.dataset.bookId, 1);
    displayMyLibrary();
  });
  buttonsCardContainer.appendChild(deleteBookButton);
  //read status
  const readBookButton = document.createElement('button');
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
    const bookCard = createBookCard(item);
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
			<form novalidate name="add-book" action="#" id="add-book-form" method="post ">
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

  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.addEventListener('click', (evt) => {
    evt.target.closest('.modal').remove();
  });

  const form = document.forms['add-book'];
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    validateForm();
  });
}

const addBookButton = document.getElementById('add-book');
addBookButton.addEventListener('click', () => createModal());

function createBook(title, author, numberOfPages, readStatus) {
  const newBook = new Book(title, author, numberOfPages, readStatus);
  newBook.add();
  displayMyLibrary();
}

function validateTitle(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('Book title is required');
  } else if (input.validity.tooShort) {
    input.setCustomValidity('Book title is too short. Min length 3');
  } else if (input.validity.tooLong) {
    input.setCustomValidity('Book title is too short. Max length 50');
  } else {
    input.setCustomValidity('');
  }
}

function validateAuthor(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('Book author is required');
  } else if (input.validity.tooShort) {
    input.setCustomValidity('Book author is too short. Min length 3');
  } else if (input.validity.tooLong) {
    input.setCustomValidity('Book author is too short. Max length 30');
  } else {
    input.setCustomValidity('');
  }
}

function validatePages(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('Number of pages is required');
  } else if (input.validity.rangeUnderflow) {
    input.setCustomValidity(
      'The number of pages is too small. Minimum number of pages 1'
    );
  } else if (input.validity.rangeOverflow) {
    input.setCustomValidity(
      'The number of pages is too large. Maximum number of pages 5000'
    );
  } else if (input.validity.stepMismatch) {
    input.setCustomValidity('The number of pages must be integer');
  } else {
    input.setCustomValidity('');
  }
}

function validateForm() {
  const form = document.forms['add-book'];
  const title = form.elements['book-title'];
  const author = form.elements['book-author'];
  const numberOfPages = form.elements['book-number-of-pages'];
  const readStatus = form.elements['book-read-status'];

  validateTitle(title);
  validateAuthor(author);
  validatePages(numberOfPages);
  form.reportValidity();
  if (form.checkValidity()) {
    createBook(
      title.value,
      author.value,
      numberOfPages.value,
      readStatus.checked
    );
    form.reset();
  }
}
