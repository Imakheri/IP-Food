const { Router } = require('express');
const { Diet } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// hay que hacer un array con strings de esas dietas y se guardan en el modelo de dietas y se le hace el findOrCreate


const router = Router();

router.get('/', async (req, res, next) => {
    const dietType = ['Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Low FODMAP','Whole30'];
    dietType.forEach ( el=> {
        console.log(el)
        Diet.findOrCreate({
            where: { name: el }
        })
    })
    const allDiets = await Diet.findAll();
    res.send(allDiets)
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;