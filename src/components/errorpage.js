import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <img src={require('../image/error.jpg')}/>
            <h1>Oops you went to a none-existent page!</h1>
            <Link to="/">Go to Main Page</Link><br/><br/>
            <Link to="/search">Go to Search</Link>
        </div>
    );
};

export default ErrorPage;