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
            <div className='buttonContainer'>
                <Link to= '/home'><button className='refreshButton'>Back</button></Link>
            </div>
            <form onSubmit={(e) => handleOnSubmit(e)}>
            <div className='inputContainer'>   
                <h1>¡Share your recipe with the whole world!</h1>
                <div className='inputCreateContainer'>
                    <div className='labelCreate'>
                        <label>Name: </label>
                    </div>
                    <div className='inputCreate'>
                        <input className='inputo' type='text' value={input.name} name='name' autocomplete="off" onChange={(e) => handleChange(e)} required/>
                    </div>
                </div>
                <div className='inputCreateContainer'>
                    <div className='labelCreate'>
                        <label>Summary:</label>
                    </div>
                    <div className='inputCreate'>
                        <input className='inputo' type='text' value={input.summary} name='summary' autocomplete="off" onChange={(e) => handleChange(e)} required/>
                    </div>
                </div>
                <div className='inputCreateContainer'>
                    <div className='labelCreate'>
                        <label>Image:</label>
                    </div>
                    <div className='inputCreate'>
                        <input className='inputo' type='url' value={input.img} name='img' autocomplete="off" onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div className='inputCreateContainer'>
                    <div className='labelCreate'>
                        <label>Score: </label>
                    </div>
                    <div className='inputCreate'>
                        <input className='inputo' type='number' min='0' max='100' value={input.score} name='score' autocomplete="off" onChange={(e) => handleChange(e)} required/>
                    </div>
                </div>
                <div className='inputCreateContainer'>
                    <div className='labelCreate1'>
                        <label>Healthyness score:</label>
                    </div>
                    <div className='inputCreate'>
                        <input className='inputo' type='number' min='0' max='100' value={input.healthy} name='healthy' autocomplete="off" onChange={(e) => handleChange(e)} required/>
                    </div>
                </div>
                <div className='inputCreateContainer'>
                    <div className='labelCreate'>
                        <label>Steps:</label>
                    </div>
                    <div className='inputCreate'>
                        <input className='inputo' type='text' value={input.steps} name='steps' autocomplete="off" onChange={(e) => handleChange(e)} required/>
                    </div>
                </div>
                    <h2>Diet Types:</h2>

                <div className='checkboxContainer'>
                {
                    diets.map(el => <div>
                                        <label>{el.name}</label>
                                            <input type='checkbox' value={el.name} name={el.name} onChange={(e) => handleChangeCheckbox(e)} />
                                    </div>)

                }
                </div>
            </div>     

                <div>
                    <button className='buttonContainerBottom' type='submit'>Create</button>
                </div>
            </form>
        </div>
    )

}