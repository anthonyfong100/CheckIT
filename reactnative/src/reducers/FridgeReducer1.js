const fridgefoods = (state=[], action) =>{
    switch(action.type){
        case "ADD_FRIDGE_ITEM":
            return [...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }]
        
        case 'TOGGLE_FRIDGE_ITEM':
            return state.map(fridgefood => 
                (fridgefood.id === action.id)
                ? { ...fridgefood, completed: !fridgefood.completed } 
                : fridgefood)

        default: 
            return state
    }
}

export default fridgefoods;