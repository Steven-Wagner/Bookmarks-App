import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className='Nav'>
<<<<<<< HEAD
      <Link to="/">
        Bookmark List
      </Link>
      {' '}
      <Link to ='/add-bookmark'>
=======
      <Link to={'/'}>
        Bookmark List
      </Link>
      {' '}
      <Link to={'/add-bookmark'}>
>>>>>>> context-startingpoint
        Add Bookmark
      </Link>
    </nav>
  );
}
