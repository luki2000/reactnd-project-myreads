import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

// COMPONENTS
import SearchPage from './components/searchPage'; 
import ListBooks from './components/listBooks'; 

class BooksApp extends React.PureComponent {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    /*removed none from shelf because it is not a shelf*/
    shelf:[
      {
        title: "Currently Reading",
        type:  "currentlyReading"
      },
      {
        title: "Want to read",
        type:  "wantToRead"
      },
      {
        title: "Read",
        type: "read",
      }
    ],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
     this.setState({books})
    });
  }

  handleChange = (e,bookId) => {
    const newBooks = this.state.books;

    const movedBook =  newBooks.map(book => {
      if(book.id === bookId) {
        book.shelf = e.target.value;
        BooksAPI.update(book, e.target.value)
      }
      return book;
    });
    
    this.setState({
      books: movedBook
    });
  }

  /*temperory function to handle switching page before using router*/
  handlePage = () => { 
    const newPageState = this.state.showSearchPage;
    this.setState({ showSearchPage: !newPageState }); 
  }

  render() {
    console.log(this.state.books);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage hpage={this.handlePage} hchange={this.handleChange}/>
        ) : (
          <ListBooks hpage={this.handlePage} hchange={this.handleChange} books={this.state.books} shelf={this.state.shelf}/>
        )}
      </div>
    )
  }
}

export default BooksApp
