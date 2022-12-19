import React, { useState } from "react";
import CanvasBoard from "../CanvasBoard/CanvasBoard";
import { Provider } from 'react-redux';
import store from '../../store/store';

function Game(props:any){
    const {user_name}=props;
    
    console.log(user_name.user_name)
    return(
        <div className="game">
            <div className="gamebox">
                <Provider store={store}>
                    <CanvasBoard height={400} width={800} user_name={user_name}/>
                </Provider>
            </div>
        </div>
    )
}

export default Game;