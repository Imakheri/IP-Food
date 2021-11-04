const { Router } = require('express');
const recipeRoute = require('./Recipes');
const dietRoute = require('./Diet');
const recipePostRoute = require('./Recipe');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/recipes', recipeRoute);
router.use('/recipe', recipePostRoute);
router.use('/types', dietRoute);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
