import { useState, useContext } from 'react';
import { AppContext } from '../Context'

const Search = ()=>{

  const { setSearchTerm, fetchRandomMeal } = useContext(AppContext);
  
  const [text, setText] = useState('');

  const handleChange = (e)=>{
    setText(e.target.value);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(text){
      setSearchTerm(text);
    }
  }
  
  return(
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input 
          value={text}
          type='text' 
          placeholder='Type Favorite Meal' 
          className='form-input' 
          onChange={handleChange}
        />
        <button 
          type='submit' 
          className='btn'
        >Search</button>
        <button 
          type='button' 
          className='btn btn-hipster' 
          onClick={fetchRandomMeal}
        >Suprise Me!</button>
      </form>
    </header>
  )
}

export default Search;