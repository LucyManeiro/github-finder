import {createContext, useReducer} from "react"
import githubReducer from "../GithubReducer"

const GithubContext = createContext()

//the children are whatever we surround with the Github provider
export const GithubProvider = ({children})=> {
    const initialState = {
        users: [], 
        loading: false,
        repos: [],
        user: {}
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    return <GithubContext.Provider value={{
        ...state, 
        dispatch,  
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext

//after creating this, then you need to wrap your components in your app.j