import React from 'react';
import * as BooksAPI from './BooksAPI';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

// COMPONENTS
import SearchPage from './components/searchPage'; 
import ListBooks from './components/listBooks'; 

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ]
    }
    this.addLibrary = this.addLibrary.bind(this); 
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
     this.setState({books})
    });
  }

  addLibrary(library) {
    const newBooks = this.state.books;
    const merged = [...newBooks,...library];
    this.setState({books: merged});
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

  /*temperary function to handle switching page before using router*/
  handlePage = () => { 
    const newPageState = this.state.showSearchPage;
    this.setState({ showSearchPage: !newPageState }); 
  }

  render() {
    return (
      <div className="app">
      <BrowserRouter>
        <div>
          <Route path="/" exact render={() => <ListBooks hchange={this.handleChange} books={this.state.books} shelf={this.state.shelf}/>
        } />
          <Route path="/search" exact render={() => <SearchPage library={this.addLibrary} hchange={this.handleChange} books={this.state.books}/>
        }/>
        </div>
      </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
