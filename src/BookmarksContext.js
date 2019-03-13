import React from 'react';

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmarks: ()=> {},
    deleteBookmark: ()=> {},
    updateBookmark: ()=> {}
})

export default BookmarksContext;