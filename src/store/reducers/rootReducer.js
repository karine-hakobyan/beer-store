const initState = {
    count: 0
}
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_CART_COUNT':
            let addCount = ++state.count
            return {
                ...state,
                count: addCount
            }
        case 'SUBTRACT_CART_COUNT':
            let subCount = --state.count
            return {
                ...state,
                count: subCount
            }
        default:
            return state
    }
    // if (action.type === 'ADD_CART_COUNT') {
    //     let newCount = ++state.count
    //     return {
    //         ...state,
    //         count: newCount
    //     }
    // }

}

export default rootReducer;

