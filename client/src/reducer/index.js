const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
    loading: false
}

function rootReducer( state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                loading: false
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'FILTER_BY_DIET':
            const fullRecipes = state.allRecipes;
            const recipesFiltered = action.payload === 'All' ? fullRecipes : fullRecipes.filter(el => el.diets.includes(action.payload) || el.diets.map((e) => e.name).includes(action.payload));
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
        case 'LESS':
            const allRecipes = state.allRecipes;
            const filteredByNumber = allRecipes.filter(el => el.score < 98)
            console.log(filteredByNumber)
            return{
                ...state,
                recipes: filteredByNumber
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
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default rootReducer;