import { createContext, useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGOUT":
            action.payload = null;
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                transaction: [],
                loading: false
            };
        case "LOAD":
            return { ...state, loading: true };
        case "LOAD_TRANSACTION":
            return { ...state, tload: true };
        case "TRANSACTION_FETCHED":
            return { ...state, transaction: action.payload, tload: false };
        default:
            return state;
    }
};

const intialState = {
    user: null,
    loading: true,
    transaction: [],
    tload: false
};

const Context = createContext({});

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, intialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export { Context, Provider };
