import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeByName } from '../actions';
import './styles/SearchBar.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [ name, setName ] = useState('');

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getRecipeByName(name));
    }

    return (
        <div>
            <input className='input' type ='text' placeholder='Search...' onChange={(e) => handleChange(e)}/>
            <button className='searchButton' type='submit' onClick={(e) => handleOnSubmit(e)}>Search</button>
        </div>
    )
}