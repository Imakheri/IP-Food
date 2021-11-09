const { Router } = require('express');
const axios = require('axios').default;
const { API_KEY } = process.env
const { Recipe, Diet } = require('../db');
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const getApiInfo = async () => {
    const getInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${20}`)
    .catch(error => console.log(error))
    const info = await getInfo.data.results.map (el => {
        return {
            id: el.id,
            name: el.title,
            summary: el.summary,
            dish: el.dishTypes,
            score: el.spoonacularScore,
            healthy: el.healthScore,
            step: el.analyzedInstructions[0]?.steps.map(el => {return { step: el.number + ": " + el.step, }}),
            img: el.image,
            diets: el.diets
        }
    })
    return info;
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attribute: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAll = async () => {
    const getApiInf = await getApiInfo();
    const getDbInf = await getDbInfo();
    const getAllInf = getApiInf.concat(getDbInf);
    return getAllInf;
}

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        const totalRecipes = await getAll();
        if(name) {
            const infoFilter = await totalRecipes.filter (el => el.name.toLowerCase().includes(name.toLowerCase()))
        infoFilter.length ? 
        res.send(infoFilter) : res.status(404).send('Recipe not founded');
        } else {
            res.send(totalRecipes);
        }
    }
    catch (error) {
        next(error)
    }
})

////////////////////////////////////////////////////// GET POR ID /////////////////////////////////////////////////////////////////////

router.get('/:id', async (req, res, next) =>{
    const { id } = req.params;
      try {
        if (typeof id === "string" && id.length > 15) {
          const recipeInDb = await Recipe.findByPk(id, {
            include: Diet,
          });
          return res.send(recipeInDb);
        } else {
          const recipeInApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            return res.json({
                img: recipeInApi.data.image,
                name: recipeInApi.data.title,
                diet: recipeInApi.data.diets,
                dish: recipeInApi.data.dishTypes,
                summary: recipeInApi.data.summary,
                score: recipeInApi.data.spoonacularScore,
                healthy: recipeInApi.data.healthScore,
                steps: recipeInApi.data.instructions
            })
        }
      } catch (error) {
        next(error);
      }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;