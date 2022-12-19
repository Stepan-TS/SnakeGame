
export interface IInstructionProps {
    resetBoard: () => void;
    closeModal: () => void;
  }
  const Instruction = ({ resetBoard, closeModal}: IInstructionProps) => (
      <button onClick={() => {resetBoard(); closeModal()}}>Reset game</button>
     
  );
  
  export default Instruction;