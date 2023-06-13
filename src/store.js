import { createStore } from "redux";

const initialState = {
    width: 10,
    height: 10,
    blackHoleCount: 10,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WIDTH':
            return { ...state, width: action.payload };
        case 'SET_HEIGHT':
            return { ...state, height: action.payload };
        case 'SET_BLACK_HOLE_COUNT':
            return { ...state, blackHoleCount: action.payload };
        default:
            return state;
    }
};

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;