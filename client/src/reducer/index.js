const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: []
}

function rootReducer( state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'FITLER_BY_DIET':
            const allRecipes = state.allRecipes;
            const recipesFiltered = action.payload === 'All' ? allRecipes : allRecipes.filter(el => {el.diets.map(el => el === action.payload)});
            return {
                ...state,
                recipes: recipesFiltered
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'ORDER_BY_NAME':
            let sortedArray = action.payload === 'asc'?
                state.recipes.sort(function (a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a, b) {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sortedArray
            }
        case 'ORDER_BY_SCORE':
            let srtdArr = action.payload === 'asc'?
                state.recipes.sort(function (a, b) {
                    if(a.score > b.score) {
                        return 1;
                    }
                    if(a.score < b.score) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a, b) {
                    if(a.score > b.score) {
                        return -1;
                    }
                    if(a.score < b.score) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: srtdArr
            }
        case 'GET_NAME_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default rootReducer;