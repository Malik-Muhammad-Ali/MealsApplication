import { useContext } from 'react';
import { AppContext } from '../Context';
import { BsHandThumbsUp } from 'react-icons/bs';

const Meals = ()=>{

  const {meals, loading, selectMeal, addToFavorite} = useContext(AppContext);

  if(loading){
    return(
      <section className='section'>
        <h4>Loading...</h4>
      </section>
    )
  }

  if(meals.length < 1){
    return(
      <section className='section'>
        <h4>No Meals Matched Your Search Term. Please Try Again.</h4>
      </section>
    )
  }
  
  return(
    <section className='section-center'>
      {
        meals.map((singleMeal)=>{
          const { idMeal, strMeal: title, strMealThumb: image} = singleMeal
          return(
            <article key={idMeal} className='single-meal'>
              <img src={image} className='img'  onClick={()=> selectMeal(idMeal)}/>
              <footer>
                <h5>{title}</h5>
                <button 
                  className='like-btn' 
                  onClick={()=> addToFavorite(idMeal)}
                ><BsHandThumbsUp /></button>
              </footer>
            </article>
          )
        })
      }
    </section>
  )

  
}

export default Meals;