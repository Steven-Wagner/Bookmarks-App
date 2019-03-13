import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import './EditBookmark.css';

const Required = () => (
    <span className='AddBookmark__required'>*</span>
)


class EditBookmark extends Component {

    static contextType = BookmarksContext;

    state = {
        title: '',
        description: '',
        url: "",
        rating: ''
    };

    componentDidMount() {
        const bookmarkId = this.props.match.params.id;

        fetch(`http://localhost:8000/api/bookmarks/${bookmarkId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(bookmark => {
            this.setState({
                title: bookmark.title,
                description: bookmark.description,
                rating: bookmark.rating,
                url: bookmark.url
            })
        })
        .catch(error => {console.log(error)})
    }

    onSubmit = e => {
        e.preventDefault()
        //validation
        fetch(`http://localhost:8000/api/bookmarks/${this.props.match.params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(response => {
                this.context.updateBookmark(response)
                this.props.history.push('/')
            })
            .catch(error => {console.log(error)})
    }

    handleChangeTitle(e){
        const newValue = e.target.value;
        this.setState({
            title: newValue
        })
    }

    handleChangeDescription(e){
        const newValue = e.target.value;
        this.setState({
            description: newValue
        })
    }

    handleChangeRating(e){
        const newValue = e.target.value;
        this.setState({
            rating: newValue
        })
    }

    handleChangeUrl(e){
        const newValue = e.target.value;
        this.setState({
            url: newValue
        })
    }

    handleCancelClick(e){
        this.props.history.push('/')
    }
    

    render() {
        const {title, description, rating, url} = this.state
        return(
            <section className="editBookmark__form">
                <h2>Edit Bookmark</h2>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="title">
                        Title
                        {' '}
                        <Required />
                    </label>
                    <input
                        id='title'
                        type='text'
                        name='title'
                        placeholder='Great Title'
                        required
                        value={title}
                        onChange={(e) => this.handleChangeTitle(e)}
                    />
                    <label htmlFor="description">
                        Description
                        {' '}
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={description}
                        onChange={(e) => this.handleChangeDescription(e)}
                    />
                    <label htmlFor="rating">
                        Rating
                        {' '}
                        <Required />
                    </label>
                    <input
                        type='number'
                        id='rating'
                        name='rating'
                        value={rating}
                        min='1'
                        max='5'
                        default='1'
                        required
                        onChange={(e) => this.handleChangeRating(e)}
                    />
                    <label htmlFor="url">
                        Url
                        {' '}
                        <Required />
                    </label>
                    <input
                        type='text'
                        id='url'
                        name='url'
                        value={url}
                        required
                        onChange={(e) => this.handleChangeUrl(e)}
                    />
                    <button type='submit'>Save</button>
                    <button type='button' onClick={(e) => this.handleCancelClick(e)}>Cancel</button>

                </form>
            </section>
        )
        }
}

export default EditBookmark;
