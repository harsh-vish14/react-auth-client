import { useContext,useState } from 'react';
import { MdEmail, RiLockPasswordFill } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/contextUserInfo';
import { auth } from '../../../firebase';
import '../auth.css'
import Options from '../signOptions/signOptions';
const Register = () => {
    const [user, setuser] = useContext(UserContext).user;
    const [emailerror, setemailerror] = useState(false);
    const [email, setemail] = useState(false);
    const [smallPassword, setSmallPassword] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const handleChanged = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setemailerror(false);
        setSmallPassword(false);
        setInputs((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const signUp = async () => {
        await auth.createUserWithEmailAndPassword(inputs.email, inputs.password)
            .then((res) => {
                
                setuser(res.user);
            })
            .catch((err) => {
                if (err.message == 'The email address is badly formatted.') {
                    setemailerror(true);
                }
                if (err.message == 'The email address is already in use by another account.') {
                    setemail(true);
                }
                if (err.message == 'Password should be at least 6 characters') {
                    setSmallPassword(true)
                }
            })
    };
    return (
        <div className='auth-input'>
            <div className='logo'>
                devchalleges.io
            </div>
            <div className='info'>
                <div className='title'>
                    Join thousands of learners from around the world
                </div>
                <div className='sub-content'>
                    Master web development by making real-life projects. There are multiple paths for you to choose
                </div>
            </div>
            {email ? (<div style={{ color:'red'}}>User Already exits</div>):null}
            <div className='inputs'>
                <div className='email'>
                    <MdEmail className='icon' />
                    <input type='text' placeholder='Email' name='email' onChange={handleChanged} value={inputs.email} />
                </div>
                {emailerror ? (<div style={{ color:'red',fontSize:'15px'}}>PLs provide correct email</div>):null}
                <div className='password'>
                    <RiLockPasswordFill className='icon' />
                    <input type='password' placeholder='Password' name='password' onChange={handleChanged} value={inputs.password} />
                </div>
                {smallPassword ? (<div style={{ color: 'red',fontSize:'15px' }}>Password Must be at least 6 characters</div>) : null}
            </div>
            <div className='proceed' onClick={signUp}>
                Start coding now
            </div>
            <Options />
            <div style={{ textAlign: 'center', fontSize: '13px' }}>
                Already a member?<Link to='/login'>Login</Link>
            </div>
        </div>
    );
}

export default Register;