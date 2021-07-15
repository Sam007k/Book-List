class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // create tr element
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>X</a></td>
        `;
    
        list.append(row);
    }

    showAlert(message, className) {
         // Create div
         const div = document.createElement('div');
         // Add classes
         div.className = `alert ${className}`;
         // Add text
         div.appendChild(document.createTextNode(message));
         // Get Parent
         const container = document.querySelector('.container');
         const form = document.querySelector('#book-form');
         container.insertBefore(div, form);
     
         setTimeout(() => {
            document.querySelector('.alert').remove(); 
         }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();                
        }
    }

    ClearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store {
    static getBooks(book) {
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        })

    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {
        console.log(isbn);
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn ===  isbn){
                books.splice(index, 1);
            }                        
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Dom Event Listner
document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event Listeners for Add book
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;      

    const book = new Book(title,author,isbn);

    // Instaniate UI
    const ui = new UI();

    // Validate 
    if(title === '' || author === '' || isbn === ''){
        // show alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
         // Add book to the List
          ui.addBookToList(book);

         //   Add to LS
         Store.addBook(book);

          ui.showAlert('Book Added!', 'success');

          // Clear Field
          ui.ClearFields();
    }  

    e.preventDefault();
});

// Event Listener for Delete

document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    // Delete Book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed!', 'sucess');

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


   e.preventDefault();
});