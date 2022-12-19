import React, { useState } from 'react';
import Description from '../components/Descriptions/Descriptions';
import Game from '../components/Game/Game';
import './MainPage.css'

const MainPage = () => {
    const [user_name, setUser_Name] = useState('')
    const userName:any = user_name
        return(
        <div className='mainbox'>
            <Game user_name={userName}/>
            <Description setUser_Name={setUser_Name} />
        </div>
    )
}
export default MainPage