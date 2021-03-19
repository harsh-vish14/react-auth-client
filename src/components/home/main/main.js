import { useState } from "react";
import { auth } from "../../../firebase";
import Display from "./display/display";
import Edit from "./edit/edit";
import './main.css'
const Main = ({ mainInfo,load,setInfo,gettingData}) => {
    const [showDisplay, setDisplay] = useState(true);
    
    return (
        <div className='main'>
            {
                showDisplay ? (
                    <Display mainInfo={mainInfo} editClicked={setDisplay} />
                ) : (
                    <Edit editClicked={setDisplay} image={mainInfo.photo} reload={load} gettingData={gettingData} />
                )
            }
        </div>
    );
}

export default Main;