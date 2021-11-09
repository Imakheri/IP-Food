import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postRecipe, getDiets } from '../actions/index';
import { useDispatch , useSelector } from 'react-redux';

export default function CreateRecipe(){
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);

    const [input, setInput] = useState({
        name : '',
        summary : '',
        img: '',
        score: '',
        healthy : '',
        steps: '',
        diets: []
    });

    console.log('Este es el input', input);

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleChangeCheckbox(e){
        setInput({
            ...input,
            diets : e.target.value
        })
    }

    function handleOnSubmit(e){
        e.preventDefault()
        dispatch(postRecipe(input))
        alert('¡Recipe created successfully!')
        setInput({
            name : '',
            summary : '',
            img: '',
            score: '',
            healthy: '',
            steps: '',
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
                    <label>Image:</label>
                    <input type='url' value={input.img} name='img' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Score:</label>
                    <input type='number' min='0' max='100' value={input.score} name='score' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Healthyness score:</label>
                    <input type='number' min='0' max='100' value={input.healthy} name='healthy' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Steps:</label>
                    <input type='text' value={input.steps} name='steps' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Diets:</label>
                    <label><input type='checkbox' value={input.diets} name='gluten free' onChange={(e) => handleChangeCheckbox(e)}/>Gluten Free</label>
                    <label><input type='checkbox' value={input.diets} name='dairy free' onChange={(e) => handleChangeCheckbox(e)}/>Dairy Fre</label>
                    <label><input type='checkbox' value={input.diets} name='vegetarian' onChange={(e) => handleChangeCheckbox(e)}/>Vegetarian</label>
                    {/* <label><input type='checkbox' value='lacto vegetarian' name='lacto vegetarian' />Lacto-Vegetarian</label>
                    <label><input type='checkbox' value='ovo vegetarian' name='ovo vegetarian' />Ovo-Vegetarian</label> */}
                    <label><input type='checkbox' value={input.diets} name='lacto ovo vegetarian' onChange={(e) => handleChangeCheckbox(e)}/>Lacto-Ovo-Vegetarian</label>
                    <label><input type='checkbox' value={input.diets} name='vegan' onChange={(e) => handleChangeCheckbox(e)}/>Vegan</label>
                    <label><input type='checkbox' value={input.diets} name='pescatarian' onChange={(e) => handleChangeCheckbox(e)}/>Pescatarian</label>
                    <label><input type='checkbox' value={input.diets} name='paleolithic' onChange={(e) => handleChangeCheckbox(e)}/>Paleolithic</label>
                    <label><input type='checkbox' value={input.diets} name='primal' onChange={(e) => handleChangeCheckbox(e)}/>Primal</label>
                    <label><input type='checkbox' value={input.diets} name='fodmap frienly' onChange={(e) => handleChangeCheckbox(e)}/>fodmap friendly</label>
                    <label><input type='checkbox' value={input.diets} name='whole30' onChange={(e) => handleChangeCheckbox(e)}/>Whole30</label>
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )

}