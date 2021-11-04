const { Router } = require('express');
const { Recipe } = require('../db');

const router = Router();

router.post('/', async (req, res, next) => {
    let {
        name,
        summary,
        score,
        healthy,
        step,
        diet
    } = req.body

    try {
        const recipeCreated = await Recipe.create ({
            name,
            summary,
            score,
            healthy,
            step,
            // createdInDb
        })
        
        res.send(recipeCreated)
    }
    catch (error) {
        next(error)
    }

})

module.exports = router;