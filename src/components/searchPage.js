import React from 'react';
import { Link } from 'react-router-dom';
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
        this.error = '';
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(text) { 
        this.setState({text:text.toUpperCase().trim()}, () => {
            if (this.state.text && this.state.text.length > 1) {
                if (this.state.text.length % 2 === 0) {
                    BooksAPI.search(this.state.text).then((booksSearchResults) => {
                       
                        //TODO filter out duplicate
                        const filteredOutDuplicates = booksSearchResults.filter(book => {
                           let isNotDuplicate = true;
                            this.props.books.forEach(sBook => {
                               
                            if(sBook.id === book.id) { 
                                console.log('duplicate');
                                isNotDuplicate = false;
                            }
                           });
                           return isNotDuplicate; 
                        });
                        //console.log('filtered',filteredOutDuplicates);
                        /*merge library state to shelf*/
                        this.props.library(filteredOutDuplicates); 
                        
                        //TODO Ensure states are the same both pages
                        const syncedState = booksSearchResults.map( book => {
                            this.props.books.forEach(sBook => {             
                                if(sBook.id === book.id) { 
                                    book = sBook;
                                }
                            });
                            return book;
                        });
                        this.setState({booksSearchResults: syncedState});  
                    }).catch((error) => {
                        console.log(error);
                        this.setState({error})
                    });
                }
            } else {
                this.setState({booksSearchResults : [],error:''}); 
            }
        });
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
                        <input onChange={(e) => this.handleInput(e.target.value)} type="text" placeholder="Search by title or author"/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{books}</ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;