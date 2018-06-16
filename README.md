# MyReads Project

 This application allows you to keep track of your books. You can also search a library for more books to track.

### Track your book
 On the main page you will see a list of books, each categorised under a shelf. You can categorise your books in 3 different types of shelves, either as books you 'Read', books you are 'Currently Reading' or books 'You want to read'. You can change their category by simply clicking on the book's corresponding green button on the bottom right of the book cover image and selecting the desired shelf. You can equally set a book to no shelves by selecting 'none', the book will no longer appear on the main page.

### Search for a book to track
 You can also search for the library for more books to track. To go to the search page simply click the green button at the bottom right of the page. On the next page to search, start typing away on the search input field at the top of the page. When a search matches you should see a list of books below the input field. You can add any of the books to a shelf in the same manner as you can on the homepage. If you selected a shelf, it should now appear on the homepage. To go back to the homepage simply click the back arrow to the left of the search input field or use the browser to go back. 

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    |── components #folder that holds components for the application.
    |   |── book.js #component responsible for displaying an individual book 
    |   |── bookShelf.js #component that displays a shelf with book(s)
    |   |── listBooks.js #component that generates a list of books. What is basically the main page.
    |   |── searchPage.js #component that allows you to search books using the provided input
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server

A Backend server has been provided for the developement. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).