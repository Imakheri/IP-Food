import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetail(){
    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch])

    const myRecipe = useSelector((state) => state.detail)
    console.log(myRecipe)
    console.log(myRecipe.steps)
    return (
        <div>
            {
                myRecipe?
                <div>
                    <h1>{myRecipe.name}</h1>
                    <img src= {myRecipe.img} alt="image not found" width="500px" height="700px"/>
                    <h2>Dish Type: {myRecipe.dish}</h2>
                    <h3>Diet Type: {myRecipe.diet + ' '}</h3>
                    <h5>Summary: {myRecipe.summary}</h5>
                    <h5>Score: {myRecipe.score}</h5>
                    <h5>Healthyness Level: {myRecipe.healthy}</h5>
                    <h5>Pasos: {myRecipe.steps.map(el => el.step)}</h5>
                </div> 
                
                : <p>Loading...</p>
            }
            <Link to='/home'><button>Go Back</button></Link>
        </div>
    )
}
