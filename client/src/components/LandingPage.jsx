import React  from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';

export default function LandingPage(){
    return (
        <div className='container'>
            <div className='All'>
                <div className='landing'>
                    <div>
                        <h1>Welcome to the Henry Food App.</h1>
                        <p>This App works like a cookbook. <br />You can search for recipes by name, diet type and even share <br /> your recipes with the whole world.</p>
                        <Link to="/home">
                            <button>¡Go now!</button>
                        </Link>
                    </div>
                </div>
                    <div className='img'></div>
                </div>
                <hr />
                <footer className='footer'>
                    <h5>This web-application was developed by @Imakheri, powered by  <a href='https://www.soyhenry.com/'><img className='logo' src='https://prep.soyhenry.com/logo.png' /></a></h5>
                </footer>
        </div>
    )
}