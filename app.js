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
MyLibrary.push(newBook);
}

function displayBooks() {
  const grid = document.getElementById("bookGrid");
  grid.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not read"}</p>
    `;

    grid.appendChild(card);
  });
}