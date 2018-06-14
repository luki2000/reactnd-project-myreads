import React from 'react';
import '../App.css';

//COMPONENTS
import Book from './book.js';

const BookShelf = (props) => {
  //  console.log(props.type);
    const books = props.books.filter(book => book.shelf === props.type).map((book) => {
       return <Book 
            key={book.id} 
            id={book.id}
            hchange={props.hchange}
            bookTitle={book.title ? book.title : ''} 
            authors={book.authors ? book.authors : ''} 
            shelf={book.shelf}
            image={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ''}
            />;
    });
    return (
        <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books}
                    </ol>
                  </div>
                </div>
    );
};

export default BookShelf;