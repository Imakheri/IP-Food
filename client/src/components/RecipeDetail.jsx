import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles/RecipeDetail.css';

export default function RecipeDetail(){
    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch])

    const myRecipe = useSelector((state) => state.detail)
    return (
        <div className='recipeDetail'>
            {
                myRecipe?
                <div>
                    <h1>{myRecipe.name}</h1>
                    <img src= {myRecipe.img} alt="image not found"/>
                    {
                        myRecipe.dish ?
                        <h2>Dish Type: {myRecipe.dish}</h2> : null
                    }
                    <h3>Diet Type: {myRecipe.diet + ' '}</h3>
                    <div dangerouslySetInnerHTML={{ __html: myRecipe.summary }}/>
                    <h5>Score: {myRecipe.score}</h5>
                    <h5>Healthyness Level: {myRecipe.healthy}</h5>
                    {
                        myRecipe.steps ?
                        <h5>Steps: <div dangerouslySetInnerHTML={{ __html: myRecipe.steps }}/></h5> : null

                    }
                </div> 
                
                : <p>Recipe not found</p>
            }
            <Link to='/home'><button>Go Back</button></Link>
        </div>
    )
}
