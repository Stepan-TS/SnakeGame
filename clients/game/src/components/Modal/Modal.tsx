import { useSelector } from "react-redux";
import { IGlobalState } from "../../store/reduces/reduces";
import Instruction from "../Instructions/Instructions";
import './Modal.css'

const MODAL_STYLES:any = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',

    backgroundColor:'#FFF',
    padding:'200px 350px 200px 350px',
    zIndex:1000
}
const OVERLAY_STYLES:any = {
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex:1000
}


export default function Modal({open, children, onClose, resetBoard}:any) {
    const score = useSelector((state: IGlobalState) => state.score);
    if(!open) return null
    return (
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <div className="textBox">
                    <p>You lost!</p>
                    <p>Your score is {score} points</p>
                    <p>Try again!</p>
                    <Instruction resetBoard={resetBoard} closeModal={onClose}/>
                </div>
            </div>
        </>
    )
}