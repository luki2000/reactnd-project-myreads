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
      books: []
    }
    this.shelf = [
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
    ];
    this.addLibrary = this.addLibrary.bind(this); 
  }
  //load are shelved books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    });
  }
  //function to merge searched books to the main state component 
  addLibrary(library) {
    const newBooks = this.state.books;
    const merged = [...newBooks,...library];
    this.setState({books: merged});
  }
  //handles the changing of book states
  handleChange = (e,bookId) => {
    const newCategory = e.target.value;
    this.setState(previousState => ({
        books : previousState.books.map(book => {
          if(book.id === bookId) {
            book['shelf'] = newCategory;
            BooksAPI.update(book, newCategory);
          }
          return book;
        })
    }));
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route path="/" exact render={() => <ListBooks 
              hchange={this.handleChange} 
              books={this.state.books} 
              shelf={this.shelf}/>
          } />
            <Route path="/search" exact render={() => <SearchPage 
              addtoshelf={this.addLibrary} 
              hchange={this.handleChange} 
              books={this.state.books}/>
          }/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp
