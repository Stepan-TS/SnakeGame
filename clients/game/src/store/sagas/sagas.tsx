import { useSelector } from "react-redux";
import { IGlobalState } from "../reduces/reduces";
import {
    CallEffect,
    delay,
    put,
    PutEffect,
    takeEvery,
    takeLatest,
  } from "redux-saga/effects";
  import {
    DOWN,
    ISnakeCoord,
    LEFT,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP,
    RESET,
    RIGHT,
    setDisDirection,
    STOP_GAME,
    UP,
  } from "../actions/actions";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
  
   
  
  export function* moveSaga(params: {
    type: string;
    payload: ISnakeCoord;
    xscore: number;
  }): Generator<
    | PutEffect<{ type: string; payload: ISnakeCoord; xscore:  number }>
    | PutEffect<{ type: string; payload: string; }>
    | CallEffect<true>
  > {
    while (params.type !== RESET && params.type !== STOP_GAME) {
      yield put({
        type: params.type.split("_")[1],
        payload: params.payload,
        xscore: params.xscore
      });
      switch (params.type.split("_")[1]) {
        case RIGHT:
          yield put(setDisDirection(LEFT));
          break;
  
        case LEFT:
          yield put(setDisDirection(RIGHT));
          break;
  
        case UP:
          yield put(setDisDirection(DOWN));
          break;
  
        case DOWN:
          yield put(setDisDirection(UP));
          break;
      }
      let delayTime = 300;
      if(params.xscore>=50){
        delayTime=200
      }
      if(params.xscore>=100){
        delayTime=100
      }
      if(params.xscore>=150){
        delayTime=50
      }
      yield delay(delayTime);
    }
  }
  
  function* watcherSagas() {
    
    yield takeLatest(
      [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, RESET, STOP_GAME],
      moveSaga
    );

  }
  
  export default watcherSagas;