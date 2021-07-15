// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){

}


// Add Book to the List
UI.prototype.addBookToList = function(book){
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

// Show Alert
UI.prototype.showAlert = function(message, className){
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

// Clear Fields
UI.prototype.ClearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();                
    }
}

// Event Listeners
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

          ui.showAlert('Book Added!', 'success');

          // Clear Field
          ui.ClearFields();
    }  

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    // Delete Book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed!', 'sucess');


   e.preventDefault();
});