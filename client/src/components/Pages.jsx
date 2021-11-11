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
                    {pageNumbers.length === 1 ? (
                        <div></div>
                    ) : (
                        pageNumbers?.map(number => {
                            return(
                            <li key={number}>
                                <button className='numbers' onClick={() => pages(number)}>{number}</button>
                            </li>
                            )
                        })
                 )}
                </ul>
                
        </nav>
    )
}