import React  from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return (
        <div>
            <h1>Welcome to the Recipe App.</h1>
            <Link to="/home">
                <button>¡Go Now!</button>
            </Link>
        </div>
    )
}