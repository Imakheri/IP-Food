import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipesByDiets, orderByName, orderByScore } from '../actions';
import { Link } from 'react-router-dom';
import Recipe from './Recipe';
import Pages from './Pages';
import SearchBar from './SearchBar';

export default function Home(){

    const dispatch = useDispatch();
    const allRecipes = useSelector ((state) => state.recipes);
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const pages = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getRecipes())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterStatus(e){
        dispatch(filterRecipesByDiets(e.target.value))
    }

    function handleSort(e){
        e.preventDefault(e);
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }

    function handleSortScore(e){
        e.preventDefault(e);
        dispatch(orderByScore(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }

return (
    <div>
        <Link to='/recipe'>¡Create your own recipe!</Link>
        <button onClick={e=> {handleClick(e)}}>Refresh</button>
        <div>
            {/* Filtrar por orden alfabetico */}
            <select onChange={e => handleSort(e)}>
                <option value='asc'>A - Z</option>
                <option value='desc'>Z - A</option>
            </select>
            {/* Filtrado por puntuación */}
            <select onChange={e => handleSortScore(e)}>
                <option value='asc'>Menor a mayor</option>
                <option value='desc'>Mayor a menor</option>
            </select>
            {/* FIltrar por tipo de dieta */}
            <select onChange={e => handleFilterStatus(e)}>
                <option value='All'>All</option>
                <option value='gluten free'>Gluten Free</option>
                <option value='dairy free'>Dairy Free</option>
                <option value='vegetarian'>Vegetarian</option>
                <option value='lacto-vegetarian'>Lacto-Vegetarian</option>
                <option value='ovo-vegetarian'>Ovo-Vegetarian</option>
                <option value='vegan'>Vegan</option>
                <option value='pescatarian'>Pescetarian</option>
                <option value='paleolithic'>Paleolithic</option>
                <option value='primal'>Primal</option>
                <option value='fodmap friendly'>Low FODMAP</option>
                <option value='whole30'>Whole30</option>
            </select>
            <Pages recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pages={pages} />
            <SearchBar />
            {
              currentRecipes?.map((el) => {
                  return(
                      <fragment className='recipe'>
                          <Link to={'/home/' + el.id}>
                              <Recipe name={el.name} image={el.img} diets={el.diets} key={el.id} />
                          </Link>
                      </fragment>
                  );
              })
            }

        </div>
    </div>
)

}