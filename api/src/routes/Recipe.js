const { Router } = require('express');
const { Recipe } = require('../db');

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
            diets
            // createdInDb
        })
        
        res.send(recipeCreated)
    }
    catch (error) {
        next(error)
    }

})

module.exports = router;