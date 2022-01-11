//import useEffect because that's what we want to call to get user function
//import useContext because that's where the getUser function is
import {useEffect, useContext} from "react"
import GithubContext from "../context/github/GithubContext"
import {useParams, Link} from "react-router-dom"
import {FaCodepen, FaStore, FaUserFriends, FaUsers} from "react-icons/fa"
import Spinner from "../components/layout/Spinner"

function User() {
    //indicate what we want to get from useContext
    //we want the getUser function, and the user STATE
    const {getUser, user, loading} = useContext(GithubContext)

    const params = useParams()

    useEffect(()=> {
        getUser(params.login)
    }, [])

    const {
        name, 
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user
    
    if(loading){
        return <Spinner/>
    }

    return (
        <div>
            {user.login}
        </div>
    )
}

export default User
