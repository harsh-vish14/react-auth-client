import { useContext, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Home from './components/home/home';
import { UserContext } from './context/contextUserInfo';
import { auth } from './firebase';

function App() {
  const [user, setuser] = useContext(UserContext).user;
     useEffect(() => {
       auth.onAuthStateChanged((userAuth) => {
          
          if (userAuth) {
              
            setuser(userAuth);
            
          }
        })
     }, [user])
    useEffect(async () => {
        if (user != null) {
            await fetch('https://protected-brushlands-07478.herokuapp.com/API/v1/register-user',
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
              })
              .then((res) => {
                
          })
        }
    },[user]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        {
          user != null ? (
            <Route path='/'>
              <Home />
            </Route>
          ) : (
            <Redirect to='/register' />
          )
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;

{/* <div>
        <button onClick={Google}>
          google Sign In
      </button>  
      </div>
      <div>
        <button onClick={Github}>
          Github Sign In
      </button>
      </div>
      <div>
        <button onClick={Facebook}>
          FaceBook Sign In
      </button>
      </div>
      <div>
        <button onClick={Twitter}>
          Twitter Sign In
      </button>
      </div>
      <div>
        <button onClick={Logout}>
          Logout from all
      </button>
      </div> */}