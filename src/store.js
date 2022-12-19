import React from 'react';
import * as actionTypes from './actionTypes'


const Store = React.createContext();
Store.displayName = 'Store';
let authData = JSON.parse(localStorage.getItem('auth'))

export const initialState = {
    user: {
        userType: '',
        ...authData
    } || null,
    isLoading: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            const { user } = action.payload
            localStorage.setItem('auth', JSON.stringify(user))
            return { ...state, isLoading: false, user }
        case actionTypes.LOGOUT_SUCCESS:
            return { ...initialState }
        default:
            return state;
    }
};

export const useStore = () => React.useContext(Store);
export const Provider = ({ children, initialState, reducer }) => {
    const [globalState, dispatch] = React.useReducer(reducer, initialState);
    return <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>;
};