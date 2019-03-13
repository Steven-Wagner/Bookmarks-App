import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';
import config from '../config';
import BookmarksContext from '../BookmarksContext'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function deleteBookmarkRequest(bookmarkId, callback){
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the reqyest is successful
      // this is where the App component can remove it from state
      callback(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context)=>(
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Link to={`edit/${props.id}`}>Edit Bookmark</Link>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button
          className='BookmarkItem__description'
          onClick={() => deleteBookmarkRequest(
            props.id,
            context.deleteBookmark
          )}
        >
          Delete
        </button>
      </div>
    </li>
    )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
}

BookmarkItem.defaultProps = {
  rating: 1,
  description: ''
}
