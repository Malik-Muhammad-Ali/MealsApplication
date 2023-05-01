import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const allMealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=a`;
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({children})=>{

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  const fetchMeals = async (url)=>{
    try{
      const {data} = await axios(url)
      if(data.meals){
        setMeals(data.meals)
      }else{
        setMeals([])
      }
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  const fetchRandomMeal = ()=>{
    setSearchTerm('');
    fetchMeals(randomMealUrl);
  }

  const selectMeal = (idMeal, favoriteMeal)=>{
    let meal;
    if(favoriteMeal){
      meal = favorites.find((meal)=> meal.idMeal === idMeal);
    }else{
      meal = meals.find((meal)=> meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  }

  const closeModal = ()=>{
    setShowModal(false);
    setSelectedMeal(null);
  }

  const addToFavorite = (idMeal)=>{
    const alreadyFavorite = favorites.find((meal)=> meal.idMeal === idMeal);
    if(alreadyFavorite) return
    
    const meal =  meals.find((meal)=> meal.idMeal === idMeal);
    const updateFavorites = [...favorites, meal];
    setFavorites(updateFavorites);
  }

  const removeFavorite = (idMeal)=>{
    const updateFavorites = favorites.filter((meal)=> meal.idMeal !== idMeal);
    setFavorites(updateFavorites);
  }

  useEffect(()=>{
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])
  
  useEffect(()=>{
    fetchMeals(allMealUrl)
  }, [])

  useEffect(()=>{
    if(!searchTerm) return
    fetchMeals(`${allMealUrl}${searchTerm}`)
  }, [searchTerm])

  
  return <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, addToFavorite, removeFavorite, favorites}}>
    {children}
  </AppContext.Provider>
}

export { AppContext, AppProvider }