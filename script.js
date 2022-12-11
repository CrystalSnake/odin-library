let myLibrary = [];

function Book(title, author, numberOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readStatus = readStatus;
}

Book.prototype.add = function () {
  myLibrary.push(this.title);
};

Book.prototype.createBookCard = function () {
  const container = document.querySelector('.container');
  let bookCard = document.createElement('div');
  bookCard.className = 'book-card';
  let bookCardTitle = document.createElement('h2');
  bookCardTitle.textContent = this.title;
  bookCard.appendChild(bookCardTitle);
  // buttons
  let buttonsCardContainer = document.createElement('div');
  //delete
  let deleteBookButton = document.createElement('button');
  deleteBookButton.classList.add('book-card-button', 'delete-button');
  deleteBookButton.addEventListener('click', () => {
    deleteBookButton.parentElement.parentElement.remove();
  });
  buttonsCardContainer.appendChild(deleteBookButton);
  //read status
  let readBookButton = document.createElement('button');
  if (this.readStatus) {
    readBookButton.classList.add(
      'book-card-button',
      'read-button',
      'read-true'
    );
  } else {
    readBookButton.classList.add('book-card-button', 'read-button');
  }
  readBookButton.addEventListener('click', () => {
    console.log('click');
    readBookButton.classList.toggle('read-true');
  });
  buttonsCardContainer.appendChild(readBookButton);
  //assembly
  bookCard.appendChild(buttonsCardContainer);
  container.appendChild(bookCard);
};

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

function closeModalHandler() {
  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.addEventListener('click', () => {
    document.body.removeChild(document.body.lastChild);
  });
}

function stopDefAction(evt) {
  evt.preventDefault();
}

function submitListener() {
  const addBookSubmitButton = document.getElementById('add-book-submit');
  addBookSubmitButton.addEventListener('click', stopDefAction, false);
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#book-author');
  const numberOfPages = document.querySelector('#book-number-of-pages');
  const readStatus = document.querySelector('#book-read-status');
  addBookSubmitButton.addEventListener('click', () => {
    let newBook = new Book(
      title.value,
      author.value,
      numberOfPages.value,
      readStatus.checked
    );
    newBook.add();
    newBook.createBookCard();
  });
}

const addBookButton = document.getElementById('add-book');

addBookButton.addEventListener('click', createModal, false);
addBookButton.addEventListener('click', closeModalHandler, false);
addBookButton.addEventListener('click', submitListener, false);
