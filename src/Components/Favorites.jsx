import { useContext } from 'react';
import { AppContext } from '../Context';

const Favorites = ()=>{

  const { favorites, selectMeal, removeFavorite } = useContext(AppContext);
  
  return(
    <section className='favorites'>
      <div className='favorites-content'>
        <h5>Favorites</h5>
        {
          favorites.length <= 0 && 
          <h4>No Items Added To Favorites</h4>
        }
        { favorites.length > 0 &&
         <div className='favorites-container'>
          {
            favorites.map((item)=> {
              const { idMeal, strMealThumb: image } = item;
              
              return (
                <div key={idMeal} className='favorite-item'>
                  <img src={image} className='favorites-img img' onClick={()=> selectMeal(idMeal, true)} />
                  <button className='remove-btn' onClick={()=> removeFavorite(idMeal)}>Remove</button>
                </div>
                     )
            })
          }
        </div>
        }
      </div>
    </section>
  )
}

export default Favorites;