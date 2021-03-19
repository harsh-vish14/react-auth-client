import { useContext, useState } from 'react'
import { IoMdArrowDropdown, CgProfile, HiUserGroup, FiLogOut } from 'react-icons/all';
import { Redirect } from "react-router";
import './navbar.css'
import { auth } from '../../../firebase';
import { UserContext } from '../../../context/contextUserInfo';
const Navbar = ({ navInfo }) => {
    const [user, setuser] = useContext(UserContext).user;
    const [logout, setLogout] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const handelClicked = () => {
        if (showOptions === false) {
        setShowOptions(true);
        } else {
        setShowOptions(false);
        }
    }
    const Logout = async () => {
        await auth.signOut()
            .then(() => {
                setuser(null)
            })
            .then(() => {
                setLogout(true);
            });
    };
    return (
        <div className='navbar'>
            {logout?(<Redirect to='/login' />):(null)}
            <div className='logo'>
                devchalleges.io
            </div>
            <div className='userInfo' onClick={handelClicked}>
                <div className='user_photo'>
                    {
                        navInfo.photo ? (
                            <img src={`${navInfo.photo}`} />
                        ): (
                            <img src={`${process.env.PUBLIC_URL}/images/default_logo.svg`} />
                        )
                    }
                </div>
                <div className='user_name'>
                    {
                        navInfo.name ? (
                            <>{navInfo.name}</>
                        ): (
                            <></>
                        )
                    }
                </div>
                <IoMdArrowDropdown style={{ transform: showOptions?('rotate(180deg)'):('rotate(0deg)') }} />
                <div className='options' style={{display: showOptions?(''):('none')}} onMouseLeave={()=>{setShowOptions(false)}}>
                    <div className=''>
                        <CgProfile style={{marginRight:'3px'}} /> My Profile
                    </div>
                    <div className=''>
                        <HiUserGroup style={{marginRight:'3px'}} /> Group Chat
                    </div>
                    <div className='logout' onClick={() => {Logout()}}>
                        <FiLogOut /> Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;