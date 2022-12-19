import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
import './Description.css'

const Description = (props:any) => {
    const[user_name, setUser_Name] = useState("")
    //let user_name:string="";
    console.log(user_name)
    const navigate = useNavigate();
    
    return(
       <div className = "description">
            <div className="text">
                <h2>Hey! Welcome to the snake game!</h2>
                <h3>Enter you name please</h3>
            </div>
            <input 
                type="text" 
                placeholder="name" 
                className="name"
                value={user_name}
                onChange={(e)=>setUser_Name(e.target.value)}
            >
            </input>
            <button 
                onClick={()=>props.setUser_Name({user_name})} 
                className="btn btn-success"
            >
            Submit
            </button>
            <h3>Rules of game:</h3>
            <ul>
                <li>to start the game click start please</li>
                <li>click 'w' to make the snake move up</li>
                <li>click 's' to make the snake move down</li>
                <li>click 'a' to make the snake move left</li>
                <li>click 'd' to make the snake move right</li>
            </ul>
                <div className="topresults">
                    <h2>Top results!</h2>
                    <button className="btnresults" onClick={()=>{navigate('/topResultsPage')}}>Click me!</button>
                </div>
        </div>
    )
}

export default Description;