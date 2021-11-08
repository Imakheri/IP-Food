import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../actions/index';
import { useDispatch , useSelector } from 'react-redux';

export default function CreateRecipe(){
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);

    const [input, setInput] = useState({
        name : '',
        summary : '',
        score : '',
        healthy : '',
        steps : '',
        diets: []
    });

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleOnSubmit(e){
        e.preventDefault()
        dispatch(postRecipe(input))
        alert('Recipe Created :O')
        setInput({
            name : '',
            summary : '',
            score : '',
            healthy : '',
            steps : '',
            diets: []
        });
    }

    return(
        <div>
            <Link to= '/home'><button>Back</button></Link>
            <h1>¡Create your own recipe!</h1>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} required/>
                </div>
                <div>
                    <label>Summary:</label>
                    <input type='text' value={input.summary} name='summary' onChange={(e) => handleChange(e)} required/>
                </div>
                <div>
                    <label>Score:</label>
                    <input type='number' value={input.score} name='score' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Healthyness score:</label>
                    <input type='number' value={input.healthy} name='healthy' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Diets:</label>
                    <label><input type='checkbox' value='gluten free' name='gluten free' />Gluten Free</label>
                    <label><input type='checkbox' value='dairy free' name='dairy free' />Dairy Fre</label>
                    <label><input type='checkbox' value='vegetarian' name='vegetarian' />Vegetarian</label>
                    <label><input type='checkbox' value='lacto vegetarian' name='lacto vegetarian' />Lacto-Vegetarian</label>
                    <label><input type='checkbox' value='ovo vegetarian' name='ovo vegetarian' />Ovo-Vegetarian</label>
                    <label><input type='checkbox' value='lacto ovo vegetarian' name='lacto ovo vegetarian' />Lacto-Ovo-Vegetarian</label>
                    <label><input type='checkbox' value='vegan' name='vegan' />Vegan</label>
                    <label><input type='checkbox' value='pescatarian' name='pescatarian' />Pescatarian</label>
                    <label><input type='checkbox' value='paleolithic' name='paleolithic' />Paleolithic</label>
                    <label><input type='checkbox' value='primal' name='primal' />Primal</label>
                    <label><input type='checkbox' value='fodmap friendly' name='fodmap frienly' />fodmap friendly</label>
                    <label><input type='checkbox' value='whole30' name='whole30' />Whole30</label>
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )

}