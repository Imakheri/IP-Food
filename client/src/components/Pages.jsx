import React from 'react';
import './styles/Pages.css';

export default function Pages({recipesPerPage, allRecipes, pages}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
                <ul className='pages'>
                    {
                        pageNumbers?.map(number => {
                            return(
                            <li className='numbers' key={number}>
                                <a onClick={() => pages(number)}>{number}</a>
                            </li>
                            )
                        })
                    }
                </ul>
        </nav>
    )
}