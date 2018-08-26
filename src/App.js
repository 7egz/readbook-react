import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import SearchApp from './search'
import BookList from './bookList'
import PropTypes from 'prop-types'


class BooksApp extends React.Component {
	static propTypes={
		books: PropTypes.array
	}
  state = {books:[]}

  //fetch all books from BooksApi
componentDidMount(){
	BooksAPI.getAll().then(data=>
			this.setState({books: data})
		)
}
 //update and save each books`s shelf according to the current shelf
handleShelfChange(book,shelf){
	BooksAPI.update(book,shelf)
		.then(()=>{
		book.shelf= shelf;
		this.setState(ourState=>({
		books: ourState.books.filter((item)=>item.id !== book.id).concat([book])
	}))
	})
}
  render() {
    return (
      <div className="app">
		<Route  path="/search" render={() =>(
       	<SearchApp 
		onChangeShelf={(book,shelf)=>{this.handleShelfChange(book,shelf)}} 
		allShelfBooks={this.state.books}/>
		)}/>

		<Route exact path="/" render={()=>(
			<div>
			<BookList 
				title={'Currently Reading'} 
				Books={this.state.books.filter(item=> item.shelf==='currentlyReading')} 
				onChangeShelf={(book,shelf)=>{this.handleShelfChange(book,shelf)}}/>		  
			<BookList title={'Want to read'} 
				Books={this.state.books.filter(item=> item.shelf==='wantToRead')} 
				onChangeShelf={(book,shelf)=>{this.handleShelfChange(book,shelf)}} />						 
			<BookList title={'Read'} 
				Books={this.state.books.filter(item=> item.shelf==='read')} 
				onChangeShelf={(book,shelf)=>{this.handleShelfChange(book,shelf)}} />						  
			</div>
       		 
		)}/>
 </div>
 
    )
  }
}

export default BooksApp
