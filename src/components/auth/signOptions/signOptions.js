import { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../../context/contextUserInfo";
import { auth } from '../../../firebase';
import {facebookSignIn, GithubSignIn, googleSignIn, twitterSignIn } from '../../../services/auth';
const Options = () => {
    const [user, setuser] = useContext(UserContext).user;
    
    const Google = async () => {
        var user = await googleSignIn();
        setuser(user);
        
    }
    const Twitter = async () => {
        var user = await twitterSignIn();
        setuser(user);
        
    }
    const Facebook = async () => {
        var user = await facebookSignIn();
        setuser(user);
        
    }
    const Github = async () => {
        var user = await GithubSignIn();
        setuser(user);
        
    }

    return (
        <div>
            {user?(<Redirect to='/' />):(null)}
            <div className='text'>
                or continue with social profile
            </div>
            <div className='links'>
                <div onClick={Facebook}>
                    <img className='facebook' src={`${process.env.PUBLIC_URL}/images/Facebook.svg`} alt='facebook' />
                </div>
                <div onClick={Github}>
                    <img className='github' src={`${process.env.PUBLIC_URL}/images/Gihub.svg`} alt='Github' />
                </div>
                <div onClick={Google}>
                    <img className='Google' src={`${process.env.PUBLIC_URL}/images/Google.svg`} alt='Google' />
                </div>
                <div onClick={Twitter}>
                    <img className='twitter' src={`${process.env.PUBLIC_URL}/images/Twitter.svg`} alt='Twitter' />
                </div>
            </div>
        </div>
    )
};

export default Options