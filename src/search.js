import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom';
import Book from './book'
import PropTypes from 'prop-types'



class SearchApp extends React.Component {
   static propTypes = {
    books: PropTypes.array,
    onChangeShelf: PropTypes.func.isRequired
  }
	state= {
		query: '',
        books:[],
        searchErr: false
      }

  onChangeShelf(book,shelf){
    this.props.onChangeShelf(book,shelf)
  } 

catchBooks(value) {
	const query = value
	this.setState({query :query})
	if(query){
	BooksAPI.search(query).then((items)=>{
		if(items.error){
			this.setState({
				books:[],
        		searchErr:true
			});
		} else {
			let allBooks = items.map(item=>{
            item.shelf='none'
            this.props.allShelfBooks.forEach(data=>{
              if(data.id===item.id){item.shelf= data.shelf}  
            })
			return item
		})
			this.setState({
			books:allBooks,
      
		})
		}
	})
}
else {this.setState({query:'',books:[],searchErr:false})}
}

	render(){
    const {books,searchErr } = this.state
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input 
                type="text"
                placeholder="Search by title or author"
                onChange={(evt)=>this.catchBooks(evt.target.value) } />
            </div>
          </div>
          <div className="search-books-results">
            {books.length > 0 && (
              <div>
                <div>
                  <h3>Search returned {books.length } books </h3>
                </div>
                <ol className="books-grid">
                {books.length !== 0 && books.map((book,index)=>(
                  <Book key={index} book={book} onChangeShelf={(book,shelf)=>{this.onChangeShelf(book,shelf)}} />
                  ))}
                </ol>
              </div>
            )}
            {searchErr &&(<div><h3>Search returned 0 books.  Please try again!</h3></div>)}
          </div>
          </div>
      )}
}
export default SearchApp
