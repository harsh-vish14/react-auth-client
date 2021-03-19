import { MdEmail, RiLockPasswordFill } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Options from '../signOptions/signOptions';
import { UserContext } from '../../../context/contextUserInfo';
import '../auth.css'
import { auth } from '../../../firebase';
const Login = () => {
    const [emailerror, setemailerror] = useState(false);
    const [nouser, setnouser] = useState(false);
    const [user, setuser] = useContext(UserContext).user;
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    
    const handleChanged = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setemailerror(false);
        setInputs((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const Signin = async () => {
        await auth.signInWithEmailAndPassword(inputs.email, inputs.password)
            .then((res) => {
                
                
                setuser(res.user);
            })
            .catch((err) => {
                if (err.message === 'The email address is badly formatted.') {
                // TODO:add bad email err
                    setemailerror(true);
                }
                if (err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.' || err.message === 'The password is invalid or the user does not have a password.') {
                    // TODO:add no user
                    setnouser(true);
                }
        })
    }
    return (
        <div className='auth-input'>
            <div className='logo'>
                devchalleges.io
            </div>
            <div className='info' style={{fontSize:'30px',margin:'20px'}}>
                Login
            </div>
            {nouser ? (<div style={{ color:'red'}}>Invalid email or password</div>):null}
            <div className='inputs'>
                <div className='email'>
                    <MdEmail className='icon' />
                    <input name='email' type='email' placeholder='email' onChange={handleChanged} value={inputs.email} />
                </div>
                    {emailerror ? (<div style={{ color:'red',fontSize:'15px'}}>PLs provide correct email</div>):null}
                <div className='password'>
                    <RiLockPasswordFill className='icon' />
                    <input name='password' type='password' placeholder='password' onChange={handleChanged} value={inputs.password} />
                </div>
            </div>
            <div className='proceed' onClick={Signin}>
                Login
            </div>
            <Options />
            <div style={{ textAlign: 'center', fontSize: '13px' }}>
                Not have a Account?<Link to='/register'>Register</Link>
            </div>
        </div>
    )
}

export default Login;