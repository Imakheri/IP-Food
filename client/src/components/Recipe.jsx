import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Recipe.css';

export default function Recipe({name, image, diets, id}) {
    return (
        <div className='containerRecipe'>
            <h3>{name}</h3>
            <img className='recipeImage'src={image} alt='Image not found'/>
            <h4>Diets Types: {diets + ' '}</h4>
            <Link to={'/home/' + id}><button className='refreshButton'>Detail</button></Link>
        </div>
    );
}