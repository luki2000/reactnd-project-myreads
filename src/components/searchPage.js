import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import * as BooksAPI from '../BooksAPI';


//COMPONENTS
import Book from './book';

class SearchPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        text: '',
        booksSearchResults: [],
        error:''
      }
      this.handleInput = this.handleInput.bind(this);
    }
    handleInput(text) { 
      this.setState({text:text.toUpperCase().trim()}, () => {
        if (this.state.text && this.state.text.length > 1) {
            BooksAPI.search(this.state.text).then((booksSearchResults) => {
              /*merge library state to shelf after filtering duplicates*/
              this.props.addtoshelf(this.filteredOutDuplicates(booksSearchResults,this.props.books)); 
              /*sync library state with shelfed books*/
              this.setState({booksSearchResults: this.syncedState(booksSearchResults,this.props.books)});  
                }).catch((error) => {
                     this.setState({error})
                   });
        } else {
          this.setState({booksSearchResults : [],error:''}); 
        }
      });
    }
    //filters out any duplicate books by id before mergng with the main state
    filteredOutDuplicates(searchedBooks,shelvedBooks) {
      const result = searchedBooks.filter(book => {
        let isNotDuplicate = true;
        shelvedBooks.forEach(sBook => {             
          if(sBook.id === book.id) { 
            isNotDuplicate = false;
          }
        });
        return isNotDuplicate; 
      });
      return result;
    }
    //syncs the state of books between pages
    syncedState(searchedBooks,shelvedBooks) {
      const result = searchedBooks.map( book => {
        shelvedBooks.forEach(sBook => {             
          if(sBook.id === book.id) { 
            book = sBook;
          }
        });
        return book;
      });
      return result;
    }
    render() {
      let books = null;
      books = this.state.error ? <p>No match Found</p> : this.state.booksSearchResults.map((book) => {
        return <Book 
                 key={book.id} 
                 id={book.id}
                 hchange={this.props.hchange}
                 bookTitle={book.title ? book.title : ''} 
                 authors={book.authors ? book.authors : ''} 
                 shelf={book.shelf = book.shelf ? book.shelf : 'none' }
                 image={book.imageLinks ? book.imageLinks.thumbnail : ''}
                 />;
      });
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <DebounceInput debounceTimeout={300} onChange={(e) => this.handleInput(e.target.value)} type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {books}
            </ol>
          </div>
        </div>
      );
    }
}

export default SearchPage;