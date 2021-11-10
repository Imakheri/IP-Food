import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postRecipe, getDiets } from '../actions/index';
import { useDispatch , useSelector } from 'react-redux';
import './styles/CreateRecipe.css';

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
        if(e.target.checked){
        setInput({
            ...input,
            diets : [...input.diets, e.target.value]
        })
        }
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
        <div className='createContainer'>
            <Link to= '/home'><button className='refreshButton'>Back</button></Link>
            <h1>¡Share your recipe with the whole world!</h1>
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
                    <input type='url' value={input.img} name='img' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Score:</label>
                    <input type='number' min='0' max='100' value={input.score} name='score' onChange={(e) => handleChange(e)} required/>
                </div>
                <div>
                    <label>Healthyness score:</label>
                    <input type='number' min='0' max='100' value={input.healthy} name='healthy' onChange={(e) => handleChange(e)} required/>
                </div>
                <div>
                    <label>Steps:</label>
                    <input type='text' value={input.steps} name='steps' onChange={(e) => handleChange(e)} required/>
                </div>

                <div>
                {
                    diets.map(el => <div>
                                        <label>{el.name}</label>
                                            <input type='checkbox' value={el.name} name={el.name} onChange={(e) => handleChangeCheckbox(e)} />
                                    </div>)

                }
                </div>

                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )

}