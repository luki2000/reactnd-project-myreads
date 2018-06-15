import React from 'react';
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

      /*handleInput(e) {
        //console.log(BooksAPI.search(e.target.value));
        let addNoneShelf = [];
        BooksAPI.search(e.target.value).then((booksSearchResults) => {
           /* console.log(this.props.books);
            addNoneShelf = booksSearchResults.map(book => {
                            book.shelf = 'none';  
                            return book; 
                    });
                    this.setState({booksSearchResults})
            })*/

            
            /*
            this.props.books.forEach(shelfedBook => {
                        if (book.id === shelfedBook.id) {
                            book = shelfedBook;
                            return;
                        } else {
                            book.shelf = 'none';  
                        }
            */ 

    handleInput(text) { 
        this.setState({text:text.trim()}, () => {
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


                        //console.log('synced',syncedState);


                        this.setState({booksSearchResults: syncedState});  
                    }).catch(function(error) {
                        //this.setState({error});
                    });
                }
            } else {
                this.setState({booksSearchResults : []}); 
            }
        });
    }

    /*componentDidMount() {
        if(this.state.text.length > 0) {
            BooksAPI.search(this.state.text).then((booksSearchResults) => {
                this.setState({booksSearchResults});
            
            }).catch(function(error) {
                this.setState({error});
            });
        } else {
            this.setState({booksSearchResults : []}); 
        }
    }*/

    addToShelf() {

    }

    render() {
       let books = null;
       console.log(this.props.books);

        books = this.state.booksSearchResults.error ? <p>{this.state.booksSearchResults.error}</p> : this.state.booksSearchResults.map((book) => {
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
       /*if(this.state.booksSearchResults.error) {
        books = <p>{this.state.booksSearchResults.error}</p>;
       } else {
        books = this.state.booksSearchResults.map((book) => {
            return <Book 
                 key={book.id} 
                 id={book.id}
                 hchange={this.props.hchange}
                 bookTitle={book.title ? book.title : ''} 
                 authors={book.authors ? book.authors : ''} 
                 /*shelf={book.shelf}*/
                /* image={book.imageLinks ? book.imageLinks.thumbnail : ''}
                 />;
         });

       }*/

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.hpage}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
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