import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseSnake,
  INCREMENT_SCORE_BLUE,
  INCREMENT_SCORE_YELLOW,
  INCREMENT_SCORE_RED,
  makeMove,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  resetGame,
  RESET_SCORE,
  scoreUpdates,
  stopGame,
} from "../../store/actions/actions";
import { IGlobalState } from "../../store/reduces/reduces";
import {
  clearBoard,
  drawObject,
  generateRandomPosition,
  hasSnakeCollided,
  IObjectBody,
} from "../../Services/services";
import ScoreCard from "../ScoreCard/ScoreCard";
import Modal from "../Modal/Modal";
import './CanvasBoard.css'
import {AiOutlinePause} from "react-icons/ai";
import {BsFillPlayFill} from "react-icons/bs";
export interface ICanvasBoard {
  height: number;
  width: number;
  user_name: any;
}
const CanvasBoard = ({ height, width, user_name}: ICanvasBoard) => {
  let userName = user_name.user_name
  const dispatch = useDispatch();
  const snake1 = useSelector((state: IGlobalState) => state.snake);
  const disallowedDirection = useSelector(
    (state: IGlobalState) => state.disallowedDirection
  );
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [posBlue, setPosBlue] = useState<IObjectBody>(
    generateRandomPosition(width - 40, height - 40)
  );
  const [posYellow, setPosYellow] = useState<IObjectBody>(
    generateRandomPosition(width - 40, height - 40)
  );
  const [posRed, setPosRed] = useState<IObjectBody>(
    generateRandomPosition(width - 40, height - 40)
  );
  const [isConsumedBlue, setIsConsumedBlue] = useState<boolean>(false);
  const [isConsumedYellow,setIsConsumedYellow] = useState<boolean>(false);
  const [isConsumedRed,setIsConsumedRed] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const user_points = useSelector((state: IGlobalState) => state.score);
  const [isOpen, setIsOpen] = useState(false)
  const onSubmitForm = async () => {
    try{
      const body = {user_points, userName}
      const response = await fetch("http://localhost:5000/gameUsers", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      })
      console.log(response);
    }catch(error:any){
      console.error(error.message);
    }
  }

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT, user_points));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT, user_points));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP, user_points));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN,user_points));
      }
    
    
  },
    [dispatch, user_points]

  );


  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "w":
            moveSnake(0, -20, disallowedDirection);
            break;
          case "s":
            moveSnake(0, 20, disallowedDirection);
            break;
          case "a":
            moveSnake(-20, 0, disallowedDirection);
            break;
          case "d":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } 
    },
    [disallowedDirection, moveSnake]
  );

  const startGame = () => {
    moveSnake(20, 0, disallowedDirection); 
  }
 


  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);
    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    clearBoard(context);
    drawObject(context, snake1, "#91C483");
    drawObject(
      context,
      [generateRandomPosition(width - 40, height - 40)],
      "#676FA3"
    ); //Draws object randomly
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake1, width]);

  useEffect(() => {
    //Generate new object
    if(isConsumedBlue){
      const posi = generateRandomPosition(width - 40, height - 40);
      setPosBlue(posi)
      setIsConsumedBlue(false);

      //Increase snake size when object is consumed successfully
      dispatch(increaseSnake());

      //Increment the score
      dispatch(scoreUpdates(INCREMENT_SCORE_BLUE));
    }
    else if(isConsumedYellow){
      const posi = generateRandomPosition(width - 40, height - 40);
      setPosYellow(posi)
      setIsConsumedYellow(false);

      //Increase snake size when object is consumed successfully
      dispatch(increaseSnake());

      //Increment the score
      dispatch(scoreUpdates(INCREMENT_SCORE_YELLOW));
    }
    else if(isConsumedRed){
      const posi = generateRandomPosition(width - 40, height - 40);
      setPosRed(posi)
      setIsConsumedRed(false);

      //Increase snake size when object is consumed successfully
      dispatch(increaseSnake());

      //Increment the score
      dispatch(scoreUpdates(INCREMENT_SCORE_RED));
    }
  }, [isConsumedBlue, isConsumedYellow, isConsumedRed, posBlue, posYellow,posRed, height, width, dispatch]);

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearBoard(context);
    drawObject(context, snake1, "#91C483");
    drawObject(context, [posBlue], "#676FA3"); //Draws object randomly
    drawObject(context, [posYellow], "#FFFF00");
    drawObject(context, [posRed], "#FF0000");
    //When the object is consumed
    if (snake1[0].x === posBlue?.x && snake1[0].y === posBlue?.y) {
      setIsConsumedBlue(true);
    }
    if (snake1[0].x === posYellow?.x && snake1[0].y === posYellow?.y) {
      setIsConsumedYellow(true);
    }
    if (snake1[0].x === posRed?.x && snake1[0].y === posRed?.y) {
      setIsConsumedRed(true);
    }

    if (
      hasSnakeCollided(snake1, snake1[0]) ||
      snake1[0].x >= width ||
      snake1[0].x <= 0 ||
      snake1[0].y <= 0 ||
      snake1[0].y >= height
    ) {
      onSubmitForm()
      setIsOpen(true)
      setGameEnded(true);
      dispatch(stopGame());
      
      window.removeEventListener("keypress", handleKeyEvents);
    } else setGameEnded(false);
  }, [context, posBlue, posYellow, posRed, snake1, height, width, dispatch, handleKeyEvents]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);

    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);
const Pause = () => {
  setGameEnded(true)
  dispatch(stopGame())
}
const Resume = () => {
  if(disallowedDirection === "RIGHT"){
    moveSnake(-20, 0, disallowedDirection); 
  }
  if(disallowedDirection === "LEFT"){
    moveSnake(20, 0, disallowedDirection); 
  }
  if(disallowedDirection === "DOWN"){
    moveSnake(0, -20, disallowedDirection); 
  }
  if(disallowedDirection === "UP"){
    moveSnake(0, 20, disallowedDirection); 
  }

}
  return (
    <>
    <ScoreCard />
    <canvas
        ref={canvasRef}
        style={{
          border: `3px solid ${gameEnded ? "red" : "black"}`,
        }}
        width={width}
        height={height}
      />
      <Modal open={isOpen} onClose={()=> setIsOpen(false)} resetBoard={resetBoard}>
      </Modal>
      <div className="buttons">
        <button className="btnstart" onClick={startGame}>Start</button>
        <div className="pauseResume">
          <button onClick={Pause} className="btnpause"><AiOutlinePause/></button>
          <button onClick={Resume} className="btnresume"><BsFillPlayFill/></button>
        </div>
      </div>
    </>
  );
};

export default CanvasBoard;