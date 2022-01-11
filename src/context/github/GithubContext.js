import {createContext, useReducer} from "react"
import githubReducer from "../GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL 

//the children are whatever we surround with the Github provider
export const GithubProvider = ({children})=> {
    const initialState = {
        users: [], 
        loading: false,
        user: {}
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`)

        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    //get a single user
    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`)

        //if there is a problem with the login name, it will redirect to a 404
        if(response.status===404){
            window.location="/notfound"
        } else {
            const data = await response.json()

            dispatch({
                type: 'GET_USER',
                //data is the single user that comes back from the response
                payload: data
            })
        }   
    }
    

    //set loading
    const setLoading = ()=> dispatch({type: 'SET_LOADING'})

    //clear users from state
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user, 
        searchUsers, 
        clearUsers, 
        getUser
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext

//after creating this, then you need to wrap your components in your app.j