import { auth, facebookProvider, githubProvider, googleProvider, storage, twitterProvider } from "../firebase";


const googleSignIn = async () => {
    let user;
    await auth.signInWithPopup(googleProvider)
        .then((res) => {
            user = res.user;
        }).catch((err) => {
            console.error(err);
        })
    return user;
};
const facebookSignIn = async () => {
    let user;
    await auth.signInWithPopup(facebookProvider)
        .then((res) => {
            user = res.user;
        }).catch((err) => {
            
            console.error(err);
        })
    return user;
};
const GithubSignIn = async () => {
    let user;
    await auth.signInWithPopup(githubProvider)
        .then((res) => {
            user = res.user;
        }).catch( async (err) => {
            console.error(err);
        })
    return user;
};
const twitterSignIn = async () => {
    let user;
    await auth.signInWithPopup(twitterProvider)
        .then((res) => {
            user = res.user;
        }).catch((err) => {
            console.error(err);
        })
    return user;
};

const logOut = async () => {
    let success;
    await auth.signOut()
        .then(() => {
            success = true;
        })
        .catch((err) => {
            
            success = false
        })
    return success;
}


export { logOut, facebookSignIn, googleSignIn, twitterSignIn, GithubSignIn};