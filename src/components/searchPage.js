import React from 'react';
import * as BooksAPI from '../BooksAPI';


//COMPONENTS
import Book from './book';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            booksSearchResults: []
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        //console.log(BooksAPI.search(e.target.value));
        
        BooksAPI.search(e.target.value).then((booksSearchResults) => {
            this.setState({booksSearchResults})
        });
    }

    render() {
        console.log(this.state.booksSearchResults);

        const books = this.state.booksSearchResults.map((book) => {
            return <Book 
                 key={book.id} 
                 id={book.id}
                 hchange={this.props.hchange}
                 bookTitle={book.title ? book.title : ''} 
                 authors={book.authors ? book.authors : ''} 
                 shelf={book.shelf}
                 image={book.imageLinks ? book.imageLinks.thumbnail : ''}
                 />;
         });



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
                        <input onChange={this.handleInput} type="text" placeholder="Search by title or author"/>

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