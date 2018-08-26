import React from 'react'
import './App.css'
import {Link} from 'react-router-dom';
import Book from './book'
import PropTypes from 'prop-types'

class BookList extends React.Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired
  }
	onChangeShelf(book,shelf){
		this.props.onChangeShelf(book,shelf)
	}
	render(){
    const {title,Books} = this.props;
		return(
		  <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
			     
            <ol className="books-grid">
			           {Books.map(item=>(
                 <Book 
                 key={item.id} 
                 book={item} 
                 onChangeShelf={(book,shelf)=>{this.onChangeShelf(book,shelf)}} />
 				         ))}        
            </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="search">Add a book</Link>
            </div>
      </div>
		)
	}
}

export default BookList