import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipesByDiets, orderByName, orderByScore } from '../actions';
import { Link } from 'react-router-dom';
import Recipe from './Recipe';
import Pages from './Pages';
import SearchBar from './SearchBar';
import './styles/Home.css'

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
        <div>
            <nav className='navbar'>
                <div className='create'>
                    <Link to='/recipe'><button className='createButton'>¡Create your own recipe!</button></Link>
                </div>
                <div className='refresh'>
                    <button className='refreshButton' onClick={e=> {handleClick(e)}}>Refresh</button>
                </div>
                <div className='filters'>
                    {/* Filtrar por orden alfabetico */}
                    <div className='alphabethic'>
                        <select className='alpha' onChange={e => handleSort(e)}>
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>
                    </div>
                    {/* Filtrado por puntuación */}
                    <div>
                        <select className='score' onChange={e => handleSortScore(e)}>
                            <option value='asc'>Menor a mayor</option>
                            <option value='desc'>Mayor a menor</option>
                        </select>
                    </div>
                    {/* FIltrar por tipo de dieta */}
                    <div>
                        <select className='diet' onChange={(e) => handleFilterStatus(e)}>
                            <option value='All'>All</option>
                            <option value='gluten free'>Gluten Free</option>
                            <option value='dairy free'>Dairy Free</option>
                            <option value='vegetarian'>Vegetarian</option>
                            <option value='lacto ovo vegetarian'>Lacto-Ovo-Vegetarian</option>
                            <option value='ovo vegetarian'>Ovo-Vegetarian</option>
                            <option value='vegan'>Vegan</option>
                            <option value='pescatarian'>Pescetarian</option>
                            <option value='paleolithic'>Paleolithic</option>
                            <option value='primal'>Primal</option>
                            <option value='fodmap friendly'>Low FODMAP</option>
                            <option value='whole30'>Whole30</option>
                        </select>
                    </div>
                </div>
                <div className='searchbar'>
                    <SearchBar />
                </div>
            </nav>
            <div className='pages'>
                <Pages recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pages={pages} />
            </div>
            <div className='background'>
                <div className='recipes'>
                    {
                        currentRecipes?.map((el) => {
                            return(
                                <div>
                                    <Recipe name={el.name} image={el.img} diets={!el.createdInDb ? el.diets : el.diets.map (el => el.name) } id={el.id} key={el.id}/>
                                </div>
                        );
                    })
                }
                </div>
            </div>
        </div>
    </div>
)

}