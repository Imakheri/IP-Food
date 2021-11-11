import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipesByDiets, orderByName, orderByScore, getRecipesByNumber } from '../actions';
import { Link } from 'react-router-dom';
import Recipe from './Recipe';
import Pages from './Pages';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import './styles/Home.css'

export default function Home(){

    const dispatch = useDispatch();
    const allRecipes = useSelector ((state) => state.recipes);
    const loading = useSelector ((state) => state.loading);

    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    console.log(loading)
    
    const pages = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getRecipes())
    }, [dispatch])

    function renderContent(){
        if(loading){
            return (
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
                            <div>
                                Alphabetical Sort:
                            </div>
                            <select className='alpha' onChange={e => handleSort(e)}>
                                <option value='asc'>A - Z</option>
                                <option value='desc'>Z - A</option>
                            </select>
                        </div>
                        {/* Filtrado por puntuación */}
                        <div className='scorecontainer'>
                            <div>
                                Score Sort:
                            </div>
                            <select className='score' onChange={e => handleSortScore(e)}>
                                <option value='asc'>Lower To Higher</option>
                                <option value='desc'>Higher To Lower</option>
                            </select>
                        </div>
                        {/* FIltrar por tipo de dieta */}
                        <div>
                            <div>
                                Filter By Diet Type:
                            </div>
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
                    <Spinner />
                </div>
                <div className='background'></div>
            </div>
            )
        }
        return(
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
                        <div>
                            Alphabetical Sort:
                        </div>
                        <select className='alpha' onChange={e => handleSort(e)}>
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>
                    </div>
                     {/* Filtrado por botón */}
                     <div>
                                <button onClick={e => {handleClickByNumber(e)}}>FIltrar</button>
                    </div>
                    {/* Filtrado por puntuación */}
                    <div className='scorecontainer'>
                        <div>
                            Score Sort:
                        </div>
                        <select className='score' onChange={e => handleSortScore(e)}>
                            <option value='asc'>Lower To Higher</option>
                            <option value='desc'>Higher To Lower</option>
                        </select>
                    </div>
                    {/* FIltrar por tipo de dieta */}
                    <div>
                        <div>
                            Filter By Diet Type:
                        </div>
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
            {currentRecipes.length == 0 ? (
                <h1 className='Error'>¡No recipes found!</h1>
            ) : (
                currentRecipes?.map((e) =>{
                    return (
                        <div>
                            <Recipe
                                key = {e.id}
                                id = {e.id}
                                name = {e.name}
                                image = {
                                    e.img
                                    ? e.img
                                    : 'https://codes.unidepix.com/img/default.png'
                                }
                                diets = {
                                    (!e.createdInDb
                                        ? e.diets + ' '
                                        : e.diets.map((e) => e.name + ' ')) +
                                        '.'
                                }
                            />
                        </div>
                    )
                })
            )
            }
                </div>
            </div>
        </div>
    </div>
        )
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterStatus(e){
        dispatch(filterRecipesByDiets(e.target.value))
        setCurrentPage(1);
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

    function handleClickByNumber(e){
        e.preventDefault();
        dispatch(getRecipesByNumber())
    }

return (
    <div>
        {renderContent()}
    </div>

)

}