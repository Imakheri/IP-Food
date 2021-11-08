import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = '/' element= {<LandingPage/>} />
        <Route path = '/home' element= {<Home/>} />
        <Route path = '/recipe' element= {<CreateRecipe/>} />
        <Route path = '/home/:id' element= {<RecipeDetail/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
