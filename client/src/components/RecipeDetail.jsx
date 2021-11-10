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
                <div className='recipeCard'>

                    <div className='recipeTitle'>
                        <h1>{myRecipe.name}</h1>
                    </div>

                    <div className='recipeGroup'>
                        <div className='imgDetail'>
                        <img className='recipeImageDetail' src= {myRecipe.img
                                    ? myRecipe.img
                                    : 'https://codes.unidepix.com/img/default.png'} alt="image not found"/>
                        </div>
                    <div className='recipeInfo'>
                        {
                            myRecipe.dish ?
                            <div className='recipeType'><h2>Dish Type: {myRecipe.dish}</h2></div> : null
                        }

                        <div>
                            <h2> Diet Types :
                        {
                            !myRecipe.createdInDb ?
                            myRecipe.diets + ' '
                            : myRecipe.diets.map(el => ' ' + el.name + ' ') 
                        }
                            </h2>
                        </div>

                            <div className='recipeSummary'>
                                <p><div dangerouslySetInnerHTML={{ __html: myRecipe.summary }}/></p>
                            </div>
                        </div>
                    </div>
                    <div className='recipeScores'>
                        <div className='recipeScore'>
                            <h2>Score: {myRecipe.score}</h2>
                        </div>
                        <div className='recipeHealthy'>
                            <h2>Healthyness Level: {myRecipe.healthy}</h2>
                        </div>
                    </div>
                    {
                        myRecipe.steps ?
                        <div classame='recipeSteps'>
                            <div dangerouslySetInnerHTML={{ __html: myRecipe.steps }}/>
                        </div> : null

                    }
                </div> 
                
                : <p>Recipe not found</p>
            }
            <div className='recipeButton'>
            <Link to='/home'><button className='refreshButton'>Go Back</button></Link>
            </div>
        </div>
    )
}
