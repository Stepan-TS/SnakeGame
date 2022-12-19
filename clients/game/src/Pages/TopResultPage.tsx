import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import './TopResultPage.css'
export interface IUser{
    user_id: number;
    user_name: string;
    user_points: number;
}

const TopResultPage = () => {
    const [user, setUser] = useState([]);

    const getResults = async() => {
        try{
            const response = await fetch("http://localhost:5000/gameUsers");
            const jsonData = await response.json();
            
            setUser(jsonData);
        } catch (error:any) {
            console.error(error.message);
        }
    }
    useEffect(()=> {
        getResults();
    })
    
    const navigate = useNavigate();
    return(
        <div className="listbox">
            {user.map((user:any) => (
                <ul>
                    <li className="list">
                        <p className="userName">{user.user_name}</p>
                        <p className="userPoint">{user.user_points}</p>
                    </li>
                </ul>
            ))}
            <button className="submit" type='submit' onClick={()=>navigate("/")}>RETURN TO GAME</button>
        </div>
    )
}

export default TopResultPage;