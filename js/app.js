var bookName = document.getElementById('bookName');
var websiteURL = document.getElementById('websiteURL');
var bookListContainer = document.getElementById('book-list-container');

var booksList = [];


var localBooksList = JSON.parse(localStorage.getItem('booksList'));

if (localBooksList != null) {
    booksList = localBooksList;
    displayBooks();
}
else
    booksList = []



function addBook() {
    var url = websiteURL.value;
    var book = {};

    if (url.includes('https://') || url.includes('http://')) {
        book = {
            bookName: bookName.value,
            websiteURL: url
        }

        booksList.push(book);

        localStorage.setItem('booksList', JSON.stringify(booksList));

        displayBooks();

        clearForm();
    } else {
        alert('invalid url');
    }
}

function clearForm() {
    bookName.value = '';
    websiteURL.value = '';
}

function displayBooks() {
    var bookItem = ``;

    for (let i = 0; i < booksList.length; i++) {
        bookItem += ` <div class="book-item">
           
        <div class="title w-25">
            <h2 class="">${booksList[i].bookName}</h2>
        </div>

        <div class="book-btns">
            <a href="${booksList[i].websiteURL}" target="_blank" class="btn btn-primary">visit</a>
            <button class="btn btn-danger" onclick="deleteBook(${i})">Delete</button>

        </div>
    </div>`

    }

    bookListContainer.innerHTML = bookItem;
}

function deleteBook(position) {
    booksList.splice(position, 1);
    localStorage.setItem('booksList', JSON.stringify(booksList));
    displayBooks();
}