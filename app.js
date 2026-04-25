//Array to hold all book objects
const myLibrary = [];

//Book constructor function - creates a new book object with the properties and a unique ID
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Generate a unique ID for each book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; //boolean - true if read, false if not read
}

//Prototype method to toggle the read status of a book
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
//Collects form values, creates a new Book, and adds it to the myLibrary array
function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook); // stores it in the myLibrary array
}

//Clears the grid and re-renders a card for each book in the array
function displayBooks() {
  const grid = document.getElementById("bookGrid");
  grid.innerHTML = ""; //wipe existing cards before re-rendering

  myLibrary.forEach((book) => {
    const card = document.createElement("div"); //create a new card element for each book
    card.dataset.id = book.id; //stamp the book's ID onto the card

    //Fill the card with the books data and actions - toggle read status and remove book
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not read"}</p>
      <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
      <button class="remove-book" data-id="${book.id}">Remove</button>
    `;

    grid.appendChild(card); // add card to the page
  });
}

// Single click listener on the grid that handles both remove and toggle
// (avoids attaching individual listeners to every button)
document.getElementById("bookGrid").addEventListener("click", (e) => {
  const id = e.target.dataset.id; // get the book ID from the clicked button
  if (!id) return; // exit if the click wasn't on a button

  // Remove the book from the array and re-render
  if (e.target.classList.contains("remove-book")) {
    const index = myLibrary.findIndex((book) => book.id === id);
    myLibrary.splice(index, 1); // cut the book out of the array
    displayBooks();
  }

  // Toggle the read status and re-render
  if (e.target.classList.contains("toggle-read")) {
    const book = myLibrary.find((book) => book.id === id);
    book.toggleRead(); // calls the prototype method
    displayBooks();
  }
});

// Opens the dialog when New Book is clicked
const dialog = document.getElementById("bookDialog");

document.getElementById("openDialog").addEventListener("click", () => {
  dialog.showModal();
});

// Closes the dialog without doing anything
document.getElementById("cancelDialog").addEventListener("click", () => {
  dialog.close();
});

// Adds the book, refreshes the display, then closes the dialog
document.getElementById("submitBook").addEventListener("click", (e) => {
  e.preventDefault(); // stops the button from triggering a page reload
  addBookToLibrary();
  displayBooks();
  dialog.close();
});
