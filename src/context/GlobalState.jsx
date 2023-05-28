import { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
//useReducer es una mejor opcion que useSatte

export const Context = createContext();

const initialState = {
    transactions: []
}

export const useGlobalState = () => {
    const context = useContext(Context)
    return context
}

//este será un componente que englobará a otros, tendrá valores que cualquier otro componente que vaya dentro va poder acceder
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState,
        ()=>{
            const localData = localStorage.getItem('transactions')
            return localData ? JSON.parse(localData): initialState;
        })
    
    useEffect(()=>{
        localStorage.setItem('transactions', JSON.stringify(state))
    }, [state])

    const addTransaction = (transaction) => {
        dispatch({
            type: "ADD_TRANSACTION",
            payload: transaction
        })
    }

    const deleteTransaction = (id) => {
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id
        })
    }

    return (
        <Context.Provider 
            value={{
                transactions: state.transactions,
                addTransaction,
                deleteTransaction
            }}>

            {children}
        </Context.Provider>
    )
};
