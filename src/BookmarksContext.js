import React from 'react';

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmarks: ()=> {},
    deleteBookmark: ()=> {}
})

export default BookmarksContext;