import React from 'react'
import './App.css'
import noCover from './icons/no-cover-image.png'
import PropTypes from 'prop-types'


 class Book extends React.Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired
  }
  //pass the book and it`s shelf status 
 	onChangeShelf(value){
		this.props.onChangeShelf(this.props.book,value)
	}

	 render(){
    const {book}= this.props
    const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover
    
		 return(
			 
		  <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${coverImg})`}}></div>
              <div className="book-shelf-changer">
                <select
								  value={book.shelf}
								  onChange={(e)=>this.onChangeShelf(e.target.value)}
							  >
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors?book.authors.join(', '):'No authors available'}</div>
        </div>
      </li>
		 )
	 }
 }

export default Book