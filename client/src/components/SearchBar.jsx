import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeByName } from '../actions';

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
        setName('');
    }

    return (
        <div>
            <input type = 'text' placeholder='Search...' onChange={(e) => handleChange(e)}/>
            <button type='submit' onClick={(e) => handleOnSubmit(e)}>Search</button>
        </div>
    )
}