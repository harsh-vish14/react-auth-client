import { useContext, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router';
import { UserContext } from '../../context/contextUserInfo';
import Footer from "./footer/footer";
import Main from "./main/main"
import Navbar from "./navbar/navbar"

const Home = () => {
    const [info, setInfo] = useState()
    const [user, setuser] = useContext(UserContext).user;
    const [reload, setreload] = useState(false);
    const gettingData = async () => {
        await fetch('https://protected-brushlands-07478.herokuapp.com/API/v1/user-info',
            {
                method: 'POST',
                body: JSON.stringify({ uid: user.uid }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setInfo(data)
            })
    }
    useEffect(async () => {
        gettingData()
    }, [reload]);
    return (
        <div>
            {
                info ? (
                    <>
                        <Navbar navInfo={info} />
                        <Main mainInfo={info} load={reload} gettingData={gettingData} />
                        <Footer />
                    </>
                ) : (
                    null
                )
            }
        </div>
    );
}
export default Home;