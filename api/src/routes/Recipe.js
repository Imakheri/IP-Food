const { Router } = require('express');
const { Recipe, Diet } = require('../db');

const router = Router();

router.post('/', async (req, res, next) => {
    let {
        name,
        summary,
        img,
        score,
        healthy,
        steps,
        diets
    } = req.body

    try {
        const recipeCreated = await Recipe.create ({
            name,
            summary,
            img,
            score,
            healthy,
            steps,
            // createdInDb
        })
        
        let dbTypeOfDiet = await Diet.findAll({
            //el tipo de dieta lo creo con lo que ya tengo en mi db
            where: { name: diets },
          });
          recipeCreated.addDiet(dbTypeOfDiet);

        res.send(recipeCreated)
    }
    catch (error) {
        next(error)
    }

})

module.exports = router;