import React from 'react';
import { Link } from 'react-router-dom';

//COMPONENTS
import BookShelf from './bookShelf';

const ListBooks = (props) => {
  const shelves = props.shelf.map((shelf) => {
    return <BookShelf hchange={props.hchange} key={shelf.type} title={shelf.title} type={shelf.type} books={props.books} />;
  });  
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks;