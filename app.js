const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

const newBook = new Book(title, author, pages, read);
myLibrary.push(newBook);
}

function displayBooks() {
  const grid = document.getElementById("bookGrid");
  grid.innerHTML = "";

  document.getElementById("bookGrid").addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("remove-book")) {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    displayBooks();
  }

  if (e.target.classList.contains("toggle-read")) {
    const book = myLibrary.find(book => book.id === id);
    book.read = !book.read;
    displayBooks();
  }
});

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not read"}</p>
      <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
      <button class="remove-book" data-id="${book.id}">Remove</button>
    `;

    grid.appendChild(card);
  });
}

const dialog = document.getElementById("bookDialog");

document.getElementById("openDialog").addEventListener("click", () => {
  dialog.showModal();
});

document.getElementById("cancelDialog").addEventListener("click", () => {
  dialog.close();
});

document.getElementById("submitBook").addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayBooks();
  dialog.close();
});